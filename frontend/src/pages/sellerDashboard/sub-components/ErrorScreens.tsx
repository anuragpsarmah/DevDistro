import { TooltipProvider } from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";

export const ErrorScreenListedProjects: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="h-full p-4 lg:p-6">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 blur-2xl rounded-2xl pointer-events-none" />
          <div className="relative h-full bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-orange-600/[0.02] pointer-events-none rounded-2xl" />
            <div className="relative z-10 text-center p-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 mb-6 mx-auto">
                <AlertTriangle className="h-8 w-8 text-red-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-200 mb-4">
                Failed to Load Projects
              </h2>
              <p className="text-gray-400 max-w-xs mx-auto">
                We encountered an issue retrieving your project information.
                Please check your connection or try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export const ErrorScreenConnectToWallet: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 blur-2xl rounded-2xl pointer-events-none" />
        <div className="relative bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-orange-600/[0.02] pointer-events-none rounded-2xl" />
          <div className="relative z-10 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center border border-white/10">
                <AlertTriangle className="h-8 w-8 text-red-400" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Wallet Connection Error
            </h2>
            <p className="text-gray-400 mb-4 max-w-xs mx-auto">
              We encountered an issue retrieving your wallet information. Please
              check your connection or try again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
