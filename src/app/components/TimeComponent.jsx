import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { GAME_MECHANICS } from '../config/gameConstants';

const TimeComponent = () => {
    const { state, actions } = useGameContext();
    const { currentDate, gameSpeed } = state;
    const { day, month, year } = currentDate;

    const handleSpeedChange = (speed) => {
        actions.toggleGameSpeed(speed);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const formatMonth = (monthNum) => monthNames[monthNum - 1];

    const monthProgress = (day / GAME_MECHANICS.DAYS_PER_MONTH) * 100;

    const speedButtonClass = (speed) => {
        return `px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${gameSpeed === speed
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`;
    };

    return (
        <div className="time-controls">
            <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-slate-600">
                    {formatMonth(month)} {year}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Day {day}/{GAME_MECHANICS.DAYS_PER_MONTH}</span>
                    <div className="w-16 bg-slate-200 rounded-full h-1.5">
                        <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${monthProgress}%` }}
                        ></div>
                    </div>
                </div>

                <button
                    onClick={() => handleSpeedChange(gameSpeed === 0 ? 1 : 0)}
                    className={`px-3 py-1.5 font-medium rounded-md flex items-center gap-2 transition-all duration-200 ${gameSpeed === 0
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'}`}
                >
                    <FontAwesomeIcon icon={gameSpeed === 0 ? faPlay : faPause} className="text-xs" />
                    {gameSpeed === 0 ? "Start" : "Pause"}
                </button>

                <div className="flex gap-1">
                    <button onClick={() => handleSpeedChange(1)} className={speedButtonClass(1)}>1×</button>
                    <button onClick={() => handleSpeedChange(2)} className={speedButtonClass(2)}>2×</button>
                    <button onClick={() => handleSpeedChange(5)} className={speedButtonClass(5)}>5×</button>
                    <button onClick={() => handleSpeedChange(10)} className={speedButtonClass(10)}>10×</button>
                </div>
            </div>
        </div>
    );
};

export default TimeComponent;
