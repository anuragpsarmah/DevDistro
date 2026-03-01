import { Store, User, ShoppingCart, History } from "lucide-react";
import { SolanaLogo } from "@/components/ui/solanaLogo";

export const sidebarItems = [
  { icon: Store, label: "Marketplace" },
  { icon: ShoppingCart, label: "Wishlist" },
  { icon: User, label: "Settings" },
  { icon: History, label: "Orders" },
  { icon: SolanaLogo, label: "Wallet" },
] as const;
