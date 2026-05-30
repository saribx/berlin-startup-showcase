interface BerlinHuntLogoProps {
  className?: string;
  size?: number;
}

/**
 * Berlin Hunt mark — a Brandenburg Gate silhouette pierced by an upvote chevron,
 * inside a warm gradient badge. The chevron echoes the upvote affordance used
 * across the product, while the gate roots the brand in Berlin.
 */
export function BerlinHuntLogo({ className, size = 36 }: BerlinHuntLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bh-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7A45" />
          <stop offset="55%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>
        <linearGradient id="bh-stroke" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFE4D6" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Rounded badge */}
      <rect x="1" y="1" width="46" height="46" rx="12" fill="url(#bh-bg)" />
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="12"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.18"
      />

      {/* Brandenburg-Gate inspired silhouette: 5 columns + horizontal entablature */}
      <g stroke="url(#bh-stroke)" strokeWidth="2.2" strokeLinecap="round">
        <line x1="12" y1="33" x2="12" y2="22" />
        <line x1="18" y1="33" x2="18" y2="22" />
        <line x1="24" y1="33" x2="24" y2="22" />
        <line x1="30" y1="33" x2="30" y2="22" />
        <line x1="36" y1="33" x2="36" y2="22" />
      </g>
      {/* Entablature */}
      <rect x="10" y="19" width="28" height="3" rx="1.2" fill="url(#bh-stroke)" />
      {/* Quadriga base */}
      <rect x="20" y="14.5" width="8" height="2.6" rx="1" fill="url(#bh-stroke)" />
      {/* Floor line */}
      <rect x="9" y="33.5" width="30" height="2" rx="1" fill="url(#bh-stroke)" />

      {/* Upvote chevron rising through the gate — the "hunt" mark */}
      <path
        d="M24 9 L31.5 17.5 L27 17.5 L27 24.5 L21 24.5 L21 17.5 L16.5 17.5 Z"
        fill="#FFFFFF"
        stroke="#7C2D12"
        strokeOpacity="0.18"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}