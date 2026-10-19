export function ProductEmblem({
  slug,
  className = "size-5",
}: {
  slug: string;
  className?: string;
}) {
  switch (slug) {
    case "mirror":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5v17" strokeDasharray="2 2" />
          <path d="M8.5 8.5c2 2 2 5 0 7" />
          <path d="M15.5 8.5c-2 2-2 5 0 7" />
        </svg>
      );
    case "pause":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <path d="M10 9v6M14 9v6" strokeLinecap="round" />
        </svg>
      );
    case "thread":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M4 7h11a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h11" strokeLinecap="round" />
          <circle cx="5" cy="7" r="1.5" fill="currentColor" />
          <circle cx="19" cy="19" r="1.5" fill="currentColor" />
        </svg>
      );
    case "repair":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M7 14.5 14.5 7" strokeLinecap="round" />
          <circle cx="8.5" cy="8.5" r="4.5" />
          <circle cx="15.5" cy="15.5" r="4.5" />
        </svg>
      );
    case "brief":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M4 7h16M4 12h10M4 17h6" strokeLinecap="round" />
          <circle cx="18" cy="16" r="2.5" />
        </svg>
      );
    case "deal":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M12 3 20 8.5v7L12 21 4 15.5v-7L12 3Z" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "desk":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M5 12a7 7 0 0 1 14 0v5a2 2 0 0 1-2 2h-2v-5h4" strokeLinecap="round" />
          <path d="M5 12v5a2 2 0 0 0 2 2h2v-5H5" strokeLinecap="round" />
        </svg>
      );
    case "lead":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M12 4v16M5 10l7-6 7 6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 20h10" strokeLinecap="round" />
        </svg>
      );
    case "hire":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <circle cx="10" cy="9" r="3.5" />
          <path d="M4.5 19c1-3 3.2-4.5 5.5-4.5s4.5 1.5 5.5 4.5" strokeLinecap="round" />
          <path d="M18 8v5M15.5 10.5h5" strokeLinecap="round" />
        </svg>
      );
    case "keep":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
        </svg>
      );
    case "steady":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <path d="M3 12h4l2.5-5 5 10 2.5-5H21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "bench":
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
          <rect x="3.5" y="4.5" width="7" height="7" rx="1.8" />
          <rect x="13.5" y="4.5" width="7" height="7" rx="1.8" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
        </svg>
      );
  }
}
