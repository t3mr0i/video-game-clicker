import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faGamepad, faTrophy, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const FranchisesComponent = ({ franchises, projects, createProject }) => {
    const [selectedFranchise, setSelectedFranchise] = useState(null);
    const [isCreateSequelModalOpen, setIsCreateSequelModalOpen] = useState(false);
    
    if (franchises.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Franchises</h2>
                <p className="text-gray-500 text-center py-4">
                    No franchises yet. Create great games to establish valuable franchises!
                </p>
            </div>
        );
    }
    
    const handleCreateSequel = (franchise) => {
        setSelectedFranchise(franchise);
        setIsCreateSequelModalOpen(true);
    };
    
    const handleSequelCreation = () => {
        if (!selectedFranchise) return;
        
        // Find the last game in the franchise
        const lastGameId = selectedFranchise.lastGameId;
        const lastGame = projects.find(p => p.id === lastGameId);
        
        if (!lastGame) return;
        
        // Create a new sequel project based on the last game
        const sequelNumber = selectedFranchise.games.length + 1;
        const sequelName = `${selectedFranchise.name} ${sequelNumber}`;
        
        const newProject = {
            name: sequelName,
            size: lastGame.size,
            platform: lastGame.platform,
            genre: lastGame.genre,
            engineId: lastGame.engineId,
            engineName: lastGame.engineName,
            engineEfficiency: lastGame.engineEfficiency,
            franchiseId: selectedFranchise.id,
            requiredPoints: lastGame.requiredPoints * 1.2, // Sequels are more complex
            designPoints: 0,
            marketingPoints: 0,
            maxPoints: lastGame.maxPoints * 1.2,
            progress: 0,
            developmentPoints: 0,
            startDate: null,
            sales: [],
            revenue: 0,
            shipped: false
        };
        
        createProject(newProject);
        setIsCreateSequelModalOpen(false);
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Franchises</h2>
            
            <div className="space-y-4">
                {franchises.map(franchise => {
                    // Calculate years since franchise creation
                    const franchiseAge = franchise.games.length > 1 ? 
                        `${franchise.games.length} games since ${franchise.created}` : 
                        `Started in ${franchise.created}`;
                    
                    return (
                        <div key={franchise.id} className="border rounded-lg p-3 hover:bg-gray-50">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium text-lg">{franchise.name}</h3>
                                <button 
                                    onClick={() => handleCreateSequel(franchise)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                                >
                                    Create Sequel
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                                    <span>Rating: {franchise.averageRating.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FontAwesomeIcon icon={faUsers} className="text-blue-500 mr-1" />
                                    <span>Fanbase: {franchise.fanbase.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FontAwesomeIcon icon={faGamepad} className="text-purple-500 mr-1" />
                                    <span>Games: {franchise.games.length}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-green-500 mr-1" />
                                    <span>{franchiseAge}</span>
                                </div>
                            </div>
                            
                            <div className="mt-2 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faTrophy} className="text-orange-500 mr-1" />
                                <span>Total revenue: ${franchise.totalSales.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Create Sequel Modal */}
            {isCreateSequelModalOpen && selectedFranchise && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-bold mb-4">Create a Sequel</h3>
                        <p className="mb-4">
                            Create a sequel in the {selectedFranchise.name} franchise?
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            This will create a new game project with similar properties to the last game in this franchise.
                            The sequel will gain bonuses from the franchise's fanbase.
                        </p>
                        
                        <div className="flex justify-end space-x-2">
                            <button 
                                onClick={() => setIsCreateSequelModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSequelCreation}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Create Sequel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FranchisesComponent; 