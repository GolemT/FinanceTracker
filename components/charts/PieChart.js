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
    const loadedTags = await window.electron.loadTags();

    const tagsArray = Object.keys(loadedTags);
    const sumsByTag = tagsArray.reduce((acc, tag) => {
        acc[tag] = 0;
        return acc;
      }, {});
  
      // Durchlaufe jede Transaktion und addiere den Betrag zu dem entsprechenden Tag
      Object.values(loadedData).forEach((item) => {
        if (item.amount < 0) { // Berücksichtigt nur Ausgaben
          item.tags.forEach((tag) => {
            if (sumsByTag.hasOwnProperty(tag)) {
              sumsByTag[tag] += parseFloat(item.amount);
            }
          });
        }
      });

      const labels = Object.keys(sumsByTag);
      const dataPoints = Object.values(sumsByTag);
  
    setGraphData({
      labels: labels,
      dataPoints: dataPoints
    });
  };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
      const myChartRef = chartRef.current.getContext("2d");
  
      const chart = new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: graphData.labels,
          datasets: [
            { 
              label: "Transaktions",
              data: graphData.dataPoints,
              fill: false,
              borderWidth: 0,
              backgroundColor: [
                // Hier können Sie Farben für jeden Tag definieren
                'rgba(219, 58, 52, 1)',
                'rgba(219, 58, 52, 0.4)',
                'rgba(32, 191, 85, 1)',
                'rgba(32, 191, 85, 0.4)',
                'rgb(49, 133, 252, 1)',
                'rgb(49, 133, 252, 0.4)'
            ],
              borderColor: "rgb(49, 133, 252, 1)"
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
