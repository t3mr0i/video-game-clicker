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
        return `px-2 py-1 text-xs font-medium rounded transition-all duration-300 ${gameSpeed === speed
            ? 'bg-blue-500 hover:bg-blue-600 text-white scale-105 shadow-lg'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white hover:scale-105'}`;
    };

    return (
        <div className="game-card bg-gray-800 border-2 border-purple-700 text-white p-3 rounded-lg shadow-xl mb-2">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-purple-300 border-b border-purple-700 pb-1">Time Control</h2>
                <div className="text-gray-200">
                    <span className="font-semibold text-blue-300">{formatMonth(month)} {year}</span>
                </div>
            </div>

            <div className="mb-2">
                <div className="w-full bg-gray-700 rounded-full h-2 border border-gray-600">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-in-out shadow-lg"
                        style={{ width: `${monthProgress}%` }}
                    ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                    Day {day} of {GAME_MECHANICS.DAYS_PER_MONTH}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-1">
                <button
                    onClick={() => handleSpeedChange(gameSpeed === 0 ? 1 : 0)}
                    className={`px-3 py-1 font-medium rounded flex items-center transition-all duration-300 transform hover:scale-105 ${gameSpeed === 0
                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg'}`}
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
