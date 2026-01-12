import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { formatCurrency, getChangeColor } from '../../utils/formatting';

const FinanceComponent = () => {
    const { state } = useGameContext();

    const totalSalaryCosts = state.employees.reduce((total, emp) =>
        total + (emp.salary || 0), 0);
    const monthlySalaryCosts = totalSalaryCosts;
    const dailySalaryCosts = totalSalaryCosts / 30;

    return (
        <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-green-600">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
                Financial Overview
            </h3>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-600">Current Balance</span>
                        <span className={`font-semibold ${state.money >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(state.money, 0)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-600">Monthly Salaries</span>
                        <span className="font-semibold text-amber-600">
                            {formatCurrency(monthlySalaryCosts, 0)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-600">Daily Expenses</span>
                        <span className="font-semibold text-red-600">
                            {formatCurrency(dailySalaryCosts, 2)}
                        </span>
                    </div>
                    {state.employees.length > 0 && (
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-slate-600">Total Employees</span>
                            <span className="font-semibold text-blue-600">
                                {state.employees.length}
                            </span>
                        </div>
                    )}
                </div>

                {state.money < 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-red-500">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-sm font-medium text-red-800">Cash Flow Warning</span>
                        </div>
                        <p className="text-sm text-red-700 mt-1">
                            Your company is operating at a loss. Consider reducing expenses or increasing revenue.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinanceComponent;
