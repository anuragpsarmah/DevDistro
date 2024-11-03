import { useEffect, useRef, useState } from "react";

export const useChartDimensions = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState<number>(400);

  useEffect(() => {
    if (chartContainerRef.current) {
      const height = chartContainerRef.current.offsetHeight;
      setChartHeight(height + 24);
    }
  }, []);

  return { chartContainerRef, chartHeight };
};
