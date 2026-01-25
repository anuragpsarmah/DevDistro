import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  handleAuthNavigate: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({
  handleAuthNavigate,
  isMenuOpen,
  setIsMenuOpen,
}: MobileMenuProps) {
  const menuItems = ["Features", "Projects", "Reviews", "FAQs"];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div className="absolute inset-0 backdrop-blur-xl bg-gray-900/95" />

          <div className="relative h-full flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center space-y-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-3xl font-semibold text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-4 px-10 rounded-full text-xl"
              onClick={handleAuthNavigate}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
