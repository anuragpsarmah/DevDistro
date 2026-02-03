import { Edit } from "lucide-react";

export const NoProjectsScreen: React.FC = () => {
  return (
    <div className="h-full p-4 lg:p-6">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-2xl rounded-2xl pointer-events-none" />
        <div className="relative h-full bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-600/[0.02] pointer-events-none rounded-2xl" />
          <div className="relative z-10 text-center p-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 mb-6 mx-auto">
              <Edit className="h-8 w-8 text-blue-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              No Projects Listed
            </h2>
            <p className="text-gray-400 max-w-xs mx-auto">
              Your project listing portfolio is empty. Start by listing your first project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


