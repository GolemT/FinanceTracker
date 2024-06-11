import React, { useRef, useEffect, useState } from 'react';
import Chart, {ChartConfiguration, ChartTypeRegistry} from 'chart.js/auto';
import { CircularProgress } from '@mui/material';
import MyChartProps from 'components/interfaces/MyChartProps';
import GraphData from 'components/interfaces/GraphData';
import {useDataContext} from "../../app/getContext";
import {useTheme} from "../../app/ThemeContext";
import {Chart as ChartJS} from 'chart.js';

const MyChart: React.FC = () => {
  const {themeMode} = useTheme()
  const {transactions, setTransactions, tags, setTags } = useDataContext();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<ChartJS<"pie", number[], string>|null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState<GraphData>({
    labels: [],
    dataPoints: []
  });


  Chart.defaults.color = themeMode.text;


  const fetchData = async () => {
    setIsLoading(true);

        const tagsArray = tags.map(tag => tag.name);
        const sumsByTag = tagsArray.reduce((acc, tag) => {
          acc[tag] = 0;
          return acc;
        }, {});

        // Durchlaufe jede Transaktion und addiere den Betrag zu dem entsprechenden Tag
        transactions.forEach((item) => {
            let amount = parseFloat(item.amount)
          if (amount < 0) { // Berücksichtigt nur Ausgaben
            item.tags.forEach((tag) => {
              if (sumsByTag.hasOwnProperty(tag)) {
                sumsByTag[tag] += amount;
              }
            });
          }
        });

        setGraphData({
          labels: Object.keys(sumsByTag),
          dataPoints: Object.values(sumsByTag)
        });
        setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [transactions, tags]);

  useEffect(() => {
    if (!chartRef.current) return;
    const context = chartRef.current.getContext("2d");
      if (!context) return;

    const chartConfig: ChartConfiguration<'pie', number[], string> = {
      type: "pie",
      data: {
        labels: graphData.labels,
        datasets: [{
          label: "Transactions",
          data: graphData.dataPoints,
          backgroundColor: [
            'rgba(219, 58, 52, 0.7)',
            'rgba(32, 191, 85, 0.7)',
            'rgba(49, 133, 252, 0.7)'
          ],
          borderColor: themeMode.toggleBorder
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        plugins: {
          tooltip: {
            bodyColor: themeMode.text,  // Anfangswert der Tooltip-Farbe
          },
        },
    }};

    const newChartInstance = new Chart(context, chartConfig);
    setChartInstance(newChartInstance)

    return () => newChartInstance.destroy();
  }, [graphData]);

  useEffect(()=> {
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
  }, [themeMode])

  return (
    <div>
      {isLoading ? <CircularProgress /> : <canvas ref={chartRef} />}
    </div>
  );
}

export default MyChart;
