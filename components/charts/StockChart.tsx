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
        if(!chartRef.current) return;
      const myChartRef = chartRef.current.getContext("2d");
  
    if(!myChartRef) return;
      const chart = new Chart(myChartRef, {
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
          plugins: {
            legend: {
              labels: {
                color: themeMode.text, // Farbe der Legenden-Texte
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: themeMode.text // Farbe der X-Achsen-Texte
              },
              grid: {
                color: themeMode.toggleBorder // Farbe der Gitterlinien
              }
            },
            y: {
              ticks: {
                color: themeMode.text // Farbe der Y-Achsen-Texte
              },
              grid: {
                color: themeMode.toggleBorder // Farbe der Gitterlinien
              }
            }
          }
        }
      });
  
      // Bereinigungsfunktion, um mehrfache Instanzen des Charts zu vermeiden
      return () => chart.destroy();
  }, [graphData]); // Füge graphData als Abhängigkeit hinzu
  

  return (
    <div>
      {isLoading ? <CircularProgress /> : <canvas ref={chartRef} />}
  </div>
  );
}

export default MyChart;
