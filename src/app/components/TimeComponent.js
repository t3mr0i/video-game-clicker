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
        return `px-2 py-1 text-xs font-medium rounded ${gameSpeed === speed
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`;
    };

    return (
        <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800">Time Control</h2>
                <div className="text-gray-800">
                    <span className="font-semibold">{formatMonth(month)} {year}</span>
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
                    onClick={() => handleSpeedChange(gameSpeed === 0 ? 1 : 0)}
                    className={`px-2 py-1 font-medium rounded flex items-center ${gameSpeed === 0
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
                >
                    <FontAwesomeIcon icon={gameSpeed === 0 ? faPlay : faPause} className="mr-1" />
                    {gameSpeed === 0 ? "Play" : "Pause"}
                </button>

                <div className="flex gap-1 ml-1">
                    <button onClick={() => handleSpeedChange(1)} className={speedButtonClass(1)}>1x</button>
                    <button onClick={() => handleSpeedChange(2)} className={speedButtonClass(2)}>2x</button>
                    <button onClick={() => handleSpeedChange(5)} className={speedButtonClass(5)}>5x</button>
                    <button onClick={() => handleSpeedChange(10)} className={speedButtonClass(10)}>10x</button>
                </div>
            </div>
        </div>
    );
};

export default TimeComponent;
