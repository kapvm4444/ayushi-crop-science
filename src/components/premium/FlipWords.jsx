import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
    words,
    duration = 2000,
    className,
}) => {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    // thanks for the fix Julian - https://github.com/Julian-AT
    const startAnimation = useCallback(() => {
        const word = words[words.indexOf(currentWord) + 1] || words[0];
        setCurrentWord(word);
        setIsAnimating(true);
    }, [currentWord, words]);

    useEffect(() => {
        if (!isAnimating)
            setTimeout(() => {
                startAnimation();
            }, duration);
    }, [isAnimating, duration, startAnimation]);

    return (
        <div className="inline-flex items-center justify-center relative px-4">
            <motion.div
                layout
                className="absolute inset-0 border-2 border-green-500/50 rounded-lg bg-green-500/10"
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                }}
            />
            <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                    setIsAnimating(false);
                }}
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -10,
                        filter: "blur(8px)",
                        transition: { duration: 0.2 }
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                    }}
                    className={cn(
                        "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
                        className
                    )}
                    key={currentWord}
                >
                    {currentWord.split("").map((letter, index) => (
                        <motion.span
                            key={currentWord + index}
                            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.2,
                            }}
                            className="inline-block"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
