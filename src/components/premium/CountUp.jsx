import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function CountUp({ end, duration = 2, suffix = "", prefix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let startTime;
            let animationFrame;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / (duration * 1000), 1);

                setCount(Math.floor(end * percentage));

                if (percentage < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationFrame);
        }
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {prefix}{count}{suffix}
        </span>
    );
}
