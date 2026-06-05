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
          className="w-20 h-20 object-contain"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <h2 className="mt-5 text-2xl font-heading font-bold text-gradient">Team Ecomify</h2>
        <div className="mt-6 w-56 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-primary rounded-full"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
