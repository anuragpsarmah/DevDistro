import { toast } from "@/hooks/use-toast";

export const successToast = (message: string) => {
  toast({
    description: message,
    className: "bg-gray-800 border-0 text-gray-100 px-3 py-2",
    style: {
      backgroundColor: "rgb(55,65,81)",
    },
  });
};

export const errorToast = (message: string) => {
  toast({
    description: message,
    className: "bg-gray-800 border-0 text-red-500 px-3 py-2",
    style: {
      backgroundColor: "rgb(55,65,81)",
    },
  });
};
