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
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        
        const timer = setInterval(() => {
            advanceTime();
        }, gameSpeed); // Adjust the interval to control game speed

        return () => clearInterval(timer);
    }, [currentDay, currentMonth, currentYear, currentWeek, gameSpeed, paused]);

    const handleSpeedChange = (speed) => {
        setGameSpeed(speed);
    };

    const togglePaused = () => {
        setPaused(!paused);
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

    // Convert month number to name
    const getMonthName = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        return monthNames[month - 1]; // Adjust for 0-based array
    };

    // Format month display
    const formatMonth = (month) => {
        return getMonthName(month);
    };

    // Button styling with conditional classes
    const speedButtonClass = (speed) => {
        return `px-2 py-1 text-xs font-medium rounded ${gameSpeed === speed 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`;
    };

    return (
        <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800">Time Control</h2>
                <div className="text-gray-800">
                    <span className="font-semibold">{formatMonth(currentMonth)} {currentYear}</span>
                </div>
            </div>
            
            <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out" 
                        style={{ width: `${monthProgress}%` }}
                    ></div>
                </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1">
                <button 
                    onClick={togglePaused}
                    className={`px-2 py-1 font-medium rounded flex items-center ${paused 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
                >
                    <FontAwesomeIcon icon={paused ? faPlay : faPause} className="mr-1" />
                    {paused ? "Play" : "Pause"}
                </button>
                
                <div className="flex gap-1 ml-1">
                    <button onClick={() => setGameSpeed(1)} className={speedButtonClass(1)}>1x</button>
                    <button onClick={() => setGameSpeed(2)} className={speedButtonClass(2)}>2x</button>
                    <button onClick={() => setGameSpeed(5)} className={speedButtonClass(5)}>5x</button>
                </div>
            </div>
            
            <div className="save-status mt-1 flex items-center justify-center md:justify-start text-xs">
                <span className="mr-1 text-gray-800">Status:</span>
                <span className={`font-medium ${saveStatus === "Saved" ? "text-green-600" : saveStatus === "Failed" ? "text-red-600" : "text-blue-600"}`}>
                    {saveStatus || "Not saved"}
                </span>
                <span className="text-gray-500 ml-2">{formatLastSaved()}</span>
            </div>
        </div>
    );
};

export default TimeComponent;
