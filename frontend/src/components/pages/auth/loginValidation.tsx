import { useEffect } from "react";
import axios from "axios";
import BackgroundDots from "@/components/ui/backgroundDots";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { user } from "@/utils/atom";
import { useRecoilState } from "recoil";

export default function LoginValidation() {
  const [, setActiveUser] = useRecoilState(user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const githubCode = url.searchParams.get("code");

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/githubLogin?code=${githubCode}`
        );

        setActiveUser(response.data.data);
        navigate("/profile-selection");
      } catch (error) {
        console.log(error);
        toast({
          description: "Your message has been sent.",
        });
        navigate("/authentication");
      }
    };

    validateLogin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 relative overflow-hidden">
      <BackgroundDots />
    </div>
  );
}
