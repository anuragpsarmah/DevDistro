import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundDots from "@/components/ui/backgroundDots";
import Sidebar from "./main-components/Sidebar";
import { BuyerDashboardTabTypes } from "./utils/types";
import MarketplaceTab from "./tabs/MarketplaceTab";

interface BuyerDashboardPageProps {
  logout?: () => Promise<void>;
}

export default function BuyerDashboardPage({
  logout,
}: BuyerDashboardPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<BuyerDashboardTabTypes>("Marketplace");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundDots />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logout={logout}
        onSwitchToSeller={() => navigate("/seller-dashboard")}
      />

      <main className="flex-1 p-8 overflow-auto relative z-10">
        {activeTab === "Marketplace" && <MarketplaceTab logout={logout} />}
      </main>
    </div>
  );
}
