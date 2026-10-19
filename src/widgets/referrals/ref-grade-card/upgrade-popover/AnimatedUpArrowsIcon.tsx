type AnimatedUpArrowsIconProps = {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  durationMs?: number;
  delayMs?: number;
};

export const AnimatedUpArrowsIcon = ({
  width = 21,
  height = 20,
  className,
  color = "#00B69B",
  durationMs = 1000,
  delayMs = 500,
}: AnimatedUpArrowsIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>{`
        @keyframes arrowsSwap { 0% { opacity: 1 } 50% { opacity: 0.5 } 100% { opacity: 1 } }
        .arrows-swap-up { animation: arrowsSwap ${durationMs}ms linear infinite; animation-delay: ${delayMs}ms }
        .arrows-swap-down { animation: arrowsSwap ${durationMs}ms linear infinite; animation-delay: 0ms }
      `}</style>
      <path
        className="arrows-swap-up"
        opacity="0.5"
        d="M6.23334 9.16669L9.6929 5.70713C10.0834 5.3166 10.7166 5.3166 11.1071 5.70713L14.5667 9.16669"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="arrows-swap-down"
        d="M6.23334 14.8613L9.6929 11.4017C10.0834 11.0112 10.7166 11.0112 11.1071 11.4017L14.5667 14.8613"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};


