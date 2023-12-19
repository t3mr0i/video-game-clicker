import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import GameDisplayComponent from './GameDisplayComponent';
import MetaCriticRatingComponent from './MetaCriticRatingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
const ProjectComponent = ({ projects, createProject, updateProjectProgress, currentYear, platforms, genres, employees, openShippingModal }) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [selectedSize, setSelectedSize] = useState('A'); // A, AA, AAA
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [developmentPoints, setDevelopmentPoints] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const defaultOption = <option value="" disabled>---</option>;

    const gameSizes = {
        'A': 1,
        'AA': 2,
        'AAA': 3
    };


    useEffect(() => {
        calculateDevelopmentPoints();
    }, [selectedSize, selectedPlatform, selectedGenre, currentYear]);

    const calculateDevelopmentPoints = () => {
        const platform = platforms.find(p => p.name === selectedPlatform);
        const genre = genres.find(g => g.name === selectedGenre);

        if (platform && genre) {
            const platformFactor = platform.power + platform.difficulty;
            const genreFactor = genre.complexity;
            const sizeFactor = gameSizes[selectedSize];

            let points = (platformFactor + genreFactor) * sizeFactor;
            points *= 1 + (currentYear - 1985) / 100;

            setDevelopmentPoints(Math.round(points));
        } else {
            setDevelopmentPoints(0);
        }
    };

    const handleCreateProject = () => {
        const maxPoints = calculateDevelopmentPoints(selectedSize, selectedPlatform, selectedGenre);

        console.log("Selected Genre:", selectedGenre);
        console.log("Selected Platform:", selectedPlatform);

        if (newProjectName.trim() !== '') {
            const newProject = {
                name: newProjectName,
                size: selectedSize,
                platform: selectedPlatform,
                genre: selectedGenre,
                requiredPoints: developmentPoints,
                maxPoints: maxPoints,
                progress: 0,
                developmentPoints: 0,
                sales: [], // Initialize with an empty array
                revenue: 0, // Initialize revenue
                shipped: false, // Initialize shipping status
                startDate: `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
            };

            createProject(newProject);
            console.log("Created Project:", newProject);

            setNewProjectName('');
            setIsModalOpen(false);
        } else {
            // Handle the case where the project name is empty
            console.error("Project name is required.");
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

    function renderProgressBars(progress) {
        const cycleCount = Math.floor(progress / 100); // Number of complete cycles
        const currentProgress = progress % 100; // Remaining progress after cycles

        // Define colors for each cycle, add more colors if needed
        const cycleColors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500'];

        // Determine the color based on the cycle count
        const barColor = cycleColors[cycleCount % cycleColors.length];

        // Return the progress bar with dynamic width and color
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`${barColor} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
                    style={{ width: `${currentProgress}%` }}
                ></div>
            </div>
        );
    }


    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create New Project
            </button>

            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="bg-white rounded-lg p-6 mx-auto my-12 border w-1/2">
                <h2 className="text-lg font-bold mb-4">Create New Project</h2>
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter Project Name"
                    className="p-2 border text-gray-800 border-gray-300 rounded-md w-full mb-4"
                />
                <div className="flex justify-between mb-4">
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        {defaultOption}
                        <option value="A">A</option>
                        <option value="AA">AA</option>
                        <option value="AAA">AAA</option>
                    </select>
                    <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        {defaultOption}
                        {availablePlatforms.map(platform => (
                            <option key={platform.name} value={platform.name}>{platform.name}</option>
                        ))}
                    </select>
                    <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        {defaultOption}
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <h3 className="text-lg font-bold">{calculateDevelopmentPoints}</h3>

                <button onClick={handleCreateProject} className="bg-green-500 hover:bg-green-700  text-white font-bold py-2 px-4 rounded w-full">
                    Develop new Videogame
                </button>
            </Modal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="p-5">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="text-xl font-bold mb-2" style={{ color: '#314455' }}>{project.name}</h5>
                                    <p className="text-sm" style={{ color: '#7a8c99' }}>{project.platform} | {project.size} | {project.genre} | Start: {project.startDate}</p>
                                </div>
                                <div className="text-right">
                                    <button onClick={() => handleWorkOnProject(project.id)} className="text-sm bg-[#f2a365] hover:bg-[#f4b880] text-white font-medium py-1 px-2 rounded">
                                        Work
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-[#dae1e7] rounded-full h-2.5 my-3">
                                {renderProgressBars(project.progress)}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-xs" style={{ color: '#314455' }}>Progress: {Math.round(project.progress)}%</span>
                                <div className="text-xs text-right">
                                    <span style={{ color: '#7a8c99' }}>Dev: {countEmployeesAssigned(project.id, 'Developer')}</span><br />
                                    <span style={{ color: '#7a8c99' }}>Design: {countEmployeesAssigned(project.id, 'Designer')}</span><br />
                                    <span style={{ color: '#7a8c99' }}>Marketing: {countEmployeesAssigned(project.id, 'Marketer')}</span>
                                </div>
                            </div>
                        </div>
                        <MetaCriticRatingComponent rating={project.metaCriticRating} />
                        <div className="bg-[#dae1e7] p-4 text-center">
                            <GameDisplayComponent game={project} />
                            <p className="text-gray-700 mt-2">Total Revenue: ${project.revenue.toFixed(2)}</p>
                        </div>
                        {project.progress >= 100 && !project.shipped && (
                            <button
                                onClick={() => openShippingModal(project.id)}
                                className={classNames(
                                    "mt-4 py-1 px-3 text-xs rounded", // Add absolute positioning
                                    {
                                        'bg-blue-500 hover:bg-blue-700 text-white': project.progress >= 100,
                                        'bg-gray-500 text-gray-100 disabled:opacity-50': project.progress < 100,
                                    }
                                )}
                            >
                                Ship Game
                            </button>
                        )}
                    </div>
                ))}

            </div >
        </div >
    );
};
export default ProjectComponent;