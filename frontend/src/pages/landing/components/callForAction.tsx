import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CallForActionProps {
  handleAuthNavigate: () => void;
}

export default function CallForAction({
  handleAuthNavigate,
}: CallForActionProps) {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent border border-blue-500/20 rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Ready to get started?
            </h2>

            <p className="text-base text-gray-400 mb-8 max-w-lg mx-auto">
              Start exploring innovative projects or showcase your own creations. 
              Monetize your code or find the perfect solution for your next project.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                onClick={handleAuthNavigate}
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <button
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition-all duration-200 border border-white/10"
                onClick={handleAuthNavigate}
              >
                View Projects
              </button>
            </div>

            <p className="mt-6 text-gray-500 text-xs">
              No credit card required • Free to start
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
