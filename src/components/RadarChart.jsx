import React from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const RadarChart = ({ data }) => {
    const labels = data.map((entry) => `${entry.hour}:00`);
    const durations = data.map((entry) => entry.duration_minutes);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Duration in Minutes',
                data: durations,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            r: {
                angleLines: { display: true },
                suggestedMin: 0,
                suggestedMax: Math.max(...durations) + 10,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    return <Radar data={chartData} options={options} />;
};

export default RadarChart;
