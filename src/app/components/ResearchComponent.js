import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faAngleRight, faFlask, faCog, faTimes, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { useGameContext } from '../contexts/GameContext';
import { GAME_MECHANICS } from '../config/gameConstants';

const ResearchComponent = ({
    technologies,
    unlockTechnology,
    gameEngines,
    createGameEngine,
    bankAccount,
    studioLevel,
    isResearchModalOpen,
    setIsResearchModalOpen,
    isCreateEngineModalOpen,
    setIsCreateEngineModalOpen,
    newEngineName,
    setNewEngineName,
    selectedEngineType,
    setSelectedEngineType
}) => {
    const { actions } = useGameContext();
    const [activeTab, setActiveTab] = useState('technologies');
    
    // Filter technologies by availability
    const availableTechnologies = (technologies || []).filter(tech => !tech.unlocked && tech.requiredLevel <= studioLevel);
    const unlockedTechnologies = (technologies || []).filter(tech => tech.unlocked);
    const lockedTechnologies = (technologies || []).filter(tech => !tech.unlocked && tech.requiredLevel > studioLevel);
    
    const openResearchModal = () => {
        setIsResearchModalOpen(true);
    };
    
    const closeResearchModal = () => {
        setIsResearchModalOpen(false);
    };
    
    const openEngineModal = () => {
        // Check if engine tech is unlocked
        const engineTech = (technologies || []).find(tech => tech.id === GAME_MECHANICS.TECHNOLOGY_IDS.GAME_ENGINE_FRAMEWORK);
        if (!engineTech || !engineTech.unlocked) {
            actions.addNotification({
                message: 'You need to unlock Game Engine Framework technology first',
                type: 'warning'
            });
            return;
        }

        setIsCreateEngineModalOpen(true);
    };
    
    const closeEngineModal = () => {
        setIsCreateEngineModalOpen(false);
        setNewEngineName('');
        setSelectedEngineType('');
    };
    
    const handleCreateEngine = () => {
        createGameEngine();
    };
    
    return (
        <div className="relative">
            {/* Research Button */}
            <button 
                onClick={openResearchModal}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
                <FontAwesomeIcon icon={faFlask} className="mr-2" />
                Research & Tech
            </button>
            
            {/* Game Engine Button */}
            <button 
                onClick={openEngineModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center mt-2"
            >
                <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
                Game Engines
            </button>
            
            {/* Research Modal */}
            <Modal
                isOpen={isResearchModalOpen}
                onRequestClose={closeResearchModal}
                className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-4xl shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Research & Technology</h2>
                    <button onClick={closeResearchModal} className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="flex border-b mb-4">
                    <button
                        className={`py-2 px-4 ${activeTab === 'technologies' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('technologies')}
                    >
                        Available Technologies
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'unlocked' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('unlocked')}
                    >
                        Unlocked Technologies
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'locked' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('locked')}
                    >
                        Locked Technologies
                    </button>
                </div>
                
                <div className="overflow-y-auto max-h-96">
                    {activeTab === 'technologies' && (
                        <div className="space-y-4">
                            {availableTechnologies.length === 0 ? (
                                <p className="text-center py-4 text-gray-500">No technologies available at your current level.</p>
                            ) : (
                                availableTechnologies.map(tech => (
                                    <div key={tech.id} className="border rounded-lg p-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold text-lg">{tech.name}</h3>
                                            <p className="text-gray-600">{tech.description}</p>
                                            <p className="text-sm text-gray-500">Required Studio Level: {tech.requiredLevel}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-green-600 mb-2">${tech.cost.toLocaleString()}</span>
                                            <button
                                                onClick={() => unlockTechnology(tech.id)}
                                                disabled={bankAccount < tech.cost}
                                                className={`px-4 py-2 rounded flex items-center ${
                                                    bankAccount < tech.cost 
                                                        ? 'bg-gray-300 cursor-not-allowed text-gray-600' 
                                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                                }`}
                                            >
                                                <FontAwesomeIcon icon={faMicrochip} className="mr-2" />
                                                {bankAccount < tech.cost ? 'Not enough funds' : 'Research'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    
                    {activeTab === 'unlocked' && (
                        <div className="space-y-4">
                            {unlockedTechnologies.length === 0 ? (
                                <p className="text-center py-4 text-gray-500">You haven't unlocked any technologies yet.</p>
                            ) : (
                                unlockedTechnologies.map(tech => (
                                    <div key={tech.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={faAngleRight} className="text-green-500 mr-2" />
                                            <h3 className="font-semibold text-lg">{tech.name}</h3>
                                        </div>
                                        <p className="text-gray-600 ml-6">{tech.description}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    
                    {activeTab === 'locked' && (
                        <div className="space-y-4">
                            {lockedTechnologies.map(tech => (
                                <div key={tech.id} className="border border-gray-200 bg-gray-50 rounded-lg p-4 opacity-75">
                                    <h3 className="font-semibold text-lg">{tech.name}</h3>
                                    <p className="text-gray-600">{tech.description}</p>
                                    <p className="text-sm text-red-500">Required Studio Level: {tech.requiredLevel}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Modal>
            
            {/* Game Engine Modal */}
            <Modal
                isOpen={isCreateEngineModalOpen}
                onRequestClose={closeEngineModal}
                className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-md shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Create Game Engine</h2>
                    <button onClick={closeEngineModal} className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engineName">
                        Engine Name
                    </label>
                    <input
                        id="engineName"
                        type="text"
                        value={newEngineName}
                        onChange={(e) => setNewEngineName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter engine name"
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engineType">
                        Engine Type
                    </label>
                    <select
                        id="engineType"
                        value={selectedEngineType}
                        onChange={(e) => setSelectedEngineType(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Type</option>
                        <option value="Basic">Basic (Cost: $15,000)</option>
                        <option value="Advanced">Advanced (Cost: $30,000)</option>
                        <option value="AAA">AAA (Cost: $45,000)</option>
                    </select>
                </div>
                
                {(gameEngines || []).length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Your Game Engines:</h3>
                        <div className="bg-gray-100 p-3 rounded max-h-32 overflow-y-auto">
                            {(gameEngines || []).map(engine => (
                                <div key={engine.id} className="border-b border-gray-200 py-2 last:border-b-0">
                                    <div className="font-medium">{engine.name}</div>
                                    <div className="text-sm text-gray-600">
                                        {engine.type} Engine - Efficiency: {engine.efficiency.toFixed(1)}x
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="flex items-center justify-end">
                    <button
                        onClick={closeEngineModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateEngine}
                        disabled={!(newEngineName || '').trim() || !selectedEngineType}
                        className={`font-bold py-2 px-4 rounded ${
                            !(newEngineName || '').trim() || !selectedEngineType
                                ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        Create Engine
                    </button>
                </div>
            </Modal>
        </div>
    );
};

ResearchComponent.propTypes = {
  technologies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    requiredLevel: PropTypes.number.isRequired,
    unlocked: PropTypes.bool
  })),
  unlockTechnology: PropTypes.func.isRequired,
  gameEngines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    efficiency: PropTypes.number.isRequired
  })),
  createGameEngine: PropTypes.func.isRequired,
  bankAccount: PropTypes.number.isRequired,
  studioLevel: PropTypes.number.isRequired,
  isResearchModalOpen: PropTypes.bool.isRequired,
  setIsResearchModalOpen: PropTypes.func.isRequired,
  isCreateEngineModalOpen: PropTypes.bool.isRequired,
  setIsCreateEngineModalOpen: PropTypes.func.isRequired,
  newEngineName: PropTypes.string,
  setNewEngineName: PropTypes.func.isRequired,
  selectedEngineType: PropTypes.string,
  setSelectedEngineType: PropTypes.func.isRequired
};

export default ResearchComponent;