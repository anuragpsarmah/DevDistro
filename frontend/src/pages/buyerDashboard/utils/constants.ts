import { Store, ShoppingCart, Archive, ShoppingBag } from "lucide-react";

export const sidebarItems = [
  { icon: Store, label: "Marketplace" },
  { icon: ShoppingCart, label: "Wishlist" },
  { icon: ShoppingBag, label: "Purchases" },
  { icon: Archive, label: "Purchase Ledger" },
] as const;

export const DEBOUNCE_MS = 400;
