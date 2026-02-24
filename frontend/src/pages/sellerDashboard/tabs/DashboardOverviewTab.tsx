import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useCommonSalesInformationQuery,
  useYearlySalesInformationQuery,
} from "@/hooks/apiQueries";
import { useYearOptions } from "../hooks/useYearOptions";
import { INITIAL_CHART_DATA, INITIAL_SALES_INFO } from "../utils/constants";
import type { ChartDataObject } from "../utils/types";
import AnimatedLoadWrapper from "@/components/wrappers/AnimatedLoadWrapper";
import { SalesMetrics } from "../main-components/SalesMetrics";
import MonthlySales from "../main-components/MonthlySales";

interface DashboardOverviewTabProps {
  logout?: () => Promise<void>;
}

export default function DashboardOverviewTab({
  logout,
}: DashboardOverviewTabProps) {
  const [chartData, setChartData] =
    useState<ChartDataObject[]>(INITIAL_CHART_DATA);
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  const { toast } = useToast();
  const years = useYearOptions();

  const {
    data: commonInfoData,
    isLoading: commonInfoLoading,
    isError: commonInfoError,
  } = useCommonSalesInformationQuery({ logout });

  const {
    data: yearlyData,
    isLoading: yearlyLoading,
    isError: yearlyError,
  } = useYearlySalesInformationQuery(parseInt(selectedYear), { logout });

  useEffect(() => {
    if (!yearlyLoading && !yearlyError && yearlyData?.data) {
      setChartData((prevData) =>
        prevData.map((item, index) => ({
          ...item,
          sales:
            index < yearlyData.data.monthly_sales.length
              ? yearlyData.data.monthly_sales[index].sales
              : item.sales,
        }))
      );
    }
  }, [yearlyData, yearlyLoading, yearlyError, toast]);

  return (
    <AnimatedLoadWrapper>
      <div className="flex flex-col min-h-[calc(100vh-3rem)] lg:h-[calc(100vh-56px)] mt-10 lg:mt-0 pb-6 gap-12 lg:gap-16">
        <div className="flex-shrink-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-[2px] bg-red-500"></div>
            <span className="font-space font-bold uppercase tracking-[0.2em] text-xs text-red-500">
              Overview
            </span>
          </div>
          <h1 className="font-syne text-4xl lg:text-6xl text-left font-black tracking-widest leading-none text-black dark:text-white uppercase break-words hyphens-auto">
            Dashboard
          </h1>
          <p className="font-space text-lg text-gray-600 dark:text-gray-400 mt-6 leading-relaxed max-w-2xl">
            Track your sales performance and metrics in real-time.
          </p>
        </div>

        <div className="flex-shrink-0 w-full">
          <SalesMetrics
            salesInfo={
              !commonInfoLoading && !commonInfoError && commonInfoData
                ? commonInfoData.data
                : INITIAL_SALES_INFO
            }
            isLoading={commonInfoLoading}
          />
        </div>

        <div className="flex-1 min-h-0 w-full">
          <MonthlySales
            selectedYear={selectedYear}
            years={years}
            onYearChange={setSelectedYear}
            isLoading={yearlyLoading}
            chartData={chartData}
          />
        </div>
      </div>
    </AnimatedLoadWrapper>
  );
}
