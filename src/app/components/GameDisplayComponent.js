import React from 'react';
import { Line } from 'react-chartjs-2';

const GameDisplayComponent = ({ game }) => {
    // Check if game.sales is defined and has data
    const salesData = game.sales && game.sales.length > 0 ? {
        labels: game.sales.map((sale, index) => `Week ${index + 1}`),
        datasets: [{
            label: 'Sales',
            data: game.sales,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        }],
    } : null;

    return (
        <div className="mt-4">
            {salesData ? (
                <>
                    <Line data={salesData} options={{ maintainAspectRatio: false }} />
                    <p className="text-gray-700 mt-2">Total Revenue: ${game.revenue.toFixed(2)}</p>
                </>
            ) : (
                <p className="text-gray-700 mt-2">Sales data not available.</p>
            )}
        </div>
    );
};

export default GameDisplayComponent;
