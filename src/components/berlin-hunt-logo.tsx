interface BerlinHuntLogoProps {
  className?: string;
  size?: number;
}

/**
 * Berlin Venture 50 brand mark. Renders the brand logo image (served from /logo.png).
 * Keeps the original `size` / `className` API so existing usages keep working.
 */
export function BerlinHuntLogo({ className, size = 36 }: BerlinHuntLogoProps) {
  return (
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt="Berlin Venture 50 logo"
      className={className}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}

export default BerlinHuntLogo;
