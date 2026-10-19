import { studioRewrite } from "@/lib/studio/rewrite";

type Voice = "direct" | "warm" | "concise";

const VOICES: { id: Voice; label: string }[] = [
  { id: "direct", label: "Direct" },
  { id: "warm", label: "Warm" },
  { id: "concise", label: "Short" },
];

function composerFrom(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null;
  if (target.closest("#attune-extension-root")) return null;
  if (target instanceof HTMLTextAreaElement) return target;
  if (target instanceof HTMLInputElement) {
    const type = (target.type || "text").toLowerCase();
    if (["password", "hidden", "file", "checkbox", "radio", "submit", "button", "range", "color"].includes(type)) {
      return null;
    }
    return target;
  }
  const editable = target.closest("[contenteditable]");
  if (!(editable instanceof HTMLElement)) return null;
  const mode = editable.contentEditable;
  if (mode !== "true" && mode !== "plaintext-only") return null;
  return editable;
}

function readDraft(composer: HTMLElement): { text: string; partial: boolean } {
  if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
    const start = composer.selectionStart ?? 0;
    const end = composer.selectionEnd ?? 0;
    if (start !== end) return { text: composer.value.slice(start, end), partial: true };
    return { text: composer.value, partial: false };
  }
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed && composer.contains(selection.anchorNode)) {
    return { text: selection.toString(), partial: true };
  }
  return { text: composer.innerText, partial: false };
}

function writeDraft(composer: HTMLElement, text: string, partial: boolean) {
  composer.focus();
  if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
    const start = partial ? composer.selectionStart ?? 0 : 0;
    const end = partial ? composer.selectionEnd ?? composer.value.length : composer.value.length;
    composer.setRangeText(text, start, end, "end");
    composer.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
    return;
  }
  const selection = window.getSelection();
  if (!partial || !selection || selection.isCollapsed || !composer.contains(selection.anchorNode)) {
    const range = document.createRange();
    range.selectNodeContents(composer);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
  document.execCommand("insertText", false, text);
}

function mount() {
  if (document.getElementById("attune-extension-root")) return;
  const host = document.createElement("div");
  host.id = "attune-extension-root";
  host.style.cssText = "all: initial; position: fixed; z-index: 2147483646; right: 16px; bottom: 16px;";
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    .bar {
      display: none;
      align-items: center;
      gap: 6px;
      padding: 8px;
      border-radius: 999px;
      background: #14120b;
      color: #f6f1e7;
      font: 13px/1.2 Georgia, "Iowan Old Style", serif;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
    }
    .bar.show { display: flex; }
    .mark { padding: 0 6px; letter-spacing: 0.04em; }
    button {
      border: 0;
      border-radius: 999px;
      padding: 6px 10px;
      background: #f6f1e7;
      color: #14120b;
      font: inherit;
      cursor: pointer;
    }
    button:disabled { opacity: 0.4; cursor: default; }
  `;
  const bar = document.createElement("div");
  bar.className = "bar";
  bar.innerHTML = `<span class="mark">Attune</span>`;
  const buttons = VOICES.map((voice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = voice.label;
    button.dataset.voice = voice.id;
    return button;
  });
  for (const button of buttons) bar.appendChild(button);
  shadow.append(style, bar);
  document.documentElement.appendChild(host);

  let composer: HTMLElement | null = null;

  const refresh = () => {
    const draft = composer ? readDraft(composer).text.trim() : "";
    bar.classList.toggle("show", Boolean(composer));
    for (const button of buttons) button.disabled = draft.length === 0;
  };

  bar.addEventListener("mousedown", (event) => event.preventDefault());
  bar.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement | null)?.closest("button");
    const voice = button?.dataset.voice as Voice | undefined;
    if (!composer || !voice || !button || button.disabled) return;
    const draft = readDraft(composer);
    const result = studioRewrite("pause", draft.text);
    const next = result.calibrations[voice] || result.rewrite;
    if (!next.trim()) return;
    writeDraft(composer, next, draft.partial);
    refresh();
  });

  document.addEventListener("focusin", (event) => {
    composer = composerFrom(event.target);
    refresh();
  });
  document.addEventListener("input", () => refresh(), true);
  document.addEventListener("selectionchange", () => refresh());
}

mount();
