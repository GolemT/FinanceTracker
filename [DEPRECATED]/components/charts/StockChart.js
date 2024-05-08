import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CircularProgress } from '@mui/material';

const MyChart = ({ transactions }) => {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState({
    labels: [],
    dataPoints: []
  })

  const fetchData = async () => {
    setIsLoading(true);
    const dataArray = Object.values(transactions).map((item) => ({
        date: item.date,
        amount: parseFloat(item.amount)
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

      let cummulativeSum = 0;
      const sumbsByDate = dataArray.reduce((acc, curr) => {
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
      const myChartRef = chartRef.current.getContext("2d");
  
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
        options: {}
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
