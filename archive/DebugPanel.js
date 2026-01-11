import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faFire, faMoneyBillWave, faLevelUp, faUsers, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const DebugPanel = ({ 
    isOpen, 
    onClose, 
    randomEvents,
    triggerEvent, 
    bankAccount, 
    setBankAccount,
    studioLevel,
    setStudioLevel,
    studioExp,
    setStudioExp,
    studioExpToNextLevel,
    setStudioExpToNextLevel,
    trendingGenre,
    setTrendingGenre,
    genres,
    nextGameSalesBoost,
    setNextGameSalesBoost
}) => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [moneyAmount, setMoneyAmount] = useState(10000);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [salesBoost, setSalesBoost] = useState(1.2);
    
    if (!isOpen) return null;
    
    const handleTriggerEvent = () => {
        if (!selectedEvent) return;
        triggerEvent(selectedEvent);
    };
    
    const addMoney = () => {
        setBankAccount(bankAccount + Number(moneyAmount));
    };
    
    const setStudioLevelManually = (level) => {
        setStudioLevel(level);
        setStudioExp(0);
        setStudioExpToNextLevel(1000 * level);
    };
    
    const setTrendingGenreManually = () => {
        if (!selectedGenre) return;
        
        setTrendingGenre({
            name: selectedGenre,
            boost: 1.5
        });
    };
    
    const setGameSalesBoost = () => {
        setNextGameSalesBoost(Number(salesBoost));
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                        <FontAwesomeIcon icon={faBug} className="mr-2 text-purple-600" />
                        Debug Panel
                    </h2>
                    <button 
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="space-y-6">
                    {/* Trigger Events */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Trigger Random Event</h3>
                        <div className="flex gap-2">
                            <select 
                                value={selectedEvent} 
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="flex-grow p-2 border rounded"
                            >
                                <option value="">Select an event...</option>
                                {randomEvents.map(event => (
                                    <option key={event.id} value={event.id}>
                                        {event.title} ({event.type})
                                    </option>
                                ))}
                            </select>
                            <button 
                                onClick={handleTriggerEvent}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex items-center"
                                disabled={!selectedEvent}
                            >
                                <FontAwesomeIcon icon={faAngleRight} className="mr-1" />
                                Trigger
                            </button>
                        </div>
                    </div>
                    
                    {/* Add Money */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 flex items-center">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-green-600" />
                            Add Money
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={moneyAmount}
                                onChange={(e) => setMoneyAmount(e.target.value)}
                                className="flex-grow p-2 border rounded"
                                min="1000"
                                step="1000"
                            />
                            <button 
                                onClick={addMoney}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    
                    {/* Studio Level */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 flex items-center">
                            <FontAwesomeIcon icon={faLevelUp} className="mr-2 text-blue-600" />
                            Set Studio Level
                        </h3>
                        <div className="flex gap-2">
                            <span className="p-2">Current: {studioLevel}</span>
                            <div className="flex-grow flex gap-1">
                                {[1, 2, 3, 5, 10].map(level => (
                                    <button 
                                        key={level}
                                        onClick={() => setStudioLevelManually(level)}
                                        className={`flex-grow bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded ${studioLevel === level ? 'bg-blue-700' : ''}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Set Trending Genre */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 flex items-center">
                            <FontAwesomeIcon icon={faFire} className="mr-2 text-orange-600" />
                            Set Trending Genre
                        </h3>
                        <div className="mb-2">
                            {trendingGenre ? (
                                <div className="text-orange-600">
                                    Current trending: {trendingGenre.name} (+{Math.round((trendingGenre.boost-1)*100)}% sales)
                                </div>
                            ) : (
                                <div className="text-gray-500">No genre currently trending</div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <select 
                                value={selectedGenre} 
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="flex-grow p-2 border rounded"
                            >
                                <option value="">Select a genre...</option>
                                {genres.map(genre => (
                                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                                ))}
                            </select>
                            <button 
                                onClick={setTrendingGenreManually}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                                disabled={!selectedGenre}
                            >
                                Set
                            </button>
                        </div>
                    </div>
                    
                    {/* Next Game Sales Boost */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Next Game Sales Boost</h3>
                        <div className="mb-2">
                            Current boost: +{Math.round((nextGameSalesBoost-1)*100)}%
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={salesBoost}
                                onChange={(e) => setSalesBoost(e.target.value)}
                                className="flex-grow p-2 border rounded"
                                min="1.0"
                                max="3.0"
                                step="0.1"
                            />
                            <button 
                                onClick={setGameSalesBoost}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebugPanel; 