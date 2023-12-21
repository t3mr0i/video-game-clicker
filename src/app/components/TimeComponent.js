import React, { useEffect, useState } from 'react';
import FinanceComponent from './FinanceComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const TimeComponent = ({ currentYear, setCurrentYear, platforms, employees, updateConsoleSales, paySalaries, addNotification, updateWeeklySales, currentWeek, setCurrentWeek, salaryCosts, bankAccount }) => {
    const [currentMonth, setCurrentMonth] = useState(1);
    const [currentDay, setCurrentDay] = useState(1);
    const [monthProgress, setMonthProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            advanceTime();
        }, 1400); // Adjust the interval to control game speed

        return () => clearInterval(timer);
    }, [currentDay, currentMonth, currentYear, currentWeek]);

    const advanceTime = () => {
        let newDay = currentDay + 1;
        let newWeek = currentWeek;
        let newMonth = currentMonth;
        let newYear = currentYear;

        if (newDay > 30) { // Assuming each month has 30 days for simplicity
            newDay = 1;
            newMonth++;
            newWeek = 1;
        }

        if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        }

        if (newDay % 7 === 0) { // Advance the week every 7 days
            newWeek++;
        }

        // Update progress every day
        setMonthProgress((newDay / 30) * 100); // Progress based on day of the month

        updateConsoleSales(platforms, newYear, newMonth);
        if (newDay === 1 && newMonth === 1) {
            paySalaries(employees, newYear);
        }
        if (newDay === 1) {
            checkConsoleMarketChanges(newYear, newMonth);
        }

        setCurrentDay(newDay);
        setCurrentWeek(newWeek);
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };


    const checkConsoleMarketChanges = (year, month) => {
        platforms.forEach(platform => {
            if (platform.releaseYear === year && month === 1) {
                addNotification(`${platform.name} is now available!`, 'success');
            }
            // Additional logic for obsolete consoles
        });
    };

    return (
        <div className="flex items-center justify-between bg-gray-100 text-black p-4 rounded-lg shadow-md ">
            <div className="flex items-center space-x-3">
                <div>
                    <h2 className="text-lg font-bold text-gray-700">
                        <span className="text-gray-600">{String(currentDay).padStart(2, '0')}</span>-
                        <span className="text-gray-600">{String(currentMonth).padStart(2, '0')}</span>-
                        <span className="text-gray-600">{currentYear}</span>
                    </h2>
                    <div className="flex items-center mt-2">
                        <FontAwesomeIcon icon={faClock} className="text-sm text-gray-600 mr-2" />
                        <div className="bg-gray-200 rounded-full h-2.5 w-full">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${monthProgress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-1">Week <span className="text-gray-600">{currentWeek}</span></p>
                </div>
            </div>
            {/* Financial Overview */}
            <FinanceComponent salaryCosts={salaryCosts} bankAccount={bankAccount} />
        </div>
    );
};

export default TimeComponent;
