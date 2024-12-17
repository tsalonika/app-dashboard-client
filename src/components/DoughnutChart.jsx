import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, showLegend = true }) => {
    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = (i * 360) / numColors;
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    };

    const chartData = {
        labels: data.map(({ key }) => key.charAt(0).toUpperCase() + key.slice(1)),
        datasets: [
            {
                label: 'Total',
                data: data.map(({ count }) => count),
                backgroundColor: generateColors(data.length),
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: showLegend,
                position: 'bottom',
            },
        },
    };

    return (
        <div style={{ width: '500px', height: '500px' }}>
            <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
};

export default DoughnutChart;
