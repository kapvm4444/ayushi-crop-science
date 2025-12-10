import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TextHoverEffect({
  text,
  duration = 0,
  className,
  autoAnimate = false,
}) {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Auto-animation effect
  useEffect(() => {
    if (autoAnimate && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      let direction = 1; // 1 for left to right, -1 for right to left
      let position = 0;

      const animate = () => {
        position += direction * 0.5;

        // Reverse direction at boundaries
        if (position >= 100) {
          direction = -1;
          position = 100;
        } else if (position <= 0) {
          direction = 1;
          position = 0;
        }

        const x = svgRect.left + (position / 100) * svgRect.width;
        const y = svgRect.top + svgRect.height / 2;

        setCursor({ x, y });
        setHovered(true);
      };

      const intervalId = setInterval(animate, 16); // ~60fps

      return () => clearInterval(intervalId);
    }
  }, [autoAnimate]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 850 80"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => !autoAnimate && setHovered(true)}
      onMouseLeave={() => !autoAnimate && setHovered(false)}
      onMouseMove={(e) =>
        !autoAnimate && setCursor({ x: e.clientX, y: e.clientY })
      }
      className={cn("select-none z-50", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="30%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor={"#ffffff"} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.1"
        className="font-[helvetica] font-bold stroke-neutral-200 fill-transparent text-7xl"
        style={{ opacity: 0.05 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-200/10"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 0,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="font-[helvetica] font-bold fill-transparent text-7xl"
      >
        {text}
      </text>
    </svg>
  );
}
