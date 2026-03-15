import type { ChartDataObject } from "./types";

export function mergeChartData(
  prevData: ChartDataObject[],
  monthlySales: { sales: number }[]
): ChartDataObject[] {
  return prevData.map((item, index) => ({
    ...item,
    sales: index < monthlySales.length ? monthlySales[index].sales : item.sales,
  }));
}
