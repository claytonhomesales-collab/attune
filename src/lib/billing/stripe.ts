import Stripe from "stripe";

type StripeClient = {
  checkout: {
    sessions: {
      create: (params: Record<string, unknown>) => Promise<{ url: string | null; id: string }>;
      retrieve: (id: string) => Promise<{
        status: string | null;
        metadata: Record<string, string> | null;
        customer: string | { id: string } | null;
        customer_details: { email?: string | null } | null;
        customer_email: string | null;
      }>;
    };
  };
  customers: {
    list: (params: { email: string; limit: number }) => Promise<{ data: { id: string }[] }>;
  };
  subscriptions: {
    list: (params: {
      customer: string;
      status: "active";
      limit: number;
    }) => Promise<{ data: { metadata: Record<string, string> | null }[] }>;
  };
  billingPortal: {
    sessions: {
      create: (params: { customer: string; return_url: string }) => Promise<{ url: string }>;
    };
  };
};

const CLIENT_ID = "oacli_V18aOD6v0hs9CU";

let oakToken = process.env.STRIPE_OAK_TOKEN || "";
let oakRefresh = process.env.STRIPE_OAK_REFRESH_TOKEN || "";
let oakExpiresAt = Date.parse(process.env.STRIPE_OAK_EXPIRES_AT || "") || 0;

function classicKey(): string | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (key && (key.startsWith("sk_") || key.startsWith("rk_"))) return key;
  return null;
}

export function stripeReady(): boolean {
  return Boolean(classicKey() || (oakToken && process.env.STRIPE_ACCOUNT_ID));
}

function formEncode(value: unknown, prefix: string, out: URLSearchParams) {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => formEncode(item, `${prefix}[${index}]`, out));
    return;
  }
  if (typeof value === "object") {
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      formEncode(nested, prefix ? `${prefix}[${key}]` : key, out);
    }
    return;
  }
  out.append(prefix, String(value));
}

async function refreshOak() {
  if (!oakRefresh) throw new Error("Stripe session expired. Run stripe login again.");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: oakRefresh,
    client_id: CLIENT_ID,
  });
  const response = await fetch("https://access.stripe.com/stripecli/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error("Stripe session could not be refreshed.");
  const json = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  if (!json.access_token) throw new Error("Stripe session refresh returned no token.");
  oakToken = json.access_token;
  if (json.refresh_token) oakRefresh = json.refresh_token;
  if (json.expires_in) oakExpiresAt = Date.now() + json.expires_in * 1000;
}

async function oakRequest<T>(method: string, path: string, params?: unknown, retried = false): Promise<T> {
  if (!oakExpiresAt || oakExpiresAt < Date.now() + 60_000) {
    await refreshOak();
  }
  const headers: Record<string, string> = {
    Authorization: `Bearer ${oakToken}`,
    "Stripe-Context": process.env.STRIPE_ACCOUNT_ID || "",
    "Stripe-Livemode": process.env.STRIPE_LIVEMODE === "false" ? "false" : "true",
  };
  let body: string | undefined;
  if (params && method !== "GET") {
    const form = new URLSearchParams();
    formEncode(params, "", form);
    body = form.toString();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  const response = await fetch(`https://api.stripe.com${path}`, { method, headers, body });
  if (response.status === 401 && !retried) {
    await refreshOak();
    return oakRequest<T>(method, path, params, true);
  }
  const json = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(json.error?.message || "Stripe request failed.");
  }
  return json;
}

function oakClient(): StripeClient {
  return {
    checkout: {
      sessions: {
        create: (params) => oakRequest("POST", "/v1/checkout/sessions", params),
        retrieve: (id) => oakRequest("GET", `/v1/checkout/sessions/${id}`),
      },
    },
    customers: {
      list: (params) => oakRequest("GET", `/v1/customers?email=${encodeURIComponent(params.email)}&limit=${params.limit}`),
    },
    subscriptions: {
      list: (params) =>
        oakRequest(
          "GET",
          `/v1/subscriptions?customer=${encodeURIComponent(params.customer)}&status=${params.status}&limit=${params.limit}`,
        ),
    },
    billingPortal: {
      sessions: {
        create: (params) => oakRequest("POST", "/v1/billing_portal/sessions", params),
      },
    },
  };
}

export function getStripe(): StripeClient | null {
  const key = classicKey();
  if (key) return new Stripe(key) as unknown as StripeClient;
  if (oakToken && process.env.STRIPE_ACCOUNT_ID) return oakClient();
  return null;
}
