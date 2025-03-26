import React, { useEffect, useState } from 'react';
import FinanceComponent from './FinanceComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarAlt, faFastForward, faPause, faPlay, faBug, faSave } from '@fortawesome/free-solid-svg-icons';

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
    resetGame,
    isDebugPanelOpen,
    toggleDebugPanel,
    manualSaveGame,
    saveStatus,
    lastSavedTime
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

    const formatLastSaved = () => {
        if (!lastSavedTime) return "Never saved";
        
        // Format time difference
        const now = new Date();
        const diff = now - lastSavedTime;
        
        // Less than a minute
        if (diff < 60000) {
            return "Just now";
        }
        
        // Less than an hour
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        }
        
        // Show time only
        return lastSavedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <div className="w-full bg-gray-100 text-black p-4 rounded-lg shadow-md mb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="w-full md:w-auto mb-4 md:mb-0">
                    <h2 className="text-xl font-bold text-gray-700 flex items-center justify-center md:justify-start">
                        <span className="text-gray-800">{String(currentDay).padStart(2, '0')}</span>-
                        <span className="text-gray-800">{String(currentMonth).padStart(2, '0')}</span>-
                        <span className="text-gray-800">{currentYear}</span>
                    </h2>
                    <div className="flex items-center mt-2">
                        <FontAwesomeIcon icon={faClock} className="text-sm text-gray-600 mr-2" />
                        <div className="bg-gray-200 rounded-full h-2.5 w-full">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${monthProgress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    </div>
                    <p className="text-center md:text-left text-gray-800 mt-1">Week <span className="font-medium">{currentWeek}</span></p>
                    
                    <div className="time-controls mt-3 flex flex-wrap gap-2">
                        <button 
                            onClick={togglePause} 
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-3 py-2"
                            aria-label={isPaused ? "Resume game" : "Pause game"}
                        >
                            <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
                        </button>
                        <button 
                            onClick={() => handleSpeedChange(1400)} 
                            className={`rounded px-3 py-2 ${gameSpeed === 1400 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                            title="Normal Speed"
                        >
                            1x
                        </button>
                        <button 
                            onClick={() => handleSpeedChange(700)} 
                            className={`rounded px-3 py-2 ${gameSpeed === 700 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                            title="Fast Speed"
                        >
                            2x
                        </button>
                        <button 
                            onClick={() => handleSpeedChange(350)} 
                            className={`rounded px-3 py-2 ${gameSpeed === 350 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                            title="Very Fast Speed"
                        >
                            4x
                        </button>
                        <button 
                            onClick={manualSaveGame} 
                            className="bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 flex items-center"
                            title="Save Game"
                        >
                            <FontAwesomeIcon icon={faSave} className="mr-1" />
                            Save
                        </button>
                        <button 
                            onClick={resetGame} 
                            className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2"
                            title="Reset Game"
                        >
                            Reset
                        </button>
                        <button 
                            onClick={toggleDebugPanel} 
                            className={`rounded px-3 py-2 ${isDebugPanelOpen ? 'bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
                            title="Debug Panel"
                        >
                            <FontAwesomeIcon icon={faBug} />
                        </button>
                    </div>
                    
                    <div className="save-status mt-2 flex items-center justify-center md:justify-start">
                        <span className="mr-1 text-gray-800">Status:</span>
                        <span className={`font-medium ${saveStatus === "Saved" ? "text-green-600" : saveStatus === "Failed" ? "text-red-600" : "text-blue-600"}`}>
                            {saveStatus || "Not saved"}
                        </span>
                        <span className="text-gray-500 ml-2">{formatLastSaved()}</span>
                    </div>
                </div>
                
                {/* Financial Overview */}
                <FinanceComponent salaryCosts={salaryCosts} bankAccount={bankAccount} />
            </div>
        </div>
    );
};

export default TimeComponent;
