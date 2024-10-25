import { useEffect, ReactNode } from "react";
import { user } from "@/utils/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

interface ProtectedAuthParentProps {
  children: ReactNode;
}

export default function ProtectedAuthParent({
  children,
}: ProtectedAuthParentProps) {
  const [activeUser] = useRecoilState(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser._id) {
      navigate("/authentication");
    }
  }, [activeUser, navigate]);

  return <>{children}</>;
}
