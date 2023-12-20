import React from 'react';

const FinanceComponent = ({ salaryCosts, bankAccount }) => {
    return (
        <div>
            <h3 className="text-lg font-bold text-gray-800">Financial Overview</h3>
            <p className="text-gray-700">Total Salary Costs: ${salaryCosts.toFixed(2)}</p>
            <p className="text-gray-700">Bank Account Balance: ${bankAccount.toFixed(2)}</p>
        </div>
    );
};

export default FinanceComponent;
