import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";

type ProfileUpdateData = {
  job_role: string;
  location: string;
  review_description: string;
  review_stars: number;
  profile_visibility: boolean;
};

const backend_uri = import.meta.env.VITE_BACKEND_URI;

const useProfileUpdateMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      queryClient.invalidateQueries({
        queryKey: ["useProfileInformationQuery"],
      });
      toast({
        description: "Profile updated successfully.",
      });
    },
    onError: () => {
      toast({
        description: "Something went wrong. Try again Later.",
      });
    },
  });
};

export { useProfileUpdateMutation };
