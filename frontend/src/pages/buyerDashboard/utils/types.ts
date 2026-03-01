import { ReactNode } from "react";

export interface SidebarContentProps {
  activeTab: string;
  setActiveTab: (tabName: BuyerDashboardTabTypes) => void;
  logout?: () => Promise<void>;
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (openStatus: boolean) => void;
  onSwitchToSeller?: () => void;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tabName: BuyerDashboardTabTypes) => void;
  logout?: () => Promise<void>;
  onSwitchToSeller?: () => void;
}

export type BuyerDashboardTabTypes =
  | "Marketplace"
  | "Wishlist"
  | "Settings"
  | "Orders"
  | "Wallet";

export interface TransitionWrapperProps {
  isTransitioning: boolean;
  children: ReactNode;
  identifier: string | number;
  className?: string;
}
