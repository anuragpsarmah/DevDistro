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
  | "Cart"
  | "Account Settings"
  | "Order History"
  | "Wallet Connection";
