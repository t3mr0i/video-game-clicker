import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import GameDisplayComponent from './GameDisplayComponent';
const ProjectComponent = ({ projects, createProject, updateProjectProgress, currentYear, platforms, genres, employees, openShippingModal }) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [selectedSize, setSelectedSize] = useState('A'); // A, AA, AAA
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [developmentPoints, setDevelopmentPoints] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

        if (newProjectName.trim() !== '') {
            createProject({
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
            });
            setNewProjectName('');
            setIsModalOpen(false);
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
                    <select onChange={(e) => setSelectedSize(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        <option value="A">A</option>
                        <option value="AA">AA</option>
                        <option value="AAA">AAA</option>
                    </select>
                    <select onChange={(e) => setSelectedPlatform(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        {availablePlatforms.map(platform => (
                            <option key={platform.name} value={platform.name}>{platform.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setSelectedGenre(e.target.value)} className="p-2 border text-gray-800 border-gray-300 rounded-md">
                        {genres.map(genre => (
                            <option key={genre.name} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <h3 className="text-lg font-bold">{calculateDevelopmentPoints}</h3>

                <button onClick={handleCreateProject} className="bg-green-500 hover:bg-green-700  text-white font-bold py-2 px-4 rounded w-full">
                    Develop new Videogame
                </button>
            </Modal>
            {projects.map((project, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <div className="text-sm text-gray-600">
                            Progress Value: {project.progress}
                            Employees: Developer: {countEmployeesAssigned(project.id, 'Developer')}, Designers: {countEmployeesAssigned(project.id, 'Designer')}, Marketing: {countEmployeesAssigned(project.id, 'Marketer')} | Genre: {project.genre} | Platform: {project.platform} | Size: {project.size} | Start Date: {project.startDate}
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm">
                            <span>Progress: {Math.min(project.progress, 100).toFixed(2)}%</span>

                            <span>Marketing Value: {project.marketingValue}</span>
                            <button className={`py-1 px-3 text-xs rounded ${'bg-blue-500 hover:bg-blue-700  text-gray-100'}`} onClick={() => handleWorkOnProject(project.id)}>
                                Work
                            </button>
                            <button
                                onClick={() => openShippingModal(project.id)}
                                className={`py-1 px-3 text-xs rounded ${project.progress >= 100 ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-100'} disabled:opacity-50`}
                                disabled={project.progress < 100}
                            >Ship Game
                            </button>
                        </div>
                    </div>
                    <GameDisplayComponent game={project} />
                    <MetaCriticRatingComponent rating={game.metaCriticRating} />

                </div>
            ))
            }
        </div >
    );
};
export default ProjectComponent;
