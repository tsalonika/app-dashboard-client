import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    // Extract the data for the chart
    const chartData = data.map(item => ({
        label: new Date(item.date).toLocaleDateString(),
        data: {
            Likes: item.total_likes,
            Comments: item.total_comments,
            Views: item.total_views,
            Posts: item.total_posts
        }
    }));

    // Create labels for the x-axis
    const labels = chartData.map(item => item.label);

    // Define dataset colors
    const colors = {
        Likes: '#FF5733',
        Comments: '#33FF57',
        Views: '#3357FF',
        Posts: '#FF33A1'
    };

    // Generate datasets for each metric
    const datasets = Object.keys(colors).map(metric => ({
        label: metric,
        backgroundColor: colors[metric],
        data: chartData.map(item => item.data[metric] || 0)
    }));

    // Chart.js configuration object
    const chartConfig = {
        labels: labels,
        datasets: datasets
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Post Engagement Data',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const metric = tooltipItem.dataset.label;
                        const value = tooltipItem.raw;
                        const label = tooltipItem.label;
                        return `${metric}: ${value} on ${label}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Count'
                }
            }
        }
    };

    return <Bar data={chartConfig} options={options} />;
};

export default BarChart;
