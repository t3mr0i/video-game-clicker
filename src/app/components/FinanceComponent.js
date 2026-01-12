import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { formatCurrency, getChangeColor } from '../utils/formatting';

const FinanceComponent = () => {
    const { state } = useGameContext();

    const totalSalaryCosts = state.employees.reduce((total, emp) =>
        total + (emp.salary || 0), 0);
    const monthlySalaryCosts = totalSalaryCosts;
    const dailySalaryCosts = totalSalaryCosts / 30;

    return (
        <div className="game-card bg-gray-800 border-2 border-blue-700 text-white p-3 rounded-lg shadow-xl text-sm">
            <h3 className="text-base font-bold text-blue-300 mb-1 border-b border-blue-700 pb-1">Financial Overview</h3>
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Current Balance:</span>
                    <span className={`font-medium ${getChangeColor(state.money)}`}>
                        {formatCurrency(state.money, 0)}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Monthly Salaries:</span>
                    <span className="font-medium text-yellow-400">
                        {formatCurrency(monthlySalaryCosts, 0)}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Daily Expenses:</span>
                    <span className="font-medium text-red-400">
                        {formatCurrency(dailySalaryCosts, 2)}
                    </span>
                </div>
                {state.employees.length > 0 && (
                    <div className="text-xs text-gray-400 border-t border-gray-600 pt-1">
                        Employees: {state.employees.length}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinanceComponent;
