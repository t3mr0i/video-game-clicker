'use client'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import './globals.css'; // Import your custom styles
import './styles.css'; // Import your custom styles
import 'animate.css'; // Import Animate.css for animations
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure you have FontAwesome included

export default function GameStudioManager() {
    const [selectedGame, setSelectedGame] = useState(null);
    const [games, setGames] = useState([]);
    const [shippedGames, setShippedGames] = useState([]);

    const [pointsAdded, setPointsAdded] = useState(0);
    const [requiredPoints, setRequiredPoints] = useState(100);
    const [isDevelopmentStopped, setIsDevelopmentStopped] = useState(false);
    const [staff, setStaff] = useState({ developers: 0, designers: 0, marketers: 0 });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [gameState, setGameState] = useState({
        resources: 100000,
        staff: {
            developers: { total: 0, assigned: {} },
            designers: { total: 0, assigned: {} },
            marketers: { total: 0, assigned: {} },
        },
        gameProjects: {},
        currentGame: null,
        shippedGames: {},
        currentDate: new Date(1985, 0, 1),
        // ... other initial states
    });


    useEffect(() => {
        const savedGameState = localStorage.getItem('gameState');
        if (!savedGameState) {
            localStorage.setItem('gameState', JSON.stringify(gameState));
        } else {
            setGameState(JSON.parse(savedGameState));
        }
    }, [gameState]);

    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }, [gameState]);

    // Define arrays for platforms and genres
    const platforms = [
        { name: 'NES', releaseYear: 1985, power: 5, difficulty: 3 },
        { name: 'SNES', releaseYear: 1990, power: 7, difficulty: 4 },
        { name: 'N64', releaseYear: 1996, power: 8, difficulty: 5 },
        { name: 'Game Boy', releaseYear: 1989, power: 3, difficulty: 2 },
        { name: 'Game Boy Color', releaseYear: 1998, power: 4, difficulty: 3 },
        { name: 'Game Boy Advance', releaseYear: 2001, power: 5, difficulty: 3 },
        { name: 'Sega Genesis', releaseYear: 1989, power: 6, difficulty: 4 },
        { name: 'Sega Saturn', releaseYear: 1994, power: 7, difficulty: 5 },
        { name: 'Sega Dreamcast', releaseYear: 1998, power: 8, difficulty: 6 },
        { name: 'PlayStation', releaseYear: 1994, power: 7, difficulty: 4 },
        { name: 'PlayStation 2', releaseYear: 2000, power: 9, difficulty: 5 },
        { name: 'PlayStation 3', releaseYear: 2006, power: 11, difficulty: 7 },
        { name: 'PlayStation 4', releaseYear: 2013, power: 13, difficulty: 6 },
        { name: 'PlayStation 5', releaseYear: 2020, power: 16, difficulty: 5 },
        { name: 'Xbox', releaseYear: 2001, power: 10, difficulty: 6 },
        { name: 'Xbox 360', releaseYear: 2005, power: 12, difficulty: 6 },
        { name: 'Xbox One', releaseYear: 2013, power: 14, difficulty: 5 },
        { name: 'Xbox Series X', releaseYear: 2020, power: 17, difficulty: 4 },
        { name: 'Atari 2600', releaseYear: 1977, power: 2, difficulty: 2 },
        { name: 'Atari Lynx', releaseYear: 1989, power: 4, difficulty: 3 },
        { name: 'Neo Geo', releaseYear: 1990, power: 9, difficulty: 7 },
        { name: 'TurboGrafx-16', releaseYear: 1987, power: 6, difficulty: 5 },
        { name: 'GameCube', releaseYear: 2001, power: 8, difficulty: 5 },
        { name: 'Wii', releaseYear: 2006, power: 7, difficulty: 4 },
        { name: 'Wii U', releaseYear: 2012, power: 9, difficulty: 4 },
        { name: 'Switch', releaseYear: 2017, power: 10, difficulty: 4 },
        { name: 'Sega Master System', releaseYear: 1985, power: 4, difficulty: 3 },
        { name: 'Sega CD', releaseYear: 1992, power: 7, difficulty: 5 },
        { name: 'Atari Jaguar', releaseYear: 1993, power: 6, difficulty: 6 },
        { name: 'Gizmondo', releaseYear: 2005, power: 3, difficulty: 9 },
        { name: '3DO Interactive Multiplayer', releaseYear: 1993, power: 7, difficulty: 6 },
        { name: 'Vectrex', releaseYear: 1982, power: 3, difficulty: 3 },
        { name: 'Intellivision', releaseYear: 1979, power: 3, difficulty: 3 },
        { name: 'ColecoVision', releaseYear: 1982, power: 3, difficulty: 3 },
        { name: 'Amiga CD32', releaseYear: 1993, power: 6, difficulty: 5 },
        { name: 'Virtual Boy', releaseYear: 1995, power: 3, difficulty: 9 },
        { name: 'WonderSwan', releaseYear: 1999, power: 4, difficulty: 5 },
        { name: 'TurboExpress', releaseYear: 1990, power: 3, difficulty: 6 },
        { name: 'Ouya', releaseYear: 2013, power: 4, difficulty: 4 },
        { name: 'N-Gage', releaseYear: 2003, power: 4, difficulty: 4 },
        { name: 'Tapwave Zodiac', releaseYear: 2003, power: 3, difficulty: 4 },
        { name: 'Sega 32X', releaseYear: 1994, power: 7, difficulty: 6 },
        // Add even more platforms with their power and difficulty values
    ];


    const genres = [
        { name: 'Action', popularity: 8, complexity: 3 },
        { name: 'Adventure', popularity: 7, complexity: 2 },
        { name: 'Strategy', popularity: 7, complexity: 4 },
        { name: 'Simulation', popularity: 6, complexity: 3 },
        { name: 'RPG', popularity: 9, complexity: 5 },
        { name: 'Sports', popularity: 7, complexity: 3 },
        { name: 'Puzzle', popularity: 6, complexity: 2 },
        { name: 'Shooter', popularity: 8, complexity: 4 },
        { name: 'Platformer', popularity: 7, complexity: 3 },
        { name: 'Racing', popularity: 7, complexity: 3 },
        { name: 'Fighting', popularity: 8, complexity: 4 },
        { name: 'Horror', popularity: 8, complexity: 4 },
        { name: 'Survival', popularity: 8, complexity: 4 },
        { name: 'Stealth', popularity: 7, complexity: 3 },
        { name: 'Open World', popularity: 9, complexity: 5 },
        { name: 'Music', popularity: 6, complexity: 3 },
        { name: 'Party', popularity: 6, complexity: 3 },
        { name: 'Educational', popularity: 5, complexity: 2 },
        { name: 'Casual', popularity: 6, complexity: 2 },
        { name: 'Visual Novel', popularity: 7, complexity: 3 },
        { name: 'Simulation', popularity: 6, complexity: 3 },
        { name: 'Tycoon', popularity: 7, complexity: 4 },
        { name: 'Management', popularity: 7, complexity: 4 },
        { name: 'Tactical', popularity: 8, complexity: 4 },
        { name: 'Card Game', popularity: 6, complexity: 3 },
        { name: 'Board Game', popularity: 6, complexity: 3 },
        { name: 'Nerd Game', popularity: 5, complexity: 6 }, // Adding complexity for the niche genre
        // Add more genres with their popularity and complexity values as needed
    ];



    // Implementing updateGameTime function
    const updateGameTime = () => {
        setGameState((prevState) => {
            const newDate = new Date(prevState.currentDate);
            newDate.setDate(newDate.getDate() + 1);
            return { ...prevState, currentDate: newDate };
        });
    };

    // UseEffect for time progression
    useEffect(() => {
        const interval = setInterval(() => {
            updateGameTime();
            // ... other periodic updates
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Game creation modal visibility
    const [showGameCreationModal, setShowGameCreationModal] = useState(false);
    const toggleGameCreationModal = () =>
        setShowGameCreationModal(!showGameCreationModal);

    useEffect(() => {
        if (selectedGame) {
            console.log(selectedGame);
            setRequiredPoints(selectedGame.requiredPoints);
        }
    }, [selectedGame]);

    const handleGameSelection = (event) => {
        const gameName = event.target.value;
        const game = games.find(g => g.name === gameName);
        setSelectedGame(game);
    };


    // Filter out shipped games from the list of available games
    const availableGames = games.filter((game) => !shippedGames.includes(game.name));


    const handleCreateGameClick = () => {
        const gameName = document.getElementById('newGameName').value;
        const platform = document.getElementById('newGamePlatform').value;
        const size = document.getElementById('newGameSize').value;
        const genre = document.getElementById('newGameGenre').value;

        createNewGame(gameName, platform, size, genre);

        // Show toast message
        setToastMessage(`New game '${gameName}' created successfully!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds

        // Close the modal and reset the form if needed
        setShowGameCreationModal(false);
    };
    const createNewGame = (gameName, platform, size, genre) => {
        // Logic to calculate required points based on size and platform
        const requiredPoints = calculateRequiredPoints(size, platform, genre);
        setToastMessage(`New game '${gameName}' created successfully!`);
        toggleGameCreationModal()
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        setGameState((prevState) => ({
            ...prevState,
            gameProjects: {
                ...prevState.gameProjects,
                [gameName]: {
                    progress: 0,
                    requiredPoints,
                    platform,
                    size,
                    genre,
                    shipped: false,
                },
            },
        }));

        // After creating the game, add it to the list of games
        const newGame = {
            name: gameName, // Use gameName instead of name
            platform: platform,
            size: size,
            genre: genre,
        };

        setGames((prevGames) => [...prevGames, newGame]);

        // Update the selectedGame state (if needed)
        setSelectedGame(gameName); // Assuming you have a setSelectedGame function
    };


    // Updated calculateRequiredPoints function
    const calculateRequiredPoints = (size, platformName, genreName) => {
        const sizePoints = { A: 100, AA: 500, AAA: 1000 };

        const platform = platforms.find(p => p.name === platformName) || { power: 1, difficulty: 1 };
        const genre = genres.find(g => g.name === genreName) || { complexity: 1 };

        // Calculate required points based on platform power, difficulty, genre complexity, and game size
        const requiredPoints = Math.round(
            sizePoints[size] * platform.power * platform.difficulty * genre.complexity * 100
        );

        return requiredPoints;
    };

    // Start development when a game is selected
    const startDevelopment = () => {
        if (selectedGame) {
            setIsDevelopmentStopped(false);
            // Simulate developers adding progress every second
            const developmentInterval = setInterval(() => {
                if (!isDevelopmentStopped) {
                }
            }, 1000);

            // Cleanup interval when component unmounts or development is stopped
            return () => clearInterval(developmentInterval);
        }
    };

    // Stop development for the selected game
    const stopDevelopment = () => {
        setIsDevelopmentStopped(true);
    };

    // Implementing shipGame function
    const shipGame = () => {
        const currentGame = gameState.currentGame;
        if (
            currentGame &&
            !gameState.gameProjects[currentGame].shipped &&
            gameState.gameProjects[currentGame].progress >=
            gameState.gameProjects[currentGame].requiredPoints
        ) {
            // Logic to ship the game
            setGameState((prevState) => {
                const updatedShippedGames = {
                    ...prevState.shippedGames,
                    [currentGame]: {
                        ...prevState.gameProjects[currentGame],
                        shipped: true,
                    },
                };
                const updatedGameProjects = { ...prevState.gameProjects };
                delete updatedGameProjects[currentGame];

                return {
                    ...prevState,
                    shippedGames: updatedShippedGames,
                    gameProjects: updatedGameProjects,
                    currentGame: null,
                };
            });
        } else {
            setToastMessage(`'${currentGame}' ist noch nicht fertig !`);
        }
    };

    // Implementing hireStaff function
    const hireStaff = (role) => {
        const hireCost = 500;
        setToastMessage(`Hired a new ${role}!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds

        if (gameState.resources >= hireCost) {
            setGameState((prevState) => {
                const newStaff = prevState.staff[role];
                newStaff.total += 1;
                return {
                    ...prevState,
                    resources: prevState.resources - hireCost,
                    staff: { ...prevState.staff, [role]: newStaff },
                };
            });
        } else {
            setToastMessage(`Nicht genügend Geld für einen '${role}'!`);
        }
    };

    // New fireStaff function
    const fireStaff = (role) => {
        if (gameState.staff[role].total > 0) {
            setGameState((prevState) => {
                const newStaff = prevState.staff[role];
                newStaff.total -= 1;
                return {
                    ...prevState,
                    staff: { ...prevState.staff, [role]: newStaff },
                };
            });
        } else {
            // Handle no staff to fire
        }
    };
    // Update addDevelopmentPoints to take a gameName parameter
    const addDevelopmentPoints = (gameName) => {
        setGameState((prevState) => {
            const updatedGameProjects = { ...prevState.gameProjects };
            updatedGameProjects[gameName].progress += 1;
            return { ...prevState, gameProjects: updatedGameProjects };
        });
    };
};

const handleShipGame = () => {
    if (!selectedGame) {
        setToastMessage('No game selected to ship.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        return;
    }
    if (pointsAdded < requiredPoints) {
        setToastMessage(`'${selectedGame}' is not ready to ship yet.`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        return;
    }
    // If all conditions are met, ship the game
    shipGame();
};

// Function to assign staff to a game
const assignStaffToGame = (gameName, role) => {
    setToastMessage(` '${role}' arbeitet nun an '${gameName}'!`);

    if (gameState.staff[role].total > Object.keys(gameState.staff[role].assigned).length) {
        setGameState((prevState) => {
            const newAssigned = prevState.staff[role].assigned;
            newAssigned[gameName] = (newAssigned[gameName] || 0) + 1;
            return {
                ...prevState,
                staff: { ...prevState.staff, [role]: { ...prevState.staff[role], assigned: newAssigned } },
            };
        });
    } else {
        setToastMessage(`Kein '${role}' ist verfügbar, um dem Spiel '${gameName}' zugewiesen zu werden!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    }
};

// Display all games in development
{
    Object.entries(gameState.gameProjects).map(([gameName, game]) => (
        <div key={gameName}>
            <h2>{gameName}</h2>
            <div
                className="progress-bar"
                style={{ width: `${(game.progress / game.requiredPoints) * 100}%` }}
                onClick={() => addDevelopmentPoints(gameName)}
            >
                Progress: {game.progress}/{game.requiredPoints}
            </div>
            <p>Quality: {game.quality}</p>
            <p>Popularity: {game.popularity}</p>
        </div>
    ))
}

// Function to remove staff from a game
const removeStaffFromGame = (gameName, role) => {
    if (gameState.staff[role].assigned[gameName] > 0) {
        setGameState((prevState) => {
            const newAssigned = prevState.staff[role].assigned;
            newAssigned[gameName] -= 1;
            return {
                ...prevState,
                staff: { ...prevState.staff, [role]: { ...prevState.staff[role], assigned: newAssigned } },
            };
        });
    } else {
        setToastMessage(`Kein '${role}' ist dem Spiel '${gameName}' zugewiesen!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    }
};

const addDevelopmentPoints = (gameName) => {
    setGameState((prevState) => {
        // Check if the game exists
        if (!prevState.gameProjects[gameName]) {
            console.error(`Game '${gameName}' not found`);
            return prevState;
        }

        // Update the game progress in an immutable way
        const updatedGameProjects = {
            ...prevState.gameProjects,
            [gameName]: {
                ...prevState.gameProjects[gameName],
                progress: prevState.gameProjects[gameName].progress + 1
            }
        };

    });
};


const automaticGameDevelopment = () => {
    setGameState((prevState) => {
        const updatedGameProjects = { ...prevState.gameProjects };
        for (let gameName in updatedGameProjects) {
            const game = updatedGameProjects[gameName];
            if (!game.shipped) {
                const developersAssigned = gameState.staff.developers.assigned[gameName] || 0;
                const designersAssigned = gameState.staff.designers.assigned[gameName] || 0;
                const marketersAssigned = gameState.staff.marketers.assigned[gameName] || 0;
                game.progress += developersAssigned;
                game.quality += designersAssigned;
                game.popularity += marketersAssigned;
            }
        }
        return { ...prevState, gameProjects: updatedGameProjects };
    });
};

// Updated calculateProgressIncrement function considering staff assignments
const calculateProgressIncrement = () => {
    // Assuming you want to calculate progress based on the number of developers assigned to the current game
    const developersAssigned = gameState.staff.developers.assigned[gameState.currentGame] || 0;
    return developersAssigned * 10; // Modify the increment value as needed
};


// Implement the remaining functions and JSX elements similarly

// ... other code ...
return (
    <div className="container mx-auto p-4 bg-floral_white">
        <h1 className="text-center text-4xl font-bold my-4 text-cerulean animate__animated animate__fadeIn">
            Game Studio Manager
        </h1>
        {showToast && (
            <div className="fixed bottom-0 left-0 right-0 mx-auto mb-4 w-full max-w-xs p-4 bg-green-500 text-white text-center rounded shadow-lg">
                {toastMessage}
            </div>
        )}

        <div className="flex justify-center items-center mb-6 z-90">
            <button
                id="btnOpenModal"
                className="text-white bg-cerulean hover:bg-cerulean-600 transition-transform transform hover:scale-105 animate__animated animate__headShake px-6 py-2 rounded shadow-lg font-semibold"
                onClick={toggleGameCreationModal}
            >
                <i className="fas fa-gamepad mr-2"></i> Create New Game
            </button>
        </div>

        {showGameCreationModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="gameCreationModal">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Create New Game</h3>
                        <div className="mt-2 px-7 py-3">
                            <input
                                className="border rounded-md w-full px-4 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newGameName"
                                type="text"
                                placeholder="Game Name"
                            />
                            <select id="newGamePlatform" className="border rounded-md w-full px-4 py-2 mt-2 text-gray-800" >
                                {platforms.map((platform) => (
                                    <option key={platform.name} value={platform.name}>{platform.name}</option>
                                ))}
                            </select>
                            <select id="newGameSize" className="border rounded-md w-full px-4 py-2 mt-2 text-gray-800">
                                {['A', 'AA', 'AAA'].map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                            <select id="newGameGenre" className="border rounded-md w-full px-4 py-2 mt-2 text-gray-800">
                                {genres.map((genre) => (
                                    <option key={genre.name} value={genre.name}>{genre.name}</option>
                                ))}
                            </select>
                            <button
                                id="createGameBtn"
                                className="mt-4 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onClick={handleCreateGameClick}
                            >
                                Create Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="my-6">
            <h2 className="text-2xl font-semibold mb-4 text-cerulean">Game & Staff Details</h2>
            <div className="rounded shadow-lg">
                {games.map((game) => (
                    <div key={game.name}>
                        <p className="text-lg">
                            Game: <strong>{game.name}</strong>
                        </p>
                        <div className="mt-4">
                            <p>Developers: {gameState.staff.developers.assigned[game.name] || 0}</p>
                            <p>Designers: {gameState.staff.designers.assigned[game.name] || 0}</p>
                            <p>Marketers: {gameState.staff.marketers.assigned[game.name] || 0}</p>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-6">
                            <div
                                className="bg-sunset h-6 rounded-full animate__animated animate__slideInLeft"
                                style={{ width: `${(game.progress / game.requiredPoints) * 100}%` }}
                            ></div>
                        </div>
                        <button className="btn btn-primary" onClick={() => addDevelopmentPoints(game.name)}>Add Development Point</button>
                        {game.progress >= game.requiredPoints && (
                            <button className="btn btn-success" onClick={() => shipGame(game.name)}>Ship Game</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
        <div className="staff-management my-6 p-4 bg-teal rounded shadow-lg">
            {/* ... other staff management elements ... */}
            <div className="mt-4">
                <p>Developers: {gameState.staff.developers.total}</p>
                {/* Add buttons for assigning/removing developers to/from a game */}
                {games.map((game) => (
                    <div key={game.name}>
                        <button className="btn btn-primary" onClick={() => assignStaffToGame(game.name, 'developers')}>Assign to {game.name}</button>
                        <button className="btn btn-danger" onClick={() => removeStaffFromGame(game.name, 'developers')}>Remove from {game.name}</button>
                    </div>
                ))}

                {/* Repeat for designers and marketers */}
            </div>
        </div>
        <div className="staff-management my-6 p-4 bg-teal rounded shadow-lg">
            <h2 className="text-2xl font-semibold text-cerulean mb-4 animate__animated animate__fadeInDown">Staff Management</h2>
            <div className="flex justify-around items-center">
                <button
                    className="text-white bg-light-sea-green hover:bg-light-sea-green-600 transition-transform transform hover:scale-105 animate__animated animate__headShake px-6 py-2 rounded shadow-lg font-semibold"
                    onClick={() => hireStaff('developers')}
                >
                    <i className="fas fa-user-plus"></i> Hire Developer
                </button>
                <button
                    className="text-white bg-light-red hover:bg-light-red-600 transition-transform transform hover:scale-105 animate__animated animate__headShake px-6 py-2 rounded shadow-lg font-semibold"
                    onClick={() => fireStaff('developers')}
                >
                    <i className="fas fa-user-minus"></i> Fire Developer
                </button>
            </div>
        </div>

        {/* Any additional sections or components */}
    </div>
);
}
