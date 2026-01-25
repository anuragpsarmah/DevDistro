import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";

export default function ShowcaseSection() {
  const projects = [
    {
      title: "AI Image Generator",
      description: "Production-ready AI image generation with multiple model support and API integration",
      gradient: "from-blue-600 to-purple-600",
      tags: ["AI/ML", "Python", "API"],
      price: "$2,499",
      rating: "4.9",
      sales: "120+"
    },
    {
      title: "Blockchain Explorer",
      description: "Full-featured blockchain explorer with real-time data, analytics dashboard, and alerts",
      gradient: "from-purple-600 to-pink-600",
      tags: ["Web3", "React", "Node"],
      price: "$1,899",
      rating: "4.8",
      sales: "85+"
    },
    {
      title: "SaaS Starter Kit",
      description: "Complete SaaS boilerplate with auth, billing, teams, and admin dashboard included",
      gradient: "from-pink-600 to-orange-500",
      tags: ["SaaS", "Next.js", "Stripe"],
      price: "$3,299",
      rating: "5.0",
      sales: "200+"
    },
  ];

  return (
    <section id="projects" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-sm font-medium mb-3 uppercase tracking-wider">Marketplace</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Top-selling projects this month
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Discover production-ready code from verified developers worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-900/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
            >
              <div className={`relative h-40 bg-gradient-to-br ${project.gradient} p-5 overflow-hidden`}>
                <div className="absolute inset-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center gap-1.5 p-2 border-b border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-white/20 rounded w-3/4" />
                    <div className="h-2 bg-white/10 rounded w-1/2" />
                    <div className="h-2 bg-white/10 rounded w-2/3" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-yellow-500">
                    <Star size={12} className="fill-yellow-500" />
                    {project.rating}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-lg font-bold text-white">{project.price}</span>
                  <span className="text-xs text-gray-500">{project.sales} sales</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
          >
            View all projects
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
