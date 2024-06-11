import React, { useRef, useEffect, useState, useContext } from 'react';
import Chart from 'chart.js/auto';
import { CircularProgress } from '@mui/material';
import GraphData from 'components/interfaces/GraphData';
import Transaction from 'components/interfaces/transactions';
import { useDataContext } from 'app/getContext';
import { useTheme } from 'app/ThemeContext';

const MyChart: React.FC = () => {
  const { themeMode } = useTheme();
  const {transactions } = useDataContext();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState<GraphData>({
    labels: [],
    dataPoints: []
  })

  const fetchData = async () => {
    setIsLoading(true);
    const dataArray = Object.values(transactions).map((item: Transaction) => ({
        date: item.date,
        amount: parseFloat(item.amount)
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      let cummulativeSum = 0;
      const sumbsByDate = dataArray.reduce<{ dates: string[]; sums: number[]}>((acc, curr) => {
        cummulativeSum += curr.amount;
        acc.dates.push(curr.date);
        acc.sums.push(cummulativeSum);
        return acc;
      }, {dates: [], sums: []});
      
      setGraphData({
        labels: sumbsByDate.dates,
        dataPoints: sumbsByDate.sums
      });
    setIsLoading(false);
};

    useEffect(() => {
        fetchData();
    }, [transactions]);

    useEffect(() => {
      if (!chartRef.current) return;
      const context = chartRef.current.getContext("2d");
      if (!context) return;
  
      const newChartInstance = new Chart(context, {
        type: "line",
        data: {
          labels: graphData.labels,
          datasets: [
            { 
              label: "Transaktions",
              data: graphData.dataPoints,
              fill: false,
              borderColor: "#3185FC"
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 1,
          plugins: {
            tooltip: {
              bodyColor: themeMode.text,  // Anfangswert der Tooltip-Farbe
            },
          },
          scales: {
            x: {
              ticks: {
                color: themeMode.text,  // Anfangswert der X-Achsen-Ticks-Farbe
              },
            },
            y: {
              ticks: {
                color: themeMode.text,  // Anfangswert der Y-Achsen-Ticks-Farbe
              },
            },
          },
        }
      });
      setChartInstance(newChartInstance);
  
      return () => {
        newChartInstance.destroy();
      };
    }, [graphData]);

      useEffect(() => {
        if (!chartInstance) return;
          // Update der Konfiguration mit neuen Farben
          if (chartInstance.options.plugins?.tooltip) {
            chartInstance.options.plugins.tooltip.bodyColor = themeMode.text;
          }
          if (chartInstance.options.scales?.x?.ticks) {
            chartInstance.options.scales.x.ticks.color = themeMode.text;
          }
          if (chartInstance.options.scales?.y?.ticks) {
            chartInstance.options.scales.y.ticks.color = themeMode.text;
          }
          chartInstance.update();
      }, [themeMode]);  

  return (
    <div>
      {isLoading ? <CircularProgress /> : <canvas ref={chartRef} />}
  </div>
  );
}

export default MyChart;
