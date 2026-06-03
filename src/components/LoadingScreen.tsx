import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        key="loader"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      >
        <div className="relative w-16 h-16">
          {/* Outer hollow half-circle */}
          <motion.span
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner hollow half-circle spinning opposite */}
          <motion.span
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-primary border-l-primary"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground font-medium tracking-wide">Loading...</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
