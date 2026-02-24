import { ProfileHeaderProps } from "../utils/types";
import { Briefcase, MapPin } from "lucide-react";

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  activeUserData,
}) => (
  <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
    <div className="mb-6 md:mb-0 md:mr-10 shrink-0">
      <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-black dark:border-white overflow-hidden bg-white dark:bg-[#050505] p-2">
        <img
          src={activeUserData.profile_image_url}
          alt="User Avatar"
          className="w-full h-full object-cover filter grayscale hover:grayscale-0 contrast-125 transition-all duration-300"
        />
      </div>
    </div>
    <div className="text-center md:text-left flex-1 max-w-2xl py-2">
      <h2 className="font-syne text-4xl md:text-6xl font-bold uppercase tracking-widest text-black dark:text-white leading-none mb-6 break-words hyphens-auto">
        {activeUserData.username}
      </h2>
      <div className="space-y-4 font-space text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
        {profileData.job_role && (
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-3">
            <span className="text-red-500 opacity-50">/</span>
            <Briefcase className="w-4 h-4 text-black dark:text-white" />
            <span>{profileData.job_role}</span>
          </p>
        )}
        {profileData.location && (
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-3">
            <span className="text-red-500 opacity-50">/</span>
            <MapPin className="w-4 h-4 text-black dark:text-white" />
            <span>{profileData.location}</span>
          </p>
        )}
      </div>
    </div>
  </div>
);
