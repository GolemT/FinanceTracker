import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CircularProgress } from '@mui/material';
import MyChartProps from 'components/interfaces/MyChartProps';
import GraphData from 'components/interfaces/GraphData';
import {useDataContext} from "../../app/getContext";
import {useTheme} from "../../app/ThemeContext";

const MyChart: React.FC = () => {  // Vergewissern Sie sich, dass `user` als Prop übergeben wird
  const {themeMode} = useTheme()
  const {transactions, setTransactions, tags, setTags } = useDataContext();
  const chartRef = useRef<HTMLCanvasElement>(null);
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
    if (chartRef.current === null) return;

    const myChartRef = chartRef.current.getContext("2d");

    if (myChartRef === null) return;
    const chart = new Chart(myChartRef, {
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
          borderColor: 'white'
        }]
      },
      options:{
      }
    });

    return () => chart.destroy();
  }, [graphData]);

  return (
    <div>
      {isLoading ? <CircularProgress /> : <canvas ref={chartRef} />}
    </div>
  );
}

export default MyChart;
