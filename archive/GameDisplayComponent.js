import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GameDisplayComponent = ({ game }) => {
    // Adjust the labels to start from the shipping week
    const salesLabels = game.sales.map((_, index) => `Week ${index + 1 - game.shippingWeek + 1}`);

    const salesData = game.sales && game.sales.length > 0 && {
        labels: salesLabels,
        datasets: [{
            label: 'Weekly Sales',
            data: game.sales.slice(game.shippingWeek - 1), // Start the data from the shipping week
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.8)',
            borderWidth: 2,
            borderRadius: 5,
            hoverBackgroundColor: 'rgb(56, 145, 145)',
        }],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleColor: 'white',
                bodyColor: 'white',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Sales',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Weeks After Launch',
                },
            },
        },
    };

    return (
        salesData && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{game.title}</h3>
                    <span className="text-green-600 font-semibold">Total Revenue: ${game.revenue.toFixed(2)}</span>
                </div>
                <div className="h-48">
                    <Bar data={salesData} options={options} />
                </div>
            </div>
        )
    );
};

export default GameDisplayComponent;
