import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const backend_uri = import.meta.env.VITE_BACKEND_URI;

const useAuthValidationQuery = () => {
  return useQuery({
    queryKey: ["authValidation"],
    queryFn: async () => {
      const response = await axios.get(`${backend_uri}/auth/authValidation`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

const useLogoutQuery = () => {
  return useQuery({
    queryKey: ["logoutQuery"],
    queryFn: async () => {
      const response = await axios.get(`${backend_uri}/auth/githubLogout`, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: false,
  });
};

const useCommonSalesInformationQuery = () => {
  return useQuery({
    queryKey: ["commonSalesInformationQuery"],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_uri}/sales/getCommonSalesInformation`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
};

const useYearlySalesInformationQuery = (year: number) => {
  return useQuery({
    queryKey: ["yearlySalesInformationQuery", year],
    queryFn: async ({ queryKey }) => {
      const [, year] = queryKey;
      const response = await axios.get(
        `${backend_uri}/sales/getYearlySalesInformation?year=${year}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
};

const useProfileInformationQuery = () => {
  return useQuery({
    queryKey: ["useProfileInformationQuery"],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_uri}/profile/getProfileInformation`,
        { withCredentials: true }
      );

      return response.data;
    },
  });
};

export {
  useAuthValidationQuery,
  useLogoutQuery,
  useCommonSalesInformationQuery,
  useYearlySalesInformationQuery,
  useProfileInformationQuery,
};
