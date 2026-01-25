import { useFeaturedReviewQuery } from "@/hooks/apiQueries";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { featuredReviewType } from "../utils/types";
import { Quote } from "lucide-react";

export default function ReviewSection() {
  const {
    data: featuredReviews,
    isLoading,
    isError,
  } = useFeaturedReviewQuery();

  return (
    <section id="reviews" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-sm font-medium mb-3 uppercase tracking-wider">Testimonials</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            What developers are saying
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            See what our community has to say about their experience with DevExchange.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-56 bg-gray-800/50 rounded-2xl" />
            ))}
          </div>
        ) : isError || featuredReviews?.data.length < 3 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-gray-900/50 border border-white/5 rounded-2xl"
          >
            <Quote className="w-10 h-10 text-blue-500/30 mx-auto mb-4" />
            <p className="text-gray-400 text-base italic max-w-md mx-auto">
              "We're building something great. Be among the first to share your experience!"
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredReviews?.data.map(
              (review: featuredReviewType, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-gray-900/50 border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300"
                >
                  <Quote className="w-6 h-6 text-blue-500/40 mb-4" />

                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    "{review.review_description}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <img
                      src={review.profile_image_url}
                      alt={review.username}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                    />
                    <div>
                      <h4 className="text-white font-medium text-sm">
                        {review.username}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {review.job_role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
