interface ChevronLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ChevronLogo({ width = 35, height = 28, className }: ChevronLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 64"
      fill="none"
      width={width}
      height={height}
      className={className}
    >
      {/* outer chevron -- full weight */}
      <path
        d="M4 58 L40 6 L76 58"
        stroke="#2c5fcc"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* inner chevron -- reduced weight, reduced opacity */}
      <path
        d="M16 58 L40 18 L64 58"
        stroke="#2c5fcc"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        opacity="0.38"
      />
    </svg>
  );
}
