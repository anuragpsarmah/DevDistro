import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";

interface HeroSectionProps {
  handleAuthNavigate: () => void;
}

export default function HeroSection({ handleAuthNavigate }: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-4 mt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                <div className="text-3xl sm:text-4xl text-gray-200 mb-3">
                  Discover & Launch
                </div>
                <div className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    Production-Ready
                  </span>
                </div>{" "}
                <span className="relative inline-block">
                  <span className="text-white">GitHub</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 150 12"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M2 8.5C20 3.5 40 10.5 60 8.5C80 6.5 100 2.5 120 4.5C140 6.5 148 8.5 148 8.5"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="50%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                <div className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400">
                    Solutions
                  </span>
                </div>
              </h1>
            </motion.div>
            <motion.p
              className="text-lg sm:text-xl text-gray-300 mt-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find battle-tested code, components, and complete applications.
              Skip the build phase and launch faster.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                onClick={handleAuthNavigate}
              >
                Browse Solutions{" "}
                <ChevronRightIcon className="inline-block ml-2 h-5 w-5" />
              </button>
              <button
                className="bg-transparent hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-2 border-purple-500 hover:border-purple-400 flex items-center justify-center"
                onClick={handleAuthNavigate}
              >
                Sell Your Code
                <ChevronRightIcon className="ml-2 h-5 w-5 text-purple-400" />
              </button>
            </motion.div>
          </div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="DevExchange Platform"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
