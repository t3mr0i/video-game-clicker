import React, { useEffect, useState } from 'react';
import FinanceComponent from './FinanceComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarAlt, faFastForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const TimeComponent = ({ 
    currentYear, 
    setCurrentYear, 
    platforms, 
    employees, 
    updateConsoleSales, 
    paySalaries, 
    addNotification, 
    updateWeeklySales, 
    currentWeek, 
    setCurrentWeek, 
    currentDay,
    setCurrentDay,
    salaryCosts, 
    bankAccount,
    resetGame 
}) => {
    const [currentMonth, setCurrentMonth] = useState(1);
    const [monthProgress, setMonthProgress] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(1400); // Default speed: 1400ms
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        
        const timer = setInterval(() => {
            advanceTime();
        }, gameSpeed); // Adjust the interval to control game speed

        return () => clearInterval(timer);
    }, [currentDay, currentMonth, currentYear, currentWeek, gameSpeed, isPaused]);

    const handleSpeedChange = (speed) => {
        setGameSpeed(speed);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

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
        
        // Update weekly sales when the week advances
        if (newDay % 7 === 0) {
            updateWeeklySales();
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
                    
                    <div className="flex mt-2 space-x-2">
                        <button 
                            onClick={togglePause} 
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-2 py-1"
                        >
                            <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
                        </button>
                        <button 
                            onClick={() => handleSpeedChange(1400)} 
                            className={`rounded px-2 py-1 ${gameSpeed === 1400 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                            title="Normal Speed"
                        >
                            1x
                        </button>
                        <button 
                            onClick={() => handleSpeedChange(700)} 
                            className={`rounded px-2 py-1 ${gameSpeed === 700 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                            title="Fast Speed"
                        >
                            2x
                        </button>
                        <button 
                            onClick={() => handleSpeedChange(350)} 
                            className={`rounded px-2 py-1 ${gameSpeed === 350 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                            title="Very Fast Speed"
                        >
                            4x
                        </button>
                        <button 
                            onClick={resetGame} 
                            className="bg-red-500 hover:bg-red-700 text-white rounded px-2 py-1 ml-2"
                            title="Reset Game"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            {/* Financial Overview */}
            <FinanceComponent salaryCosts={salaryCosts} bankAccount={bankAccount} />
        </div>
    );
};

export default TimeComponent;
