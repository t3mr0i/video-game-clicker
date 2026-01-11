import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const FinanceComponent = () => {
    const { state } = useGameContext();

    const totalSalaryCosts = state.employees.reduce((total, emp) =>
        total + (emp.salary || 0), 0);
    const monthlySalaryCosts = totalSalaryCosts;
    const dailySalaryCosts = totalSalaryCosts / 30;

    return (
        <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
            <h3 className="text-base font-bold text-gray-800 mb-1">Financial Overview</h3>
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-700">Current Balance:</span>
                    <span className={`font-medium ${state.money >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${state.money.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-700">Monthly Salaries:</span>
                    <span className="font-medium text-gray-800">
                        ${monthlySalaryCosts.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-700">Daily Expenses:</span>
                    <span className="font-medium text-red-600">
                        ${dailySalaryCosts.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}
                    </span>
                </div>
                {state.employees.length > 0 && (
                    <div className="text-xs text-gray-500 border-t pt-1">
                        Employees: {state.employees.length}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinanceComponent;
