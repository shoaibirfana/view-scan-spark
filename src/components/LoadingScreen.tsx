import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

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
        <motion.img
          src={logo}
          alt="Team Ecomify"
          className="w-16 h-16 object-contain"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-4 text-sm text-muted-foreground font-medium tracking-wide">Loading...</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
