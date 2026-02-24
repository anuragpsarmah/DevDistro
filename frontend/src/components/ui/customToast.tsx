import { toast } from "@/hooks/use-toast";

export const successToast = (message: string) => {
  toast({
    description: message,
    className:
      "bg-white dark:bg-[#050505] border-black dark:border-white text-black dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] px-4 py-3 toast-success",
  });
};

export const errorToast = (message: string) => {
  toast({
    description: message,
    className:
      "bg-white dark:bg-[#050505] border-red-500 text-black dark:text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] px-4 py-3 toast-error",
  });
};
