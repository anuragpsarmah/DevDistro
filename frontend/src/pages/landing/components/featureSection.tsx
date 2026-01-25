import { motion } from "framer-motion";
import { features } from "./animatedFeatureIcons";
import { ArrowUpRight } from "lucide-react";

export default function FeatureSection() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-sm font-medium mb-3 uppercase tracking-wider">Why DevExchange</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Everything you need to monetize your code
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Built by developers, for developers. We handle the complexity so you can focus on what matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-900/50 border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-[0.07] blur-2xl`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                    {feature.animatedIcon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            And many more features to help you succeed →{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Learn more
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
