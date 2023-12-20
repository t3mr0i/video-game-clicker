import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import GameDisplayComponent from './GameDisplayComponent';
import MetaCriticRatingComponent from './MetaCriticRatingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';
const ProjectComponent = ({ projects, setProjects, createProject, updateProjectProgress, currentYear, platforms, genres, employees, openShippingModal }) => {
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

            let points = (platformFactor + genreFactor) * sizeFactor * 100;
            points *= 1 + (currentYear - 1985) / 100;

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

            return project;
        });

        // Update the projects array
        setProjects(updatedProjects);
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
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-end mb-4">
                <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create New Project
                </button>
            </div>

            {/* Modal for creating new project */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-xl shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Create New Project</h2>

                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter Project Name"
                    className="p-2 border text-gray-800 border-gray-300 rounded-md w-full mb-4"
                />

                <div className="flex justify-between mb-4">
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        <option value="" disabled>---</option>
                        <option value="A">A</option>
                        <option value="AA">AA</option>
                        <option value="AAA">AAA</option>
                    </select>

                    <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        <option value="" disabled>---</option>
                        {availablePlatforms.map(platform => (
                            <option key={platform.name} value={platform.name}>{platform.name}</option>
                        ))}
                    </select>

                    <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        <option value="" disabled>---</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                </div>

                {selectedGenre && (
                    <div className="my-4 flex justify-center">
                        <img src={`/images/genres/${selectedGenre.toUpperCase()}.png`} alt={selectedGenre} className="w-36 h-36 object-cover rounded-md" />
                    </div>
                )}

                <h3 className="text-lg font-bold mb-4">Development Points Required: {developmentPoints}</h3>

                <button
                    onClick={handleCreateProject}
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out ${(!selectedSize || !selectedPlatform || !selectedGenre || !newProjectName) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedSize || !selectedPlatform || !selectedGenre || !newProjectName}
                >
                    <FontAwesomeIcon icon={faShip} className="mr-2" />
                    Develop New Game
                </button>
            </Modal>

            {/* Project Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <h5 className="text-xl font-bold mb-2" style={{ color: '#314455' }}>{project.name}</h5>
                            <button onClick={() => handleWorkOnProject(project.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                <FontAwesomeIcon icon={faHammer} className="mr-2" />
                                Work
                            </button>
                        </div>
                        <div className="text-xs my-2">
                            <span>Start: {new Date(project.startDate).toLocaleDateString('de-DE')}</span>
                            <span> | Genre: {project.genre} | Platform: {project.platform} | Size: {project.size}</span>
                        </div>

                        {renderProgress(project.progress, project.requiredPoints)}

                        <div className="bg-gray-200 p-3 rounded-lg mt-2 mb-2">
                            <p>Progress: {Math.round(project.progress)}/{Math.round(project.requiredPoints)}</p>
                            <p>Design Points: {project.designPoints}</p>
                            <p>Marketing Points: {project.marketingPoints}</p>
                        </div>

                        <div className="bg-gray-200 p-3 rounded-lg mb-2">
                            <p>Developers: {countEmployeesAssigned(project.id, 'Developer')}</p>
                            <p>Designers: {countEmployeesAssigned(project.id, 'Designer')}</p>
                            <p>Marketers: {countEmployeesAssigned(project.id, 'Marketer')}</p>
                        </div>

                        <div className="text-center mb-2">
                            <MetaCriticRatingComponent rating={project.metaCriticRating} />
                        </div>

                        <GameDisplayComponent game={project} />

                        {project.progress >= 100 && !project.shipped && (
                            <button onClick={() => openShippingModal(project.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-2 w-full">
                                <FontAwesomeIcon icon={faShip} className="mr-2" />
                                Ship Game
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectComponent;