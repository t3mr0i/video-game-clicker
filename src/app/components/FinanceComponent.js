import React from 'react';

const FinanceComponent = ({ salaryCosts, bankAccount }) => {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
            <h3 className="text-base font-bold text-gray-800 mb-1">Financial Overview</h3>
            <div className="flex flex-col">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-700">Salary:</span>
                    <span className="font-medium text-gray-800">${salaryCosts.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-gray-700">Balance:</span>
                    <span className="font-medium text-green-600">${bankAccount.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                </div>
            </div>
        </div>
    );
};

export default FinanceComponent;
