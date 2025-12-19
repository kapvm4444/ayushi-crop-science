import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AuroraHero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  compact = false, // New prop for compact mode
}) {
  return (
    <div
      className={`relative w-full flex items-center justify-center overflow-hidden ${compact ? "h-[40vh] min-h-[350px] pt-20" : "h-screen"}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Aurora Effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white opacity-5" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16 md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${compact ? "text-4xl md:text-5xl" : "text-5xl md:text-7xl"} font-bold text-white mb-6 tracking-tight`}
        >
          {title}
        </motion.h1>

        {subtitle && !compact && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-200 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Subtitle for compact mode (optional, smaller) */}
        {subtitle && compact && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-neutral-300 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons - Hidden in compact mode usually, unless specific need? User said "just title". I'll hide them for compact. */}
        {!compact && (ctaText || secondaryCtaText) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {ctaText && (
              <Button
                size="lg"
                className="rounded-full px-8 h-12 text-lg"
                asChild
              >
                <a href={ctaLink}>{ctaText}</a>
              </Button>
            )}
            {secondaryCtaText && (
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-lg border-white/30 text-white hover:bg-white/10 bg-white/20 hover:text-white"
                asChild
              >
                <a href={secondaryCtaLink}>{secondaryCtaText}</a>
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator - Hidden in compact mode */}
      {!compact && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
