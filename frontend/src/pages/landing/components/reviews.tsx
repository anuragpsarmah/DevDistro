import { motion } from "framer-motion";

const reviews = [
  {
    quote: "The instant SOL payout system completely changed my workflow. Listing a side project turned into recurring, frictionless revenue.",
    author: "0xBuilder",
    role: "Senior Protocol Engineer",
    metric: "+$14k Month 01"
  },
  {
    quote: "No waiting for App Store approvals or 30-day withholding periods. I push code, someone buys it via Phantom, I have the liquidity in seconds.",
    author: "Sarah J.",
    role: "Vite + React Indie Dev",
    metric: "450+ ZIPs delivered"
  },
  {
    quote: "As a buyer, standard boilerplate markets feel sketchy. Linking my Solflare to securely acquire verified GitHub origins is the superior way to procure structure.",
    author: "TechFounder_99",
    role: "Startup CTO",
    metric: "12 Repos Acquired"
  }
];

export default function Reviews() {
  return (
    <section className="py-32 px-6 md:px-12 bg-white dark:bg-[#050505] text-black dark:text-white border-y border-black/10 dark:border-white/10 transition-colors duration-300 overflow-hidden" id="validations">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-20 border-b-4 border-black/20 dark:border-white/20 pb-6 transition-colors">
          <div className="flex items-center gap-3">
            <span className="font-space font-bold uppercase tracking-[0.2em] text-xs">Validations</span>
          </div>
          <div className="hidden md:flex gap-4 font-space text-xs font-bold uppercase tracking-widest text-red-500">
            <span>Ping: 12ms</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-2 border-l-2 border-black/20 dark:border-white/20 transition-colors">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="border-b-2 border-r-2 border-black/20 dark:border-white/20 p-10 flex flex-col justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 group"
            >
              <div className="mb-12">
                <div className="text-red-500 font-syne text-6xl font-black opacity-30 group-hover:opacity-100 transition-opacity leading-none mb-4">"</div>
                <p className="font-space text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {review.quote}
                </p>
              </div>

              <div className="mt-auto border-t-2 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:group-hover:border-white/30 pt-6 transition-colors">
                <div className="font-syne text-xl font-bold uppercase">{review.author}</div>
                <div className="font-space text-sm text-gray-600 dark:text-gray-500 group-hover:text-black dark:group-hover:text-gray-400 mb-4 transition-colors">{review.role}</div>
                <div className="inline-block bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white dark:group-hover:text-black font-space font-bold text-xs uppercase tracking-widest px-3 py-1 transition-colors">
                  {review.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
