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
        {/* Logo pulse */}
        <motion.img
          src={logo}
          alt="Team Ecomify"
          className="w-16 h-16 object-contain"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Brand name */}
        <div className="mt-4 text-xl font-heading font-bold">
          <span className="text-primary">Team</span>{" "}
          <span className="text-gradient">Ecomify</span>
        </div>

        {/* Progress bar */}
        <div className="mt-5 w-48 h-0.5 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
