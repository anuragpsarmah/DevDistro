import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/header";
import MobileMenu from "./components/mobileMenu";
import TheIntroduction from "./components/theIntroduction";
import TheRevelation from "./components/theRevelation";
import TheMechanics from "./components/theMechanics";
import TheClimax from "./components/theClimax";
import FAQ from "./components/faq";
import Reviews from "./components/reviews";
import Footer from "./components/footer";
import { useAuthValidationQuery } from "@/hooks/apiQueries";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useAuthValidationQuery();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  useEffect(() => {
    const handleAuthValidation = async () => {
      if (!isLoading && !isError && data?.data?._id) {
        navigate("/profile-selection");
      }
    };

    handleAuthValidation();
  }, [isError, isLoading, data, navigate]);

  const handleAuthNavigate = () => {
    navigate("/authentication");
  };

  useEffect(() => {
    const handleResize = () => setIsMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 bg-gray-50 dark:text-white relative dark:bg-[#050505] font-space selection:bg-red-500 selection:text-white transition-colors duration-300">
      <Header
        handleAuthNavigate={handleAuthNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <MobileMenu
        handleAuthNavigate={handleAuthNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="relative z-10 w-full pt-16">
        <TheIntroduction handleAuthNavigate={handleAuthNavigate} />
        <TheRevelation />
        <TheMechanics />
        <Reviews />
        <FAQ />
        <TheClimax handleAuthNavigate={handleAuthNavigate} />
      </main>

      <Footer />
    </div>
  );
}
