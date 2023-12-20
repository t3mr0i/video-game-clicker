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
    const salesData = game.sales && game.sales.length > 0 && {
        labels: game.sales.map((sale, index) => `Week ${index + 1}`),
        datasets: [{
            label: 'Sales',
            data: game.sales,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        }],
    }

    return (
        salesData && (
            <div className="mt-4" style={{ width: '200px', height: '200px' }}>
                <>
                    <Bar data={salesData} options={{ maintainAspectRatio: false, responsive: true }} key={game.id} />
                    <p className="text-gray-700 mt-2">Total Revenue: ${game.revenue.toFixed(2)}</p>
                </>
            </div>
        )
    );
};

export default GameDisplayComponent;
