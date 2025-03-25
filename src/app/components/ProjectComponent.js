import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import GameDisplayComponent from './GameDisplayComponent';
import MetaCriticRatingComponent from './MetaCriticRatingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faPlus, faHammer, faFire, faRocket, faCogs, faTrophy, faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';
const ProjectComponent = ({ projects, setProjects, createProject, updateProjectProgress, currentYear, platforms, genres, employees, openShippingModal, gameEngines, trendingGenre, franchises }) => {
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
    
    useEffect(() => {
        const interval = setInterval(() => {
            updateAllProjects();
        }, 1000); // Every second

        return () => clearInterval(interval);
    }, [projects, employees]); // Rerun when projects or employees change

    const updateAllProjects = () => {
        const updatedProjects = projects.map(project => {
            // Skip if project is already shipped
            if (project.shipped) return project;

            // Count the number of each type of employee assigned to the project
            const numDevelopers = countEmployeesAssigned(project.id, 'Developer');
            const numDesigners = countEmployeesAssigned(project.id, 'Designer');
            const numMarketers = countEmployeesAssigned(project.id, 'Marketer');

            // Define rates at which each type of employee contributes
            const progressRate = 1; // Example rate at which developers contribute to progress
            const designPointRate = 1 // Example rate for designers
            const marketingPointRate = 1; // Example rate for marketers

            // Update project metrics
            project.progress += numDevelopers * progressRate;
            project.designPoints = Math.floor((project.designPoints || 0)) + numDesigners * designPointRate;
            project.marketingPoints = Math.floor((project.marketingPoints || 0)) + numMarketers * marketingPointRate;

            // Ensure progress doesn't exceed 100%
            project.progress = Math.min(project.progress, 100);

            return project;
        });

        // Update the projects array with the new state
        setProjects(updatedProjects);
    };

    const handleCreateProject = () => {
        const maxPoints = developmentPoints;
        
        // Find the selected engine if one was chosen
        const engine = gameEngines.find(engine => engine.id === selectedGameEngine);
        
        // Calculate development boosts from the engine
        const engineEfficiency = engine ? engine.efficiency : 1.0;
        const engineBoost = engine ? `Using ${engine.name} Engine` : null;

        // Check if this genre is trending
        const isTrendingGenre = trendingGenre && trendingGenre.name === selectedGenre;

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

            createProject(newProject);

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

    const handleWorkOnProject = (projectId) => {
        updateProjectProgress(projectId, 0.1);
    };

    const countEmployeesAssigned = (projectId, type) => {
        return employees.filter(emp => emp.projectId === projectId && emp.type === type).length;
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const availablePlatforms = platforms.filter(platform => platform.releaseYear <= currentYear);

    // Helper function to check if a genre is trending
    const isGenreTrending = (genreName) => {
        return trendingGenre && trendingGenre.name === genreName;
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
            default:
                return "";
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
                    <h2 className="text-xl font-bold">Projects</h2>
                    {trendingGenre && (
                        <div className="text-orange-500 mt-1 flex items-center">
                            <FontAwesomeIcon icon={faFire} className="mr-1" />
                            <span>Trending Genre: {trendingGenre.name} (+{Math.round((trendingGenre.boost-1)*100)}% sales)</span>
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
                                <h3 className="font-bold text-lg">{project.name}</h3>
                                <div className="flex space-x-1">
                                    {project.progress >= 100 && !project.shipped && (
                                        <button 
                                            className="bg-green-500 hover:bg-green-700 text-white rounded p-1"
                                            onClick={() => openShippingModal(project.id)}
                                            onMouseEnter={() => displayTooltip('ship')}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <FontAwesomeIcon icon={faShip} />
                                        </button>
                                    )}
                                    {!project.shipped && (
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white rounded p-1"
                                            onClick={() => handleWorkOnProject(project.id)}
                                            onMouseEnter={() => displayTooltip('work')}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <FontAwesomeIcon icon={faHammer} />
                                        </button>
                                    )}
                                    {showTooltip === 'ship' && (
                                        <div className="absolute bg-black text-white text-xs p-1 rounded mt-6 z-10">
                                            Ship your game
                                        </div>
                                    )}
                                    {showTooltip === 'work' && (
                                        <div className="absolute bg-black text-white text-xs p-1 rounded mt-6 z-10">
                                            Work on project
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="text-sm mb-2">
                                <span className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mb-1">{project.platform}</span>
                                <span className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mb-1">{project.genre}</span>
                                <span className="inline-block bg-gray-200 rounded px-2 py-1 mb-1">{project.size}</span>
                                {project.isTrendingGenre && (
                                    <span className="inline-block bg-orange-200 text-orange-700 rounded px-2 py-1 mb-1 ml-1">
                                        <FontAwesomeIcon icon={faFire} className="mr-1" />
                                        Trending
                                    </span>
                                )}
                            </div>
                            
                            {project.franchiseId && (
                                <div className="text-sm text-gray-600 mb-2">
                                    <FontAwesomeIcon icon={faTrophy} className="mr-1 text-yellow-500" />
                                    Franchise: {getFranchiseName(project.franchiseId)}
                                </div>
                            )}
                            
                            {project.engineName && (
                                <div className="text-sm text-gray-600 mb-2">
                                    <FontAwesomeIcon icon={faCogs} className="mr-1" />
                                    Engine: {project.engineName}
                                </div>
                            )}
                            
                            {!project.shipped ? (
                                <div className="mb-2">
                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                        <span>Progress: {Math.round(project.progress)}%</span>
                                        <span>Dev: {project.developmentPoints?.toFixed(0) || 0}/{project.requiredPoints}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 rounded-full h-2" style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-2">
                                    <MetaCriticRatingComponent score={project.metaCriticRating || 0} />
                                    <div className="text-sm mt-1">
                                        <span className="font-semibold">Revenue:</span> ${(project.revenue || 0).toLocaleString()}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-semibold">Sales:</span> {project.sales?.length || 0} weeks
                                    </div>
                                </div>
                            )}
                            
                            <div className="text-xs text-gray-500">
                                <div><span className="font-semibold">Design:</span> {project.designPoints || 0}</div>
                                <div><span className="font-semibold">Marketing:</span> {project.marketingPoints || 0}</div>
                                <div className="flex items-center">
                                    <span className="font-semibold mr-1">Team:</span>
                                    <span className="mr-2">👨‍💻 {countEmployeesAssigned(project.id, 'Developer')}</span>
                                    <span className="mr-2">🎨 {countEmployeesAssigned(project.id, 'Designer')}</span>
                                    <span>📢 {countEmployeesAssigned(project.id, 'Marketer')}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal for creating new project */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-xl shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Create New Project</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="Enter Project Name"
                        className="p-2 border text-gray-800 border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <div className="flex items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                            <FontAwesomeIcon 
                                icon={faQuestionCircle} 
                                className="ml-1 text-gray-400 cursor-pointer" 
                                onMouseEnter={() => displayTooltip('size')}
                                onMouseLeave={hideTooltip}
                            />
                        </div>
                        {showTooltip === 'size' && (
                            <div className="bg-black text-white text-xs p-2 rounded mb-2 z-10">
                                {getTooltipContent('size')}
                            </div>
                        )}
                        <select 
                            value={selectedSize} 
                            onChange={(e) => setSelectedSize(e.target.value)} 
                            className="p-2 border text-gray-800 border-gray-300 rounded-md w-full"
                        >
                            <option value="A">A (Small)</option>
                            <option value="AA">AA (Medium)</option>
                            <option value="AAA">AAA (Large)</option>
                        </select>
                    </div>

                    <div>
                        <div className="flex items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                            <FontAwesomeIcon 
                                icon={faQuestionCircle} 
                                className="ml-1 text-gray-400 cursor-pointer" 
                                onMouseEnter={() => displayTooltip('platform')}
                                onMouseLeave={hideTooltip}
                            />
                        </div>
                        {showTooltip === 'platform' && (
                            <div className="bg-black text-white text-xs p-2 rounded mb-2 z-10">
                                {getTooltipContent('platform')}
                            </div>
                        )}
                        <select 
                            value={selectedPlatform} 
                            onChange={(e) => setSelectedPlatform(e.target.value)} 
                            className="p-2 border text-gray-800 border-gray-300 rounded-md w-full"
                        >
                            <option value="" disabled>Select Platform</option>
                            {availablePlatforms.map(platform => (
                                <option key={platform.name} value={platform.name}>
                                    {platform.name} (Power: {platform.power})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div className="flex items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                            <FontAwesomeIcon 
                                icon={faQuestionCircle} 
                                className="ml-1 text-gray-400 cursor-pointer" 
                                onMouseEnter={() => displayTooltip('genre')}
                                onMouseLeave={hideTooltip}
                            />
                        </div>
                        {showTooltip === 'genre' && (
                            <div className="bg-black text-white text-xs p-2 rounded mb-2 z-10">
                                {getTooltipContent('genre')}
                            </div>
                        )}
                        <select 
                            value={selectedGenre} 
                            onChange={(e) => setSelectedGenre(e.target.value)} 
                            className="p-2 border text-gray-800 border-gray-300 rounded-md w-full"
                        >
                            <option value="" disabled>Select Genre</option>
                            {genres.map(genre => {
                                // Format genre popularity stars (1-9 scale)
                                const popularityStars = '★'.repeat(Math.floor(genre.popularity/2)) + '☆'.repeat(Math.ceil(5-genre.popularity/2));
                                
                                return (
                                    <option key={genre.id} value={genre.name}>
                                        {genre.name} {isGenreTrending(genre.name) ? "🔥" : ""} ({popularityStars})
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="flex items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Game Engine (Optional)</label>
                            <FontAwesomeIcon 
                                icon={faQuestionCircle} 
                                className="ml-1 text-gray-400 cursor-pointer" 
                                onMouseEnter={() => displayTooltip('engine')}
                                onMouseLeave={hideTooltip}
                            />
                        </div>
                        {showTooltip === 'engine' && (
                            <div className="bg-black text-white text-xs p-2 rounded mb-2 z-10">
                                {getTooltipContent('engine')}
                            </div>
                        )}
                        <select 
                            value={selectedGameEngine} 
                            onChange={(e) => setSelectedGameEngine(e.target.value)} 
                            className="p-2 border text-gray-800 border-gray-300 rounded-md w-full"
                        >
                            <option value="">No Engine</option>
                            {gameEngines.map(engine => (
                                <option key={engine.id} value={engine.id}>
                                    {engine.name} (Efficiency: {(engine.efficiency * 100).toFixed(0)}%)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div className="flex items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Franchise (Optional)</label>
                            <FontAwesomeIcon 
                                icon={faQuestionCircle} 
                                className="ml-1 text-gray-400 cursor-pointer" 
                                onMouseEnter={() => displayTooltip('franchise')}
                                onMouseLeave={hideTooltip}
                            />
                        </div>
                        {showTooltip === 'franchise' && (
                            <div className="bg-black text-white text-xs p-2 rounded mb-2 z-10">
                                {getTooltipContent('franchise')}
                            </div>
                        )}
                        <select 
                            value={selectedFranchise} 
                            onChange={(e) => setSelectedFranchise(e.target.value)} 
                            className="p-2 border text-gray-800 border-gray-300 rounded-md w-full"
                        >
                            <option value="">New IP</option>
                            {franchises.map(franchise => (
                                <option key={franchise.id} value={franchise.id}>
                                    {franchise.name} (Games: {franchise.games.length})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6 bg-gray-100 p-3 rounded-lg">
                    <h3 className="font-medium text-sm mb-2">Development Estimates:</h3>
                    <div className="flex justify-between text-sm">
                        <div><span className="font-medium">Required Points:</span> {developmentPoints}</div>
                        {selectedGameEngine && (
                            <div>
                                <span className="font-medium">With Engine:</span> {Math.round(developmentPoints / (gameEngines.find(e => e.id === selectedGameEngine)?.efficiency || 1))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
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