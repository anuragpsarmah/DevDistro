import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { successToast, errorToast } from "@/components/ui/customToast";

type ProfileUpdateData = {
  job_role: string;
  location: string;
  review_description: string;
  review_stars: number;
  profile_visibility: boolean;
};

const backend_uri = import.meta.env.VITE_BACKEND_URI;

const useProfileUpdateMutation = () => {
  return useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      const response = await axios.put(
        `${backend_uri}/profile/updateProfileInformation`,
        data,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      successToast("Profile updated successfully");
    },
    onError: (error) => {
      errorToast(error.message || "Failed to update profile");
    },
  });
};

export { useProfileUpdateMutation };
