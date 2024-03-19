import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const MyChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: [],
    dataPoints: []
  })

  const fetchData = async () => {
    const loadedData = await window.electron.loadData();
    const dataArray = Object.values(loadedData).map((item) => ({
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
  };

    useEffect(() => {
        fetchData();
    }, []);

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
      <canvas ref={chartRef} />
  );
}

export default MyChart;
