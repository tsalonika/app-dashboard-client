import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarDiagramChart = ({ data }) => {
    const transformedData = data.map((item) => ({
        hour: `${item.hour}:00`,
        duration: item.duration_minutes,
    }));

    const chartData = {
        labels: transformedData.map((item) => item.hour),
        datasets: [
            {
                label: "Duration (Minutes)",
                data: transformedData.map((item) => item.duration),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Duration of Activities by Hour",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Hour",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Duration (Minutes)",
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarDiagramChart;
