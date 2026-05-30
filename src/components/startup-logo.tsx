import { useState } from "react";

interface Props {
  domain?: string;
  name: string;
  emoji: string;
  size?: number;
  className?: string;
  rounded?: string;
}

/**
 * Renders a real company logo via Clearbit's free logo API,
 * falling back to the emoji if the logo fails to load.
 */
export function StartupLogo({
  domain,
  name,
  emoji,
  size = 44,
  className = "",
  rounded = "rounded-xl",
}: Props) {
  const [failed, setFailed] = useState(false);
  const src = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : undefined;

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-white ${rounded} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={`${name} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <span aria-hidden>{emoji}</span>
      )}
    </span>
  );
}
