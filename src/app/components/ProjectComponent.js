import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import GameDisplayComponent from './GameDisplayComponent';
import MetaCriticRatingComponent from './MetaCriticRatingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faPlus, faHammer, faFire, faRocket, faCogs, faTrophy, faInfoCircle, faQuestionCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';
const ProjectComponent = ({ 
    projects, 
    startNewProject, 
    gameEngines, 
    genres, 
    platforms, 
    currentYear, 
    cancelProject, 
    getBestGenre, 
    shipGame, 
    franchises,
    openShippingModal
}) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [selectedSize, setSelectedSize] = useState('A'); // A, AA, AAA
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedGameEngine, setSelectedGameEngine] = useState('');
    const [selectedFranchise, setSelectedFranchise] = useState(''); // For creating a sequel
    const [developmentPoints, setDevelopmentPoints] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(null);
    const defaultOption = <option value="" disabled>---</option>;

    const gameSizes = {
        'A': 1,
        'AA': 2,
        'AAA': 3
    };

    useEffect(() => {
        calculateDevelopmentPoints();
    }, [selectedSize, selectedPlatform, selectedGenre, currentYear, selectedFranchise]);

    const calculateDevelopmentPoints = () => {
        const platform = platforms.find(p => p.name === selectedPlatform);
        const genre = genres.find(g => g.name === selectedGenre);

        if (platform && genre) {
            const platformFactor = platform.power + platform.difficulty;
            const genreFactor = genre.complexity;
            const sizeFactor = gameSizes[selectedSize];

            // Base points calculation
            let points = (platformFactor + genreFactor) * sizeFactor * 100;
            
            // Year adjustment - games become more complex over time
            points *= 1 + (currentYear - 1985) / 100;
            
            // Genre popularity adjustment
            // Popular genres are more competitive and require more effort
            const popularityAdjustment = (genre.popularity - 6) * 0.05; // -0.1 to +0.15 modifier
            points *= (1 + popularityAdjustment);

            // If this is a sequel, apply franchise development bonus
            if (selectedFranchise) {
                const franchise = franchises.find(f => f.id === selectedFranchise);
                if (franchise) {
                    const sequelNumber = franchise.games.length;
                    const devBonus = Math.min(20, sequelNumber * 5); // 5% per sequel, max 20%
                    points = points * (1 - devBonus/100); // Reduce required points
                }
            }

            setDevelopmentPoints(Math.round(points));
        } else {
            setDevelopmentPoints(0);
        }
    };

    const handleCreateProject = () => {
        const maxPoints = developmentPoints;
        
        // Find the selected engine if one was chosen
        const engine = gameEngines.find(engine => engine.id === selectedGameEngine);
        
        // Calculate development boosts from the engine
        const engineEfficiency = engine ? engine.efficiency : 1.0;
        const engineBoost = engine ? `Using ${engine.name} Engine` : null;

        // Check if this genre is trending
        const isTrendingGenre = false; // Removed trendingGenre check as the prop is not available

        // Get franchise information if this is a sequel
        let franchiseId = null;
        if (selectedFranchise) {
            franchiseId = selectedFranchise;
        }

        if (newProjectName.trim() !== '' && selectedPlatform && selectedGenre) {
            const newProject = {
                id: Math.random().toString(36).substr(2, 9), // Simple ID generation
                name: newProjectName,
                size: selectedSize,
                platform: selectedPlatform,
                genre: selectedGenre,
                engineId: selectedGameEngine,
                engineName: engine ? engine.name : null,
                engineEfficiency: engineEfficiency,
                franchiseId: franchiseId,
                isTrendingGenre: isTrendingGenre,
                requiredPoints: Math.round(developmentPoints / engineEfficiency), // Engine reduces required points
                designPoints: 0,
                marketingPoints: 0,
                maxPoints: maxPoints,
                progress: 0,
                developmentPoints: 0,
                shippingWeek: 0,
                sales: [], // Initialize with an empty array
                revenue: 0, // Initialize revenue
                shipped: false, // Initialize shipping status
                startDate: `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
            };

            startNewProject(newProject);

            setNewProjectName('');
            setSelectedPlatform('');
            setSelectedGenre('');
            setSelectedGameEngine('');
            setSelectedFranchise('');
            setIsModalOpen(false);
        } else {
            alert("Please fill out all required fields (name, platform, and genre)");
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const availablePlatforms = platforms.filter(platform => platform.releaseYear <= currentYear);

    // Helper function to check if a genre is trending using getBestGenre
    const isGenreTrending = (genreName) => {
        if (getBestGenre) {
            const bestGenre = getBestGenre();
            return bestGenre && bestGenre.name === genreName;
        }
        return false;
    };

    // Get franchise name from ID
    const getFranchiseName = (franchiseId) => {
        if (!franchiseId) return null;
        const franchise = franchises.find(f => f.id === franchiseId);
        return franchise ? franchise.name : null;
    };

    // Show tooltip with explanation for buttons and options
    const displayTooltip = (id) => {
        setShowTooltip(id);
    };

    // Hide tooltip
    const hideTooltip = () => {
        setShowTooltip(null);
    };

    // Tooltip content based on ID
    const getTooltipContent = (id) => {
        switch (id) {
            case 'size':
                return "Game size affects development complexity and potential market. A=Small, AA=Medium, AAA=Large.";
            case 'platform':
                return "Select a platform for your game. More powerful platforms offer better sales but are harder to develop for.";
            case 'genre':
                return "Select your game's genre. Stars indicate popularity (★★★★★ = most popular).";
            case 'engine':
                return "Using an engine can speed up development. Better engines provide more efficiency.";
            case 'franchise':
                return "Create a sequel to an existing game franchise to leverage existing fans.";
            case 'work':
                return "Manually add development progress to this project.";
            case 'ship':
                return "Ship your game when it's complete to start earning revenue.";
            case 'cancel':
                return "Cancel this project. All progress will be lost.";
            default:
                return "";
        }
    };

    // Handle shipping a project
    const handleShipGame = (projectId) => {
        // Use the openShippingModal prop directly
        if (openShippingModal && typeof openShippingModal === 'function') {
            openShippingModal(projectId);
        } else {
            console.error("openShippingModal is not available");
        }
    };

    // Handle canceling a project
    const handleCancelProject = (projectId) => {
        if (window.confirm("Are you sure you want to cancel this project? All progress will be lost.")) {
            cancelProject(projectId);
        }
    };

    function renderProgress(progress, requiredPoints) {
        const cycleCount = Math.floor(progress / requiredPoints); // Number of complete cycles
        const currentProgress = (progress % requiredPoints) / requiredPoints * 100; // Remaining progress after cycles, scaled to a percentage

        // Define colors for each cycle, add more colors if needed
        const cycleColors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500'];

        // Determine the color based on the cycle count
        const barColor = cycleColors[cycleCount % cycleColors.length];

        // Return the progress bar with dynamic width and color
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5 md-2">
                <div
                    className={`${barColor} h-2.5 rounded-full transition-all duration-300 ease-in-out `}
                    style={{ width: `${currentProgress}%` }}
                ></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md app">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Projects</h2>
                    {getBestGenre && getBestGenre() && (
                        <div className="text-orange-500 mt-1 flex items-center">
                            <FontAwesomeIcon icon={faFire} className="mr-1" />
                            <span>Trending Genre: {getBestGenre().name} (+20% sales)</span>
                        </div>
                    )}
                </div>
                <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create New Project
                </button>
            </div>

            {/* Projects list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.length === 0 ? (
                    <div className="col-span-full text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                        <FontAwesomeIcon icon={faRocket} className="text-3xl text-gray-400 mb-2" />
                        <p className="text-gray-500">No projects yet. Create your first game project!</p>
                    </div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className={`bg-white p-4 rounded-lg shadow border-l-4 ${project.shipped ? 'border-green-500' : 'border-blue-500'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                                <div className="flex space-x-1">
                                    {project.progress >= 100 && !project.shipped && (
                                        <button 
                                            className="bg-green-500 hover:bg-green-700 text-white rounded p-1"
                                            onClick={() => handleShipGame(project.id)}
                                            onMouseEnter={() => displayTooltip(`ship-${project.id}`)}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <FontAwesomeIcon icon={faShip} />
                                        </button>
                                    )}
                                    {!project.shipped && (
                                        <button 
                                            className="bg-red-500 hover:bg-red-700 text-white rounded p-1"
                                            onClick={() => handleCancelProject(project.id)}
                                            onMouseEnter={() => displayTooltip(`cancel-${project.id}`)}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    )}
                                    {showTooltip === `ship-${project.id}` && (
                                        <div className="absolute bg-black text-white text-xs p-1 rounded mt-6 z-10">
                                            Ship your game
                                        </div>
                                    )}
                                    {showTooltip === `cancel-${project.id}` && (
                                        <div className="absolute bg-black text-white text-xs p-1 rounded mt-6 z-10">
                                            Cancel project
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="text-sm mb-2">
                                <span className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mb-1 text-gray-800">{project.platform}</span>
                                <span className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mb-1 text-gray-800">{project.genre}</span>
                                <span className="inline-block bg-gray-200 rounded px-2 py-1 mb-1 text-gray-800">{project.size}</span>
                                {project.isTrendingGenre && (
                                    <span className="inline-block bg-orange-200 text-orange-700 rounded px-2 py-1 mb-1 ml-1">
                                        <FontAwesomeIcon icon={faFire} className="mr-1" />
                                        Trending
                                    </span>
                                )}
                            </div>

                            {/* Project details */}
                            <div className="text-sm text-gray-700 mb-2">
                                <div className="flex justify-between">
                                    <span>Progress:</span>
                                    <span>{Math.min(100, Math.round(project.progress))}%</span>
                                </div>
                                {renderProgress(project.progress, 100)}
                                
                                {!project.shipped && (
                                    <div className="mt-2">
                                        <span className="text-gray-800">Dev Points: {Math.round(project.developmentPoints)}/{project.requiredPoints}</span>
                                    </div>
                                )}
                                
                                {project.engineName && (
                                    <div className="mt-1 text-blue-600">
                                        <FontAwesomeIcon icon={faCogs} className="mr-1" />
                                        {project.engineName} Engine
                                    </div>
                                )}
                                
                                {project.franchiseId && (
                                    <div className="mt-1 text-purple-600">
                                        <FontAwesomeIcon icon={faTrophy} className="mr-1" />
                                        {getFranchiseName(project.franchiseId)} Franchise
                                    </div>
                                )}
                            </div>
                            
                            {/* For shipped games, show the sales and revenue */}
                            {project.shipped && (
                                <div className="mt-2">
                                    <div className="text-sm text-gray-800">Total Sales: {project.sales ? project.sales.reduce((sum, sale) => sum + sale, 0).toLocaleString() : 0} units</div>
                                    <div className="text-sm text-green-600">Revenue: ${project.revenue ? project.revenue.toLocaleString() : 0}</div>
                                    {project.metaCriticScore && (
                                        <div className="mt-1">
                                            <MetaCriticRatingComponent score={project.metaCriticScore} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* New Project Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Create New Project"
                className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Create New Project</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Game Size
                        <button className="ml-1 text-blue-500" onMouseEnter={() => displayTooltip('size')} onMouseLeave={hideTooltip}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </button>
                    </label>
                    <div className="flex space-x-2">
                        <button
                            className={`flex-1 py-2 px-4 rounded ${selectedSize === 'A' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setSelectedSize('A')}
                        >
                            A
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 rounded ${selectedSize === 'AA' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setSelectedSize('AA')}
                        >
                            AA
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 rounded ${selectedSize === 'AAA' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setSelectedSize('AAA')}
                        >
                            AAA
                        </button>
                    </div>
                    {showTooltip === 'size' && (
                        <div className="mt-1 text-sm text-gray-600 bg-gray-100 p-2 rounded">
                            {getTooltipContent('size')}
                        </div>
                    )}
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Platform
                        <button className="ml-1 text-blue-500" onMouseEnter={() => displayTooltip('platform')} onMouseLeave={hideTooltip}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </button>
                    </label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white"
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                    >
                        <option value="">Select a platform</option>
                        {availablePlatforms.map((platform) => (
                            <option key={platform.id} value={platform.name}>
                                {platform.name} (Power: {platform.power})
                            </option>
                        ))}
                    </select>
                    {showTooltip === 'platform' && (
                        <div className="mt-1 text-sm text-gray-600 bg-gray-100 p-2 rounded">
                            {getTooltipContent('platform')}
                        </div>
                    )}
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Genre
                        <button className="ml-1 text-blue-500" onMouseEnter={() => displayTooltip('genre')} onMouseLeave={hideTooltip}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </button>
                    </label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Select a genre</option>
                        {genres.map((genre) => {
                            const stars = "★".repeat(genre.popularity);
                            const isTrending = isGenreTrending(genre.name);
                            return (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name} {stars} {isTrending ? "🔥" : ""}
                                </option>
                            );
                        })}
                    </select>
                    {showTooltip === 'genre' && (
                        <div className="mt-1 text-sm text-gray-600 bg-gray-100 p-2 rounded">
                            {getTooltipContent('genre')}
                        </div>
                    )}
                </div>

                {gameEngines.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Game Engine
                            <button className="ml-1 text-blue-500" onMouseEnter={() => displayTooltip('engine')} onMouseLeave={hideTooltip}>
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </button>
                        </label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white"
                            value={selectedGameEngine}
                            onChange={(e) => setSelectedGameEngine(e.target.value)}
                        >
                            <option value="">No Engine (Default)</option>
                            {gameEngines.map((engine) => (
                                <option key={engine.id} value={engine.id}>
                                    {engine.name} v{engine.version.toFixed(1)} (Efficiency: {(engine.efficiency * 100).toFixed(0)}%)
                                </option>
                            ))}
                        </select>
                        {showTooltip === 'engine' && (
                            <div className="mt-1 text-sm text-gray-600 bg-gray-100 p-2 rounded">
                                {getTooltipContent('engine')}
                            </div>
                        )}
                    </div>
                )}

                {franchises.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Franchise (Optional)
                            <button className="ml-1 text-blue-500" onMouseEnter={() => displayTooltip('franchise')} onMouseLeave={hideTooltip}>
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </button>
                        </label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white"
                            value={selectedFranchise}
                            onChange={(e) => setSelectedFranchise(e.target.value)}
                        >
                            <option value="">New IP (No Franchise)</option>
                            {franchises.map((franchise) => (
                                <option key={franchise.id} value={franchise.id}>
                                    {franchise.name} (Games: {franchise.games.length}, Fans: {franchise.fanbase.toLocaleString()})
                                </option>
                            ))}
                        </select>
                        {showTooltip === 'franchise' && (
                            <div className="mt-1 text-sm text-gray-600 bg-gray-100 p-2 rounded">
                                {getTooltipContent('franchise')}
                            </div>
                        )}
                    </div>
                )}

                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                    <h3 className="font-bold text-gray-700 mb-2">Development Estimate</h3>
                    <div className="flex justify-between text-gray-800">
                        <span>Required Development Points:</span>
                        <span>{developmentPoints}</span>
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateProject}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={!newProjectName || !selectedPlatform || !selectedGenre}
                    >
                        Create Project
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProjectComponent;