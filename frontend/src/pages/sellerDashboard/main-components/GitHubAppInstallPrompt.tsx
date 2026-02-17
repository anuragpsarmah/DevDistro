import { Github, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GitHubAppInstallPromptProps {
  installUrl: string;
}

export default function GitHubAppInstallPrompt({
  installUrl,
}: GitHubAppInstallPromptProps) {
  const handleInstallClick = () => {
    window.location.href = installUrl;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl rounded-2xl pointer-events-none opacity-50" />

          <div className="relative bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-600/[0.02] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-white/10">
                <Github className="w-8 h-8 text-gray-300" />
              </div>

              <h2 className="text-2xl font-bold text-gray-100 mb-3">
                Connect Your Repositories
              </h2>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Install the DevExchange GitHub App on your personal GitHub
                account to grant access to specific repositories you want to
                list for sale.
              </p>

              <div className="w-full space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-300 text-left">
                    Choose exactly which repositories to share
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-300 text-left">
                    We never access repos you don't explicitly grant
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Github className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-sm text-gray-300 text-left">
                    Revoke access anytime from GitHub settings
                  </p>
                </div>
              </div>

              <Button
                onClick={handleInstallClick}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 group"
              >
                <Github className="w-5 h-5 mr-2" />
                <span>Install GitHub App</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-gray-500 mt-4">
                You'll be redirected to GitHub to configure access.
                <br />
                <span className="text-gray-400">
                  Note: Organization accounts are not supported.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
