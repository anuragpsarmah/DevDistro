import { useEffect, useRef, useState } from "react";

export const useChartDimensions = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState<number>(400);

  const updateChartHeight = () => {
    if (chartContainerRef.current) {
      const height = chartContainerRef.current.offsetHeight;
      setChartHeight(height + 24);
    }
  };

  useEffect(() => {
    updateChartHeight();

    const resizeObserver = new ResizeObserver(updateChartHeight);

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return { chartContainerRef, chartHeight };
};
