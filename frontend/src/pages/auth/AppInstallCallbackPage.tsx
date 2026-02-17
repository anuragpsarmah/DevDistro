import { useEffect } from "react";
import { motion } from "framer-motion";
import axios, { AxiosResponse } from "axios";
import { tryCatch } from "@/utils/tryCatch.util";
import { useNavigate } from "react-router-dom";
import BackgroundDots from "@/components/ui/backgroundDots";
import { errorToast, successToast } from "@/components/ui/customToast";

export default function AppInstallCallbackPage() {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const installationId = url.searchParams.get("installation_id");
  const setupAction = url.searchParams.get("setup_action");
  const state = url.searchParams.get("state");
  const backend_uri = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    const handleInstallCallback = async () => {
      if (!installationId || !state) {
        errorToast("Invalid callback — missing parameters");
        navigate("/seller-dashboard", { state: { activeTab: "List Project" } });
        return;
      }

      const [response, error] = await tryCatch<AxiosResponse>(() =>
        axios.get(
          `${backend_uri}/github-app/callback?installation_id=${installationId}&setup_action=${setupAction || ""}&state=${encodeURIComponent(state)}`,
          { withCredentials: true }
        )
      );

      if (error || !response) {
        console.error("Installation callback error:", error);
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to configure GitHub App";
        errorToast(errorMessage);
        navigate("/seller-dashboard", { state: { activeTab: "List Project" } });
      } else {
        successToast("GitHub App installed successfully!");
        navigate("/seller-dashboard", { state: { activeTab: "List Project" } });
      }
    };

    handleInstallCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4 relative overflow-hidden bg-[#030712]">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 0%, rgba(88, 28, 135, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 40%),
            #030712
          `,
        }}
      />

      <BackgroundDots />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="z-10 text-center"
      >
        <motion.div
          className="mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[3px]">
            <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
            </div>
          </div>
        </motion.div>

        <h1 className="text-2xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Configuring GitHub Access
          </span>
        </h1>
        <p className="text-sm text-gray-400">
          Please wait while we configure your repository access
        </p>
      </motion.div>
    </div>
  );
}
