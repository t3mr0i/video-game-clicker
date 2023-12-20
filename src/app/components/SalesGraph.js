import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
const SalesGraph = ({ game }) => {
    const salesData = {
        labels: game.sales.map((_, index) => `Week ${index + 1}`),
        datasets: [{
            label: 'Sales',
            data: game.sales,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        }],
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold text-gray-800">{game.name}</h3>
            {/* Other game details */}
            <div className="mt-4" style={{ width: '100%', overflowX: 'auto' }}>
                <Line data={salesData} options={{ maintainAspectRatio: false }} />
            </div>
            <p className="text-gray-700 mt-2">Total Revenue: ${game.revenue.toFixed(2)}</p>
        </div>
    );
};
export default SalesGraph;
