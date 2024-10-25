import { User } from "@/types/recoil.type";
import { atom, RecoilState } from "recoil";

const user: RecoilState<User> = atom({
  key: "user",
  default: {
    _id: "",
    username: "",
    name: "",
    profileImageUrl: "",
  },
});

export { user };
