import React, { useState, useEffect } from 'react';
import TimeComponent from './TimeComponent';
import ProjectComponent from './ProjectComponent';
import EmployeeComponent from './EmployeeComponent';
import FinanceComponent from './FinanceComponent';
import ShippingComponent from './ShippingComponent';
import ResearchComponent from './ResearchComponent';
import EventsComponent from './EventsComponent';
import FranchisesComponent from './FranchisesComponent';
import StudioCultureComponent from './StudioCultureComponent';
import DebugPanel from './DebugPanel';
import NewsComponent from './NewsComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to generate a random studio name
const generateStudioName = () => {
    const prefixes = [
        'Pixel', 'Digital', 'Crystal', 'Lunar', 'Nova', 'Quantum', 'Spark', 'Ember', 'Horizon', 'Prism',
        'Retro', 'Neon', 'Solar', 'Cosmic', 'Echo', 'Nimble', 'Radiant', 'Obsidian', 'Fusion', 'Cipher',
        'Phoenix', 'Astral', 'Vector', 'Vortex', 'Parallel', 'Dream', 'Hyper', 'Mythic', 'Odyssey', 'Zenith'
    ];
    
    const suffixes = [
        'Games', 'Studios', 'Interactive', 'Entertainment', 'Works', 'Dynamics', 'Forge', 'Arts', 'Design', 'Media',
        'Worlds', 'Team', 'Collective', 'Software', 'Creations', 'Factory', 'Lab', 'Workshop', 'Division', 'Realms'
    ];
    
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

function App() {
    // Game state
    const [studioName, setStudioName] = useState(generateStudioName());
    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [genres, setGenres] = useState([
        { id: 1, name: 'Action', popularity: 8, complexity: 3 },
        { id: 2, name: 'Adventure', popularity: 7, complexity: 2 },
        { id: 3, name: 'Strategy', popularity: 7, complexity: 4 },
                { id: 5, name: 'RPG', popularity: 9, complexity: 5 },
        { id: 6, name: 'Sports', popularity: 7, complexity: 3 },
        { id: 7, name: 'Puzzle', popularity: 6, complexity: 2 },
        { id: 8, name: 'Shooter', popularity: 8, complexity: 4 },
        { id: 9, name: 'Platformer', popularity: 7, complexity: 3 },
        { id: 10, name: 'Racing', popularity: 7, complexity: 3 },
        { id: 11, name: 'Fighting', popularity: 8, complexity: 4 },
        { id: 12, name: 'Horror', popularity: 8, complexity: 4 },
        { id: 13, name: 'Survival', popularity: 8, complexity: 4 },
        { id: 14, name: 'Stealth', popularity: 7, complexity: 3 },
        { id: 15, name: 'Open World', popularity: 9, complexity: 5 },
        { id: 16, name: 'Music', popularity: 6, complexity: 3 },
        { id: 17, name: 'Educational', popularity: 5, complexity: 2 },
        { id: 18, name: 'Casual', popularity: 6, complexity: 2 },
        { id: 19, name: 'Visual Novel', popularity: 7, complexity: 3 },
        { id: 20, name: 'Simulation', popularity: 6, complexity: 3 },
        { id: 21, name: 'Tycoon', popularity: 7, complexity: 4 },
        { id: 22, name: 'Management', popularity: 7, complexity: 4 },
        { id: 23, name: 'Tactical', popularity: 8, complexity: 4 },
        { id: 24, name: 'Card Game', popularity: 6, complexity: 3 },
        { id: 25, name: 'Board Game', popularity: 6, complexity: 2 },
    ]);
    const [platforms, setPlatforms] = useState([
        { name: 'EnterTech', releaseYear: 1985, power: 5, difficulty: 3 },
        { name: 'SuperTech', releaseYear: 1990, power: 7, difficulty: 4 },
        { name: 'N-Cube', releaseYear: 1996, power: 8, difficulty: 5 },
        { name: 'Portable Play', releaseYear: 1989, power: 3, difficulty: 2 },
        { name: 'Portable Play Color', releaseYear: 1998, power: 4, difficulty: 3 },
        { name: 'Portable Play Plus', releaseYear: 2001, power: 5, difficulty: 3 },
        { name: 'Venus System', releaseYear: 1989, power: 6, difficulty: 4 },
        { name: 'Venus Saturn', releaseYear: 1994, power: 7, difficulty: 5 },
        { name: 'Venus Vision', releaseYear: 1998, power: 8, difficulty: 6 },
        { name: 'GameStation', releaseYear: 1994, power: 7, difficulty: 4 },
        { name: 'GameStation 2', releaseYear: 2000, power: 9, difficulty: 5 },
        { name: 'GameStation 3', releaseYear: 2006, power: 11, difficulty: 7 },
        { name: 'GameStation 4', releaseYear: 2013, power: 13, difficulty: 6 },
        { name: 'GameStation 5', releaseYear: 2020, power: 16, difficulty: 5 },
        { name: 'M-Box', releaseYear: 2001, power: 10, difficulty: 6 },
        { name: 'M-Box 360', releaseYear: 2005, power: 12, difficulty: 6 },
        { name: 'M-Box One', releaseYear: 2013, power: 14, difficulty: 5 },
        { name: 'M-Box X', releaseYear: 2020, power: 17, difficulty: 4 },
        { name: 'Apollo 2600', releaseYear: 1977, power: 2, difficulty: 2 },
        { name: 'Apollo Cougar', releaseYear: 1989, power: 4, difficulty: 3 },
        { name: 'NeoStar', releaseYear: 1990, power: 9, difficulty: 7 },
        { name: 'TurboExpress', releaseYear: 1987, power: 6, difficulty: 5 },
        { name: 'PlayCube', releaseYear: 2001, power: 8, difficulty: 5 },
        { name: 'PlayMe', releaseYear: 2006, power: 7, difficulty: 4 },
        { name: 'PlayUs', releaseYear: 2012, power: 9, difficulty: 4 },
        { name: 'FlipSide', releaseYear: 2017, power: 10, difficulty: 4 },
        { name: 'Venus Master', releaseYear: 1985, power: 4, difficulty: 3 },
        { name: 'Venus CD', releaseYear: 1992, power: 7, difficulty: 5 },
        { name: 'Apollo Panther', releaseYear: 1993, power: 6, difficulty: 6 },
        { name: 'GizPro', releaseYear: 2005, power: 3, difficulty: 9 },
        { name: 'Trio Interactive', releaseYear: 1993, power: 7, difficulty: 6 },
        { name: 'VectorPlay', releaseYear: 1982, power: 3, difficulty: 3 },
        { name: 'IntelliPlay', releaseYear: 1979, power: 3, difficulty: 3 },
        { name: 'Xbox 360', releaseYear: 2005, power: 12, difficulty: 6 },
        { name: 'RetroPlay 3000', releaseYear: 1983, power: 1, difficulty: 2 },
        { name: 'MegaStack Pro', releaseYear: 1987, power: 3, difficulty: 3 },
        { name: 'VirtualNest X', releaseYear: 1989, power: 4, difficulty: 4 },
        { name: 'CloudGamer Elite', releaseYear: 1992, power: 5, difficulty: 5 },
        { name: 'Quantum Console', releaseYear: 1995, power: 6, difficulty: 6 }
    ]);
    const [currentDay, setCurrentDay] = useState(1);
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(1);
    const [currentYear, setCurrentYear] = useState(1980);
    const [bankAccount, setBankAccount] = useState(50000); // Start with $50,000
    const [monthProgress, setMonthProgress] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(1); // Game speed multiplier
    const [paused, setPaused] = useState(false); // Game paused state
    const [studioLevel, setStudioLevel] = useState(1);
    const [studioExp, setStudioExp] = useState(0);
    const [studioExpToNextLevel, setStudioExpToNextLevel] = useState(1000);
    const [gameEngines, setGameEngines] = useState([]);
    const [technologies, setTechnologies] = useState([
        { id: 'tech-1', name: 'Version Control System', description: 'Improves developer productivity by 10%', cost: 5000, unlocked: false, effect: { type: 'productivity', employeeType: 'Developer', multiplier: 1.1 }, requiredLevel: 1 },
        { id: 'tech-2', name: 'Agile Development', description: 'Reduces development time by 15%', cost: 8000, unlocked: false, effect: { type: 'devTime', multiplier: 0.85 }, requiredLevel: 2 },
        { id: 'tech-3', name: 'Game Engine Framework', description: 'Allows creation of game engines and improves all development', cost: 20000, unlocked: false, effect: { type: 'enableEngines', multiplier: 1.2 }, requiredLevel: 3 },
        { id: 'tech-4', name: 'UX Testing Lab', description: 'Improves designer productivity by 15%', cost: 12000, unlocked: false, effect: { type: 'productivity', employeeType: 'Designer', multiplier: 1.15 }, requiredLevel: 2 },
        { id: 'tech-5', name: 'Social Media Analysis', description: 'Improves marketer productivity by 15%', cost: 10000, unlocked: false, effect: { type: 'productivity', employeeType: 'Marketer', multiplier: 1.15 }, requiredLevel: 2 },
        { id: 'tech-6', name: 'Automated Testing', description: 'Improves game quality by 10%', cost: 15000, unlocked: false, effect: { type: 'quality', multiplier: 1.1 }, requiredLevel: 3 },
        { id: 'tech-7', name: 'Marketing Automation', description: 'Increases initial game sales by 20%', cost: 18000, unlocked: false, effect: { type: 'initialSales', multiplier: 1.2 }, requiredLevel: 3 },
        { id: 'tech-8', name: 'Advanced Analytics', description: 'Improves all employee productivity by 10%', cost: 25000, unlocked: false, effect: { type: 'globalProductivity', multiplier: 1.1 }, requiredLevel: 4 },
        { id: 'tech-9', name: 'Quantum Computing', description: 'Doubles all development speed', cost: 100000, unlocked: false, effect: { type: 'globalDevSpeed', multiplier: 2.0 }, requiredLevel: 10 },
        
    ]);
    const [publishers, setPublishers] = useState([
        { name: 'Helios Interactive', reputation: 0.9, dealHistory: [], imageName: 'PS.PNG' },
        { name: 'Macrosoft Gaming', reputation: 0.85, dealHistory: [], imageName: 'XBOX.PNG' },
        { name: 'Pear Inc', reputation: 0.8, dealHistory: [], imageName: 'APPLE.PNG' },
        { name: 'Nintenda', reputation: 0.9, dealHistory: [], imageName: 'NINTENDO.PNG' },
        { name: 'Digital Athletics', reputation: 0.75, dealHistory: [], imageName: 'EA.PNG' },
        { name: 'EastNet Games', reputation: 0.7, dealHistory: [], imageName: 'NETEASE.PNG' },
        { name: 'Double-Take Interactive', reputation: 0.75, dealHistory: [], imageName: 'TAKETWO.PNG' },
        { name: 'Amalgam Group', reputation: 0.65, dealHistory: [], imageName: 'EMBRACER.PNG' },
        { name: 'Tsunami Entertainment', reputation: 0.8, dealHistory: [], imageName: 'BANDAI.PNG' },
        { name: 'Cube Phoenix', reputation: 0.8, dealHistory: [], imageName: 'SQUARE_ENIX.PNG' },
        { name: 'Hexon', reputation: 0.7, dealHistory: [], imageName: 'NEXON.PNG' },
        { name: 'Omnisoft', reputation: 0.75, dealHistory: [], imageName: 'UBISOFT.PNG' },
        { name: 'Monami', reputation: 0.7, dealHistory: [], imageName: 'KONAMI.PNG' },
        { name: 'Vega', reputation: 0.75, dealHistory: [], imageName: 'SEGA.PNG' },
        { name: 'Wizards of the Realm', reputation: 0.7, dealHistory: [], imageName: 'WIZARD.PNG' },
        { name: 'Jaguar Games', reputation: 0.8, dealHistory: [], imageName: 'CAPCOM.PNG' },
        { name: 'Psychonosis', reputation: 0.6, dealHistory: [], imageName: 'PSYGNOSIS.PNG' },
        { name: 'Dragon Entertainment', reputation: 0.6, dealHistory: [], imageName: 'TIGER.PNG' }
    ]);
    const [franchises, setFranchises] = useState([]);
    const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
    const [isCreateEngineModalOpen, setIsCreateEngineModalOpen] = useState(false);
    const [newEngineName, setNewEngineName] = useState('');
    const [selectedEngineType, setSelectedEngineType] = useState('');
    
    // UI state
    const [notifications, setNotifications] = useState([]);
    const [isDebugPanelOpen, setIsDebugPanelOpen] = useState(false);
    const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
    const [selectedProjectForShipping, setSelectedProjectForShipping] = useState(null);
    const [lastSavedTime, setLastSavedTime] = useState(null);
    const [saveStatus, setSaveStatus] = useState('Not saved');
    
    // Studio culture
    const [culturalValues, setCulturalValues] = useState([
        {
            id: 'quality-first',
            name: 'Quality First',
            description: 'Focus on delivering high quality games at all costs',
            bonuses: { qualityBonus: 0.15, developmentSpeed: -0.05 },
            icon: 'trophy'
        },
        {
            id: 'crunch-culture',
            name: 'Fast Development',
            description: 'Push for quicker development cycles',
            bonuses: { developmentSpeed: 0.20, employeeRetention: -0.10, qualityBonus: -0.05 },
            icon: 'bolt'
        },
        {
            id: 'innovation',
            name: 'Innovation Focus',
            description: 'Encourage experimental and innovative game design',
            bonuses: { innovationBonus: 0.15, marketingEfficiency: -0.05 },
            icon: 'lightbulb'
        },
        {
            id: 'marketing-driven',
            name: 'Marketing Driven',
            description: 'Focus on marketability and commercial success',
            bonuses: { marketingEfficiency: 0.15, innovationBonus: -0.05 },
            icon: 'bullhorn'
        },
        {
            id: 'employee-wellness',
            name: 'Employee Wellness',
            description: 'Prioritize employee satisfaction and well-being',
            bonuses: { employeeRetention: 0.15, employeeProductivity: 0.10, developmentSpeed: -0.05 },
            icon: 'heart'
        },
        {
            id: 'technical-excellence',
            name: 'Technical Excellence',
            description: 'Focus on technical innovation and optimization',
            bonuses: { employeeProductivity: 0.10, qualityBonus: 0.05 },
            icon: 'code'
        }
    ]);
    const [studioCulture, setStudioCulture] = useState({
        focus: 'balanced', // balanced, quality, speed, innovation, marketing
        values: [],
        bonuses: {
            employeeProductivity: 1.0,
            qualityBonus: 1.0,
            marketingEfficiency: 1.0,
            developmentSpeed: 1.0,
            innovationBonus: 1.0,
            employeeRetention: 1.0
        }
    });
    
    // Random events
    const [activeEvents, setActiveEvents] = useState([
        {
            id: 'event-market-crash',
            title: 'Gaming Market Crash',
            description: 'The "Great Pixel Crash" has reduced game sales across the industry by 30% for the next 3 months.',
            type: 'negative',
            effect: { type: 'sales', multiplier: 0.7, duration: 12 }, // 12 weeks = 3 months
            probability: 0.001, // 0.1% chance per week
            minimumYear: 1990
        },
        {
            id: 'event-viral-marketing',
            title: 'GameTube Viral Sensation',
            description: 'One of your game demos has gone viral on GameTube! Next game will get +20% initial sales.',
            type: 'positive',
            effect: { type: 'nextGameSales', multiplier: 1.2 },
            probability: 0.005, // 0.5% chance per week
            minimumYear: 2000
        },
        {
            id: 'event-talent-poaching',
            title: 'Rival Studio Talent Raid',
            description: 'A competing studio is offering better perks and stock options. One of your employees has left.',
            type: 'negative',
            effect: { type: 'loseEmployee' },
            probability: 0.003, // 0.3% chance per week
            minimumYear: 1995,
            minimumEmployees: 3
        },
        {
            id: 'event-industry-trend',
            title: 'New Genre Trend: "Insta-Games"',
            description: 'A new game genre is trending across gaming forums. Games in this genre will sell better for the next year.',
            type: 'positive',
            effect: { type: 'genreBoost', duration: 52 }, // 52 weeks = 1 year
            probability: 0.002, // 0.2% chance per week
            minimumYear: 1990
        },
        {
            id: 'event-hardware-breakthrough',
            title: 'Revolutionary Graphics Tech',
            description: 'A new graphics technology has been released that makes development easier. Your developers gain +15% productivity for 6 months.',
            type: 'positive',
            effect: { type: 'devProductivity', multiplier: 1.15, duration: 24 }, // 24 weeks = 6 months
            probability: 0.002, // 0.2% chance per week
            minimumYear: 1995
        },
        {
            id: 'event-industry-scandal',
            title: 'Major Publisher Scandal',
            description: 'A major publisher has been caught in a scandal involving misleading marketing. Public trust in the industry is down, reducing sales by 10% for 2 months.',
            type: 'negative',
            effect: { type: 'sales', multiplier: 0.9, duration: 8 }, // 8 weeks = 2 months
            probability: 0.002, // 0.2% chance per week
            minimumYear: 2000
        }
    ]);
    const [eventCooldown, setEventCooldown] = useState(0);
    const [activeNews, setActiveNews] = useState([]);

    // Function to toggle game pause state
    const togglePaused = () => {
        setPaused(prevPaused => !prevPaused);
    };

    // Function to manually trigger a game save
    const manualSaveGame = () => {
        setSaveStatus('Saving...');
        saveGameState();
        setShowSaveNotification(true);
        setLastSavedTime(new Date());
    };

    // Function to safely get values from local storage
    const safeLocalStorageGet = (key, defaultValue) => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const stored = localStorage.getItem(key);
                if (stored) {
                    return JSON.parse(stored);
                }
            }
        } catch (error) {
            console.error(`Error retrieving ${key} from localStorage:`, error);
        }
        return defaultValue;
    };
    
    // Function to save game state to localStorage
    const saveGameState = () => {
        try {
            if (typeof window === 'undefined' || !window.localStorage) {
                console.error('localStorage not available');
                return false;
            }

            // Create a complete game state object
            const gameState = {
                // Time data
                currentYear,
                currentMonth,
                currentWeek,
                currentDay,
                
                // Studio data
                studioName,
                studioLevel,
                studioExp,
                studioExpToNextLevel,
                
                // Financial data
                bankAccount,
                
                // Game elements
                employees: employees.map(emp => ({
                    ...emp,
                    projectId: emp.projectId || null // Ensure projectId is explicitly null if not set
                })),
                projects: projects.map(proj => ({
                    ...proj,
                    maxPoints: proj.maxPoints || 100, // Ensure maxPoints has a default value
                    developmentPoints: proj.developmentPoints || 0,
                    progress: proj.progress || 0
                })),
                publishers,
                franchises,
                genres,
                platforms,
                
                // Technology & research
                technologies,
                gameEngines,
                
                // Events & boosts
                activeEvents,
                activeNews,

                // Studio culture
                studioCulture
            };

            // Save each section of state
            Object.entries(gameState).forEach(([key, value]) => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (error) {
                    console.error(`Failed to save ${key}:`, error);
                    addNotification(`Failed to save ${key}`, 'error');
                }
            });

            // Save timestamp
            const saveTime = new Date().toISOString();
            localStorage.setItem('lastSaved', saveTime);
            
            // Update save status
            setSaveStatus("Saved");
            setLastSavedTime(new Date(saveTime));
            
            // Show save notification if it's a manual save
            if (showSaveNotification) {
                addNotification("Game progress saved!", "success");
                setShowSaveNotification(false);
            }
            
            return true;
        } catch (error) {
            console.error("Failed to save game state:", error);
            addNotification("Failed to save game progress", "error");
            setSaveStatus("Failed");
            return false;
        }
    };
    
    // State for manual save status
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    
    // Load saved data when component mounts
    useEffect(() => {
        try {
            // Load game time data
            setCurrentYear(safeLocalStorageGet('currentYear', 1980));
            setCurrentMonth(safeLocalStorageGet('currentMonth', 1));
            setCurrentWeek(safeLocalStorageGet('currentWeek', 1));
            setCurrentDay(safeLocalStorageGet('currentDay', 1));
            
            // Load studio data
            setStudioName(safeLocalStorageGet('studioName', generateStudioName()));
            setStudioLevel(safeLocalStorageGet('studioLevel', 1));
            setStudioExp(safeLocalStorageGet('studioExp', 0));
            setStudioExpToNextLevel(safeLocalStorageGet('studioExpToNextLevel', 1000));
            
            // Load financial data
            setBankAccount(safeLocalStorageGet('bankAccount', 50000));
            
            // Load game elements
            setEmployees(safeLocalStorageGet('employees', []));
            setProjects(safeLocalStorageGet('projects', []));
            setPublishers(safeLocalStorageGet('publishers', []));
            setFranchises(safeLocalStorageGet('franchises', []));
            
            // Only load genres and platforms if they exist in localStorage
            const savedGenres = safeLocalStorageGet('genres', null);
            if (savedGenres) setGenres(savedGenres);
            
            const savedPlatforms = safeLocalStorageGet('platforms', null);
            if (savedPlatforms) setPlatforms(savedPlatforms);
            
            // Load technology & research
            setTechnologies(safeLocalStorageGet('technologies', technologies));
            setGameEngines(safeLocalStorageGet('gameEngines', []));
            
            // Load events & boosts
            setActiveEvents(safeLocalStorageGet('activeEvents', []));
            setActiveNews(safeLocalStorageGet('activeNews', []));
            
            // Load studio culture
            setStudioCulture(safeLocalStorageGet('studioCulture', {
                focus: 'balanced',
                values: [],
                bonuses: {
                    employeeProductivity: 1.0,
                    qualityBonus: 1.0,
                    marketingEfficiency: 1.0,
                    developmentSpeed: 1.0,
                    innovationBonus: 1.0,
                    employeeRetention: 1.0
                }
            }));
            
            // Load last saved time
            const savedTime = localStorage.getItem('lastSaved');
            if (savedTime) {
                setLastSavedTime(new Date(savedTime));
                setSaveStatus("Loaded");
            }
            
            addNotification("Game progress loaded!", "info");
        } catch (error) {
            console.error("Error loading game state:", error);
            addNotification("Failed to load saved game", "error");
        }
    }, []);
    
    // Auto-save periodically (every minute)
    useEffect(() => {
        const autoSave = () => {
            saveGameState();
        };

        // Save every minute
        const autoSaveInterval = setInterval(autoSave, 60000);

        // Save on window blur (when user switches tabs/windows)
        window.addEventListener('blur', autoSave);

        return () => {
            clearInterval(autoSaveInterval);
            window.removeEventListener('blur', autoSave);
        };
    }, [JSON.stringify({
        currentYear,
        currentMonth,
        currentWeek,
        currentDay,
        employeesCount: employees.length,
        projectsCount: projects.length,
        bankAccount,
        studioLevel,
        studioExp,
        studioExpToNextLevel
    })]);
    
    // Also save when important state changes (less frequent than the regular autosave)
    useEffect(() => {
        saveGameState();
    }, [currentWeek, employees.length, projects.length, bankAccount, studioLevel]);

    const [salaryCosts, setSalaryCosts] = useState(0);
    const [studioReputation, setStudioReputation] = useState(0);
    const [trendingGenre, setTrendingGenre] = useState(null);
    const [nextGameSalesBoost, setNextGameSalesBoost] = useState(1.0);

    const openShippingModal = (projectId) => {
        setSelectedProjectForShipping(projects.find(p => p.id === projectId));
        setIsShippingModalOpen(true);
    };

    const closeShippingModal = () => {
        setIsShippingModalOpen(false);
        setSelectedProjectForShipping(null);
    };

    const addNotification = (message, type) => {
        console.debug(`[Notification] Type: ${type}, Message: ${message}`);
        toast(message, { type });
    };

    const resetGame = () => {
        // Reset all game state to initial values
        setCurrentYear(1980);
        setCurrentMonth(1);
        setCurrentWeek(1);
        setCurrentDay(1);
        setEmployees([]);
        setProjects([]);
        setBankAccount(50000);
        setSalaryCosts(0);
        setStudioReputation(0);
        setStudioName(generateStudioName());
        setStudioLevel(1);
        setStudioExp(0);
        setStudioExpToNextLevel(1000);
        setTechnologies(technologies.map(tech => ({ ...tech, unlocked: false })));
        setGameEngines([]);
        setActiveEvents([]);
        setTrendingGenre(null);
        setNextGameSalesBoost(1.0);
        setFranchises([]);
        setStudioCulture({
            focus: 'balanced',
            values: [],
            bonuses: {
                employeeProductivity: 1.0,
                qualityBonus: 1.0,
                marketingEfficiency: 1.0,
                developmentSpeed: 1.0,
                innovationBonus: 1.0,
                employeeRetention: 1.0
            }
        });
        
        // Clear local storage
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('currentYear');
            localStorage.removeItem('currentMonth');
            localStorage.removeItem('currentWeek');
            localStorage.removeItem('currentDay');
            localStorage.removeItem('employees');
            localStorage.removeItem('projects');
            localStorage.removeItem('publishers');
            localStorage.removeItem('bankAccount');
            localStorage.removeItem('salaryCosts');
            localStorage.removeItem('studioReputation');
            localStorage.removeItem('studioName');
            localStorage.removeItem('studioLevel');
            localStorage.removeItem('studioExp');
            localStorage.removeItem('studioExpToNextLevel');
            localStorage.removeItem('technologies');
            localStorage.removeItem('gameEngines');
            localStorage.removeItem('activeEvents');
            localStorage.removeItem('trendingGenre');
            localStorage.removeItem('nextGameSalesBoost');
            localStorage.removeItem('franchises');
            localStorage.removeItem('studioCulture');
        }
        
        addNotification('Game has been reset', 'success');
    };

    function hireEmployee(type) {
        const baseSkills = {
            'Developer': { coding: 1, optimization: 1, debugging: 1 },
            'Designer': { creativity: 1, userExperience: 1, visualization: 1 },
            'Marketer': { socialMedia: 1, advertising: 1, marketResearch: 1 }
        };
        
        const newEmployee = {
            id: generateUniqueId(),
            type: type,
            name: generateRandomName(),
            salary: calculateHiringCost(type),
            startYear: currentYear,
            startMonth: currentMonth,
            projectId: null,
            level: 1,
            experience: 0,
            experienceToNextLevel: 100,
            skillPoints: 0,
            skills: baseSkills[type],
            productivity: 1.0, // Base productivity multiplier
            morale: 100 // Base morale (0-100)
        };
        setEmployees([...employees, newEmployee]);

        setSalaryCosts(prevSalaryCosts => prevSalaryCosts + newEmployee.salary);
    }

    // Function to generate a random employee name
    const generateRandomName = () => {
        const firstNames = [
            'Hideo', 'Shigeru', 'Jade', 'Tim', 'Will', 'Sid', 'Cliff', 'Todd', 'Markus', 'Gabe', 
            'Amy', 'Kim', 'Roberta', 'Jane', 'Donna', 'Rhianna', 'Bonnie', 'Kellee', 'Robin', 'Brenda',
            'Warren', 'Richard', 'Derek', 'John', 'Ken', 'Ron', 'Satoshi', 'Fumito', 'Shinji', 'Hironobu',
            'Yuji', 'Gunpei', 'Eugene', 'Raph', 'Cory', 'Neil', 'Patrice', 'Michel', 'Phil', 'Jenova'
        ];
        
        const lastNames = [
            'Kojima', 'Miyamoto', 'Raymond', 'Schafer', 'Wright', 'Meier', 'Bleszinski', 'Howard', 'Persson', 'Newell',
            'Hennig', 'Swift', 'Williams', 'Jensen', 'Bailey', 'Pratchett', 'Ross', 'Santiago', 'Walker', 'Romero',
            'Spector', 'Garriott', 'Yu', 'Carmack', 'Levine', 'Gilbert', 'Tabata', 'Ueda', 'Mikami', 'Sakaguchi',
            'Naka', 'Yokoi', 'Jarvis', 'Koster', 'Barlog', 'Druckmann', 'Désilets', 'Ancel', 'Spencer', 'Chen'
        ];
        
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    };

    // Function to generate a game title
    const generateNews = () => {
        const newsItems = [
            // Studio Success Stories
            {
                id: 'news-studio-success',
                title: `${studioName} Gains Industry Recognition`,
                description: 'Critics are praising the studio for innovative game design and creative storytelling.',
                category: 'studio',
                triggeredBy: () => franchises.length > 0,
                timestamp: currentYear
            },
            // Industry Trends
            {
                id: 'news-industry-trend',
                title: 'New Genre Emerging: Interactive Storytelling',
                description: 'Game developers are exploring more narrative-driven experiences that blur the lines between games and movies.',
                category: 'industry',
                triggeredBy: () => currentYear > 2000,
                timestamp: currentYear
            },
            // Market News
            {
                id: 'news-market-sales',
                title: 'Global Game Sales Hit Record High',
                description: 'The gaming industry continues to grow, with digital sales reaching unprecedented levels.',
                category: 'market',
                triggeredBy: () => projects.filter(p => p.shipped).length > 5,
                timestamp: currentYear
            },
            // Technology Breakthrough
            {
                id: 'news-tech-breakthrough',
                title: 'Revolutionary Game Engine Technology Announced',
                description: 'A new game engine promises to revolutionize game development with unprecedented graphical capabilities.',
                category: 'industry',
                triggeredBy: () => gameEngines.length > 0,
                timestamp: currentYear
            },
            // Studio Milestone
            {
                id: 'news-studio-milestone',
                title: `${studioName} Reaches Significant Milestone`,
                description: `The studio has now shipped ${projects.filter(p => p.shipped).length} games and continues to grow.`,
                category: 'studio',
                triggeredBy: () => projects.filter(p => p.shipped).length > 3,
                timestamp: currentYear
            },
            // New News Story 1: Awards and Recognition
            {
                id: 'news-industry-awards',
                title: 'Indie Game Awards Announce Nominees',
                description: 'The annual Indie Game Awards spotlight groundbreaking independent game developers from around the globe.',
                category: 'industry',
                triggeredBy: () => currentYear > 2010 && franchises.length >= 2,
                timestamp: currentYear
            },
            // New News Story 2: Emerging Technologies
            {
                id: 'news-tech-vr-breakthrough',
                title: 'Virtual Reality Gaming Takes Massive Leap Forward',
                description: 'New VR technologies promise unprecedented immersion and interactivity in gaming experiences.',
                category: 'technology',
                triggeredBy: () => currentYear > 2015 && gameEngines.some(engine => engine.type === 'VR'),
                timestamp: currentYear
            },
            // New News Story 3: Global Gaming Culture
            {
                id: 'news-market-esports-growth',
                title: 'Esports Industry Reaches $1 Billion Revenue Milestone',
                description: 'Competitive gaming continues to grow, attracting massive global audiences and significant investments.',
                category: 'market',
                triggeredBy: () => currentYear > 2020 && projects.filter(p => p.genre === 'Competitive').length > 0,
                timestamp: currentYear
            },
            // New News Story 4: AI in Game Development
            {
                id: 'news-ai-game-design',
                title: 'AI Transforms Game Design Landscape',
                description: 'Artificial Intelligence starts generating unique game narratives and dynamic gameplay mechanics.',
                category: 'technology',
                triggeredBy: () => currentYear > 2025,
                timestamp: currentYear
            },
            // New News Story 5: Cloud Gaming Expansion
            {
                id: 'news-cloud-gaming-rise',
                title: 'Cloud Gaming Goes Mainstream',
                description: 'High-quality game streaming becomes accessible to millions of players worldwide.',
                category: 'market',
                triggeredBy: () => currentYear > 2022,
                timestamp: currentYear
            },
            // New News Story 6: Indie Studio Success
            {
                id: 'news-indie-studio-success',
                title: 'Small Studio Wins Global Recognition',
                description: 'An indie game studio breaks through with a revolutionary game concept, challenging industry giants.',
                category: 'studio',
                triggeredBy: () => franchises.length >= 1 && currentYear > 2018,
                timestamp: currentYear
            },
            // New News Story 7: AI Accessibility in Gaming
            {
                id: 'news-ai-accessibility',
                title: 'AI Revolutionizes Gaming Accessibility',
                description: 'Advanced AI technologies enable real-time game adaptation for players with diverse abilities and disabilities.',
                category: 'technology',
                triggeredBy: () => currentYear > 2027 && technologies.some(tech => tech.type === 'Accessibility'),
                timestamp: currentYear
            },
            // New News Story 8: Renewable Energy in Game Development
            {
                id: 'news-green-tech-gaming',
                title: 'Game Studios Lead in Sustainable Computing',
                description: 'Major game development studios commit to 100% renewable energy for game servers and development infrastructure.',
                category: 'industry',
                triggeredBy: () => currentYear > 2024 && gameEngines.length > 3,
                timestamp: currentYear
            },
            // New News Story 9: Real-Time Language Translation
            {
                id: 'news-game-translation-tech',
                title: 'Real-Time Game Translation Breaks Language Barriers',
                description: 'Cutting-edge AI enables seamless, instant translation of game dialogue and chat in multiplayer environments.',
                category: 'technology',
                triggeredBy: () => currentYear > 2026 && technologies.some(tech => tech.type === 'Translation'),
                timestamp: currentYear
            },
            // New News Story 10: Collaborative Game Development Platforms
            {
                id: 'news-collaborative-dev',
                title: 'Global Platforms Revolutionize Game Collaboration',
                description: 'New online platforms enable game developers from different continents to seamlessly co-create and prototype games.',
                category: 'industry',
                triggeredBy: () => currentYear > 2025 && franchises.length >= 3,
                timestamp: currentYear
            },
            // New News Story 11: Neural Interface Gaming
            {
                id: 'news-neural-interface',
                title: 'First Neural Interface Game Prototype Unveiled',
                description: 'Researchers demonstrate a groundbreaking game controlled entirely through neural signals, opening new frontiers in interactive entertainment.',
                category: 'technology',
                triggeredBy: () => currentYear > 2029 && technologies.some(tech => tech.type === 'NeuralInterface'),
                timestamp: currentYear
            },
            // New News Story 12: Global Esports Education
            {
                id: 'news-esports-education',
                title: 'Universities Launch Comprehensive Esports Degrees',
                description: 'Top universities worldwide now offer full academic programs in competitive gaming, game design, and esports management.',
                category: 'industry',
                triggeredBy: () => currentYear > 2026 && projects.filter(p => p.genre === 'Competitive').length > 2,
                timestamp: currentYear
            },
            // New News Story 13: Procedural Narrative AI
            {
                id: 'news-procedural-narrative',
                title: 'AI Creates Infinite, Unique Game Narratives',
                description: 'Advanced AI algorithms can now generate completely unique, context-aware game storylines that adapt to player choices.',
                category: 'technology',
                triggeredBy: () => currentYear > 2028 && technologies.some(tech => tech.type === 'ProceduralNarrative'),
                timestamp: currentYear
            },
            // New News Story 14: Blockchain Gaming Economies
            {
                id: 'news-blockchain-gaming',
                title: 'Decentralized Gaming Economies Gain Traction',
                description: 'Blockchain technology enables players to truly own, trade, and monetize in-game assets across multiple platforms.',
                category: 'market',
                triggeredBy: () => currentYear > 2027 && technologies.some(tech => tech.type === 'Blockchain'),
                timestamp: currentYear
            },
            // New News Story 15: Ethical AI in Game Design
            {
                id: 'news-ethical-ai-design',
                title: 'Global Initiative Launches Ethical AI Game Design Standards',
                description: 'International consortium establishes comprehensive guidelines for responsible and unbiased AI implementation in video games.',
                category: 'industry',
                triggeredBy: () => currentYear > 2026 && technologies.some(tech => tech.type === 'AIEthics'),
                timestamp: currentYear
            }
            },
            // New News Story 7: Cross-Platform Gaming
            {
                id: 'news-cross-platform-breakthrough',
                title: 'Seamless Cross-Platform Gaming Arrives',
                description: 'New technology enables true cross-platform multiplayer experiences across different devices.',
                category: 'technology',
                triggeredBy: () => gameEngines.length > 2,
                timestamp: currentYear
            },
            // New News Story 8: Gaming Sustainability
            {
                id: 'news-sustainability-gaming',
                title: 'Green Gaming Movement Gains Momentum',
                description: 'Game developers commit to reducing carbon footprint of game production and digital infrastructure.',
                category: 'industry',
                triggeredBy: () => currentYear > 2020,
                timestamp: currentYear
            },
            // New News Story 9: Games for Mental Health
            {
                id: 'news-mental-health-games',
                title: 'Games Emerge as Mental Health Support Tools',
                description: 'Researchers highlight the potential of interactive experiences in mental health therapy and support.',
                category: 'industry',
                triggeredBy: () => currentYear > 2024,
                timestamp: currentYear
            },
            // New News Story 10: Quantum Computing in Gaming
            {
                id: 'news-quantum-computing-games',
                title: 'Quantum Computing Enters Gaming Realm',
                description: 'First demonstrations of quantum-computed game graphics show unprecedented complexity and realism.',
                category: 'technology',
                triggeredBy: () => currentYear > 2030,
                timestamp: currentYear
            },
            // New News Story 11: Global Gaming Education
            {
                id: 'news-gaming-education-revolution',
                title: 'Gaming Becomes a Formal Educational Path',
                description: 'Universities launch first dedicated game design and interactive media degree programs globally.',
                category: 'industry',
                triggeredBy: () => currentYear > 2025,
                timestamp: currentYear
            },
            // New News Story 12: AR Gaming Breakthrough
            {
                id: 'news-augmented-reality-gaming',
                title: 'Augmented Reality Gaming Takes Giant Leap',
                description: 'New AR technologies blur the lines between physical and digital gaming experiences.',
                category: 'technology',
                triggeredBy: () => currentYear > 2022,
                timestamp: currentYear
            },
            // New News Story 13: Ethical Gaming Practices
            {
                id: 'news-ethical-gaming-standards',
                title: 'Global Ethical Gaming Standards Proposed',
                description: 'International consortium drafts comprehensive guidelines for responsible game design and player well-being.',
                category: 'industry',
                triggeredBy: () => currentYear > 2024,
                timestamp: currentYear
            },
            // New News Story 14: Blockchain Game Economies
            {
                id: 'news-blockchain-game-economies',
                title: 'Decentralized Game Economies Emerge',
                description: 'Player-owned game assets and true digital ownership become mainstream in gaming ecosystems.',
                category: 'market',
                triggeredBy: () => gameEngines.length > 3,
                timestamp: currentYear
            },
            // New News Story 15: Gaming Accessibility Milestone
            {
                id: 'news-gaming-accessibility-breakthrough',
                title: 'Revolutionary Gaming Accessibility Features Unveiled',
                description: 'New technologies enable unprecedented game experiences for players with diverse abilities.',
                category: 'technology',
                triggeredBy: () => currentYear > 2023,
                timestamp: currentYear
            },
            // New News Story 16: Global Esports Education
            {
                id: 'news-esports-professional-training',
                title: 'First Global Esports Training Academies Launch',
                description: 'Professional training programs for competitive gaming emerge as a serious career path.',
                category: 'industry',
                triggeredBy: () => franchises.length > 5,
                timestamp: currentYear
            },
            // New News Story 17: AI Game Testing
            {
                id: 'news-ai-game-testing',
                title: 'AI Revolutionizes Game Quality Assurance',
                description: 'Advanced AI systems can now comprehensively test video games, finding complex bugs faster than human testers.',
                category: 'technology',
                triggeredBy: () => technologies.some(tech => tech.id === 'tech-6'),
                timestamp: currentYear
            },
            // New News Story 18: Global Gaming Infrastructure
            {
                id: 'news-global-gaming-infrastructure',
                title: 'Ultra-Low Latency Global Gaming Network Launched',
                description: 'New international network infrastructure enables seamless multiplayer experiences across continents.',
                category: 'market',
                triggeredBy: () => currentYear > 2025,
                timestamp: currentYear
            },
            // New News Story 19: Neurogaming Advances
            {
                id: 'news-neurogaming-breakthrough',
                title: 'First Direct Neural Interface Gaming System Demonstrated',
                description: 'Groundbreaking technology allows direct brain-computer interaction in gaming experiences.',
                category: 'technology',
                triggeredBy: () => currentYear > 2030,
                timestamp: currentYear
            },
            // New 10 News Items
            {
                id: 'news-ai-game-accessibility',
                title: 'AI Revolutionizes Game Accessibility',
                description: 'Advanced AI technologies enable personalized game interfaces for players with diverse abilities.',
                category: 'technology',
                triggeredBy: () => currentYear > 2023,
                timestamp: currentYear
            },
            {
                id: 'news-indie-digital-distribution',
                title: 'Independent Developers Break Digital Distribution Barriers',
                description: 'New platforms emerge that allow small studios unprecedented access to global gaming markets.',
                category: 'market',
                triggeredBy: () => franchises.length > 3,
                timestamp: currentYear
            },
            {
                id: 'news-gaming-renewable-energy',
                title: 'Gaming Industry Pioneers Renewable Energy Solutions',
                description: 'Major game studios commit to carbon-neutral game development and server infrastructure.',
                category: 'industry',
                triggeredBy: () => currentYear > 2025,
                timestamp: currentYear
            },
            {
                id: 'news-procedural-narrative-ai',
                title: 'Procedural Narrative AI Creates Endless Stories',
                description: 'Machine learning algorithms can now generate complex, emotionally nuanced game narratives.',
                category: 'technology',
                triggeredBy: () => gameEngines.length > 4,
                timestamp: currentYear
            },
            {
                id: 'news-mobile-game-revolution',
                title: 'Mobile Games Reach Console-Level Quality',
                description: 'Advanced mobile hardware enables console-quality graphics and gameplay on smartphones.',
                category: 'market',
                triggeredBy: () => currentYear > 2022,
                timestamp: currentYear
            },
            {
                id: 'news-global-game-education-network',
                title: 'Global Game Education Network Launches',
                description: 'International consortium connects game design programs, fostering global collaboration and knowledge sharing.',
                category: 'industry',
                triggeredBy: () => franchises.length > 5,
                timestamp: currentYear
            },
            {
                id: 'news-real-time-translation-gaming',
                title: 'Real-Time Game Translation Breaks Language Barriers',
                description: 'AI-powered translation enables seamless multiplayer experiences across different languages.',
                category: 'technology',
                triggeredBy: () => currentYear > 2024,
                timestamp: currentYear
            },
            {
                id: 'news-ethical-monetization-standards',
                title: 'New Ethical Monetization Standards Proposed',
                description: 'Gaming industry develops comprehensive guidelines to prevent exploitative in-game purchase models.',
                category: 'industry',
                triggeredBy: () => currentYear > 2023,
                timestamp: currentYear
            },
            {
                id: 'news-game-data-privacy-movement',
                title: 'Player Data Privacy Movement Gains Momentum',
                description: 'Game developers commit to transparent data practices and player control over personal information.',
                category: 'market',
                triggeredBy: () => currentYear > 2025,
                timestamp: currentYear
            },
            {
                id: 'news-collaborative-game-development',
                title: 'Global Collaborative Game Development Platform Emerges',
                description: 'New platform allows developers from around the world to collaborate in real-time on game projects.',
                category: 'technology',
                triggeredBy: () => gameEngines.length > 5,
                timestamp: currentYear
            }
        ];

        // Filter and generate news based on conditions
        const availableNews = newsItems.filter(news =>
            news.triggeredBy() &&
            !activeNews.some(existingNews => existingNews.id === news.id)
        );

        // Randomly select news if available
        if (availableNews.length > 0 && Math.random() < 0.2) { // 20% chance each week
            const newNews = availableNews[Math.floor(Math.random() * availableNews.length)];
            setActiveNews(prev => [
                ...prev,
                {
                    ...newNews,
                    id: `${newNews.id}-${Date.now()}`,
                    createdAt: currentWeek
                }
            ]);
        }
    };

    // Dismiss a specific news item
    const dismissNews = (newsId) => {
        setActiveNews(prev => prev.filter(news => news.id !== newsId));
    };

    const generateGameTitle = (genre) => {
        const fantasyPrefixes = ['Elder', 'Dark', 'Lost', 'Forgotten', 'Crimson', 'Shadow', 'Mystic', 'Crystal', 'Eternal', 'Ancient'];
        const fantasyNouns = ['Scrolls', 'Realms', 'Legacy', 'Kingdoms', 'Legends', 'Chronicles', 'Fantasy', 'Souls', 'Destiny', 'Veil'];
        
        const sciFiPrefixes = ['Stellar', 'Cosmic', 'Quantum', 'Neon', 'Cyber', 'Hyper', 'Nexus', 'Astral', 'Zero', 'Orbital'];
        const sciFiNouns = ['Dawn', 'Empire', 'Protocol', 'Effect', 'Pulse', 'Crisis', 'Genesis', 'Horizon', 'Edge', 'Dimension'];
        
        const actionPrefixes = ['Ultimate', 'Rogue', 'Maximum', 'Savage', 'Lethal', 'Brutal', 'Extreme', 'Prime', 'Tactical', 'Furious'];
        const actionNouns = ['Combat', 'Assault', 'Strike', 'Force', 'Warfare', 'Mission', 'Vendetta', 'Operation', 'Command', 'Squad'];
        
        const sportsPrefixes = ['Pro', 'Championship', 'World', 'Ultimate', 'Super', 'Extreme', 'Total', 'All-Star', 'Master', 'Legend'];
        const sportsNouns = ['League', 'Tour', 'Manager', 'Challenge', 'Superstar', 'Champion', 'Season', 'Career', 'Legends', 'Rivals'];
        
        const simulationPrefixes = ['Advanced', 'Professional', 'Ultimate', 'Master', 'Complete', 'Total', 'Perfect', 'Realistic', 'Expert', 'Virtual'];
        const simulationNouns = ['Simulator', 'Tycoon', 'Manager', 'Constructor', 'Builder', 'World', 'Life', 'Empire', 'Corporation', 'City'];
        
        const numbers = ['II', 'III', 'IV', 'V', '2', '3', '4', '5', 'Remastered', 'Origins', 'Evolution', 'Revolution', 'Legends', 'Infinity'];
        
        let prefix = '';
        let noun = '';
        
        // Select words based on genre
        switch(genre) {
            case 'RPG':
            case 'Adventure':
                prefix = fantasyPrefixes[Math.floor(Math.random() * fantasyPrefixes.length)];
                noun = fantasyNouns[Math.floor(Math.random() * fantasyNouns.length)];
                break;
            case 'Shooter':
            case 'Action':
                prefix = actionPrefixes[Math.floor(Math.random() * actionPrefixes.length)];
                noun = actionNouns[Math.floor(Math.random() * actionNouns.length)];
                break;
            case 'Sports':
            case 'Racing':
                prefix = sportsPrefixes[Math.floor(Math.random() * sportsPrefixes.length)];
                noun = sportsNouns[Math.floor(Math.random() * sportsNouns.length)];
                break;
            case 'Simulation':
            case 'Tycoon':
            case 'Management':
                prefix = simulationPrefixes[Math.floor(Math.random() * simulationPrefixes.length)];
                noun = simulationNouns[Math.floor(Math.random() * simulationNouns.length)];
                break;
            default:
                // For other genres, mix and match
                const allPrefixes = [...fantasyPrefixes, ...sciFiPrefixes, ...actionPrefixes];
                const allNouns = [...fantasyNouns, ...sciFiNouns, ...actionNouns];
                prefix = allPrefixes[Math.floor(Math.random() * allPrefixes.length)];
                noun = allNouns[Math.floor(Math.random() * allNouns.length)];
        }
        
        // 30% chance to add a number/sequel suffix
        if (Math.random() < 0.3) {
            return `${prefix} ${noun}: ${numbers[Math.floor(Math.random() * numbers.length)]}`;
        }
        
        return `${prefix} ${noun}`;
    };

    // Function to update employee experience
    const updateEmployeeExperience = () => {
        setEmployees(prevEmployees => prevEmployees.map(employee => {
            // Only update experience for employees assigned to a project
            if (employee.projectId) {
                // Calculate experience gained based on employee type and project
                const expGain = calculateExperienceGain(employee);
                let newExperience = employee.experience + expGain;
                let newLevel = employee.level;
                let newExperienceToNextLevel = employee.experienceToNextLevel;
                let newSkillPoints = employee.skillPoints;
                
                // Check if employee leveled up
                if (newExperience >= employee.experienceToNextLevel) {
                    newLevel += 1;
                    newExperience -= employee.experienceToNextLevel;
                    newExperienceToNextLevel = Math.floor(employee.experienceToNextLevel * 1.5); // Increase exp needed for next level
                    newSkillPoints += 1; // Award skill point on level up
                    
                    // Increase salary with level up
                    const newSalary = employee.salary * 1.1; // 10% salary increase per level
                    
                    return {
                        ...employee,
                        level: newLevel,
                        experience: newExperience,
                        experienceToNextLevel: newExperienceToNextLevel,
                        skillPoints: newSkillPoints,
                        salary: newSalary,
                        productivity: employee.productivity + 0.05 // Slight productivity increase with level
                    };
                }
                
                return {
                    ...employee,
                    experience: newExperience
                };
            }
            return employee;
        }));
    };

    // Calculate experience gain based on employee type and project
    const calculateExperienceGain = (employee) => {
        // Base experience gain
        let expGain = 1;
        
        // Project-specific bonuses could be added here
        const project = projects.find(p => p.id === employee.projectId);
        if (project) {
            // Adjust experience based on project size
            if (project.size === 'AA') expGain *= 1.2;
            if (project.size === 'AAA') expGain *= 1.5;
        }
        
        return expGain;
    };

    // Function to improve an employee skill
    const improveEmployeeSkill = (employeeId, skillName) => {
        setEmployees(prevEmployees => prevEmployees.map(employee => {
            if (employee.id === employeeId && employee.skillPoints > 0) {
                const updatedSkills = { ...employee.skills };
                updatedSkills[skillName] += 1;
                
                return {
                    ...employee,
                    skills: updatedSkills,
                    skillPoints: employee.skillPoints - 1,
                    productivity: calculateEmployeeProductivity(employee.type, updatedSkills)
                };
            }
            return employee;
        }));
    };

    // Calculate employee productivity based on skills
    const calculateEmployeeProductivity = (type, skills) => {
        let baseProductivity = 1.0;
        
        if (type === 'Developer') {
            baseProductivity += (skills.coding + skills.optimization + skills.debugging) * 0.05;
        } else if (type === 'Designer') {
            baseProductivity += (skills.creativity + skills.userExperience + skills.visualization) * 0.05;
        } else if (type === 'Marketer') {
            baseProductivity += (skills.socialMedia + skills.advertising + skills.marketResearch) * 0.05;
        }
        
        // Apply studio culture bonus
        const cultureBonus = getCultureBonus('employeeProductivity');
        
        return baseProductivity * cultureBonus;
    };

    const [projectSalesData, setProjectSalesData] = useState({
        'projectId1': [100, 90, 80, 70, 60, 50] // Weekly sales data for a project
    });

    // Function to fire an employee
    const fireEmployee = (employeeId) => {
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeId));
    };


    const assignToProject = (employeeId, projectId) => {
        // Validate parameters
        if (!employeeId) {
            console.error('No employeeId provided to assignToProject');
            return;
        }

        // Handle both single employeeId and arrays of employeeIds
        if (Array.isArray(employeeId)) {
            // If an array is provided, update all employees in the array
            setEmployees(prevEmployees => prevEmployees.map(employee => {
                if (employeeId.includes(employee.id)) {
                    return { ...employee, projectId: projectId };
                }
                return employee;
            }));
        } else {
            // If a single employeeId is provided, update just that employee
            setEmployees(prevEmployees => prevEmployees.map(employee => {
                if (employee.id === employeeId) {
                    return { ...employee, projectId: projectId };
                }
                return employee;
            }));
        }

        // Save the updated state immediately
        saveGameState();
    };


    const createProject = (projectData) => {
        // Validate project data
        if (!projectData) {
            console.error('No project data provided to createProject');
            return;
        }

        // If project name is empty or matches default, generate a name based on genre
        if (!projectData.name || projectData.name.trim() === '' || projectData.name === 'New Project') {
            projectData.name = generateGameTitle(projectData.genre);
        }
        
        // Ensure all required properties are set
        const newProject = {
            ...projectData,
            id: generateUniqueId(),
            maxPoints: projectData.maxPoints || calculateMaxPoints(projectData.size),
            developmentPoints: 0,
            progress: 0,
            shipped: false,
            marketingPoints: projectData.marketingPoints || 0,
            revenue: 0,
            sales: []
        };
        
        setProjects(prevProjects => [...prevProjects, newProject]);
        
        // Save immediately after creating a new project
        saveGameState();
    };

    // Helper function to calculate maxPoints based on project size
    const calculateMaxPoints = (size) => {
        switch (size) {
            case 'AAA':
                return 1000;
            case 'AA':
                return 500;
            case 'A':
            default:
                return 250;
        }
    };

    const updateProjectProgress = (projectId, increment = 1) => {
        if (!projectId) {
            console.error('No projectId provided to updateProjectProgress');
            return;
        }

        setProjects(prevProjects => prevProjects.map(project => {
            if (project.id === projectId) {
                // Ensure project has required properties
                if (!project.maxPoints) {
                    console.error(`Project ${project.id} has no maxPoints defined`);
                    return project;
                }

                // Apply game engine efficiency boost if project uses an engine
                let engineBoost = 1.0;
                if (project.engineId) {
                    const engine = gameEngines.find(e => e.id === project.engineId);
                    if (engine) {
                        engineBoost = engine.efficiency;
                        // Check if engine is compatible with game genre for extra bonus
                        if (engine.compatibility && engine.compatibility.includes(project.genre)) {
                            engineBoost += 0.2; // Extra 20% boost for compatible genres
                        }
                    }
                }
                
                // Apply technology boosts
                let techBoost = 1.0;
                technologies.forEach(tech => {
                    if (tech.unlocked) {
                        if (tech.effect.type === 'globalDevSpeed') {
                            techBoost *= tech.effect.multiplier;
                        } else if (tech.effect.type === 'devTime' && tech.unlocked) {
                            techBoost *= tech.effect.multiplier;
                        }
                    }
                });
                
                // Apply studio culture bonuses
                const developmentSpeedBonus = getCultureBonus('developmentSpeed');
                
                // Apply franchise development bonus if this is a sequel
                let franchiseBonus = 1.0;
                if (project.franchiseId) {
                    const franchise = franchises.find(f => f.id === project.franchiseId);
                    if (franchise) {
                        const sequelNumber = franchise.games.length;
                        const devBonus = Math.min(20, sequelNumber * 5) / 100; // 5% per sequel, max 20%
                        franchiseBonus = 1.0 + devBonus;
                    }
                }
                
                // Calculate progress with all boosts applied
                const boostedIncrement = increment * engineBoost * techBoost * developmentSpeedBonus * franchiseBonus;
                const newDevelopmentPoints = (project.developmentPoints || 0) + boostedIncrement;
                const maxPoints = Math.max(project.maxPoints, 1); // Ensure maxPoints is at least 1
                const progressPercentage = Math.min((newDevelopmentPoints / maxPoints) * 100, 100); // Cap at 100%
                
                return { 
                    ...project, 
                    developmentPoints: newDevelopmentPoints, 
                    progress: progressPercentage 
                };
            }
            return project;
        }));

        // Save the updated state
        saveGameState();
    };

    const updateConsoleSales = (platforms, year, month) => {
        // Update sales figures for each console
    };
    const updateWeeklySales = () => {
        // Check for random events each week
        checkForRandomEvents();
        
        // Update employee experience each week
        updateEmployeeExperience();
        
        // Process active events and update their durations
        updateActiveEvents();
        
        const updatedProjects = projects.map(project => {
            if (project.shipped) {
                const weeksOnMarket = project.sales.length; // Number of weeks since shipping
                const decayFactor = 0.9; // Adjust as needed (less steep decline)
                const qualityFactor = 1 + (project.metaCriticRating / 100);
                
                // Base sales calculation
                let baseSales = project.sales[0]; // Initial sales
                
                // Apply trending genre bonus if applicable
                let weeklyMultiplier = 1.0;
                const bestGenre = getBestGenre();
                if (bestGenre && project.genre === bestGenre.name) {
                    weeklyMultiplier *= 1.2; // 20% boost for trending genre
                }
                
                // Apply global sales modifiers from active events
                const salesEvents = activeEvents.filter(event => event.effect.type === 'sales');
                if (salesEvents.length > 0) {
                    // Apply all sales event multipliers
                    salesEvents.forEach(event => {
                        weeklyMultiplier *= event.effect.multiplier;
                    });
                }
                
                // Calculate new sales based on decay, quality and active multipliers
                let newSales = baseSales * Math.pow(decayFactor, weeksOnMarket) * qualityFactor * weeklyMultiplier;
                
                // Add the new sales to the sales array
                project.sales.push(newSales);
                
                // Update total revenue
                project.revenue += newSales;
                
                // Update studio reputation based on project performance
                updateStudioReputation(project);

                // Add revenue to bank account
                setBankAccount(prevBankAccount => prevBankAccount + newSales);
            }
            return project;
        });

        setProjects(updatedProjects);
    };

    const paySalaries = () => {
        let totalSalaries = 0;
        employees.forEach(employee => {
            const salaryToPay = calculateProRatedSalary(employee);
            totalSalaries += salaryToPay;
        });

        if (currentWeek % 4 === 0) {
            setBankAccount(prevBankAccount => prevBankAccount - totalSalaries);
            setSalaryCosts(totalSalaries);
        }
    };

    // Helper function to calculate pro-rated salary
    const calculateProRatedSalary = (employee) => {
        // Assuming 4 weeks in a month for simplification
        const salaryPerWeek = employee.salary / 4;
        // Calculate the number of weeks worked in the current month
        const weeksWorked = (employee.startMonth === currentMonth && employee.startYear === currentYear)
            ? 4 - Math.floor(employee.startDay / 7) : 4;
        return salaryPerWeek * weeksWorked;
    };


    const calculateUpfrontPayment = (project, publisher) => {
        const randomFactor = Math.random() * 0.5 + 0.75; // Random factor between 0.75 and 1.25
        return project.requiredPoints * publisher.reputation * randomFactor * 100; // Example calculation
    };

    const calculateRevenueShare = (publisher) => {
        const baseRevenueShare = 15; // Base revenue share percentage
        return baseRevenueShare + (publisher.reputation * 10); // Adjusted by publisher's reputation
    };


    const shipGame = (projectId, publisherName) => {
        // Find the project and publisher objects based on their names
        const project = projects.find(p => p.id === projectId);
        const publisher = publishers.find(p => p.name === publisherName);

        // Error handling if project or publisher are not found
        if (!project || !publisher) {
            console.error("Project or Publisher not found.");
            return;
        }

        // Error handling if genre or platform are not found
        const genre = genres.find(g => g.name === project.genre);
        const platform = platforms.find(p => p.name === project.platform);
        if (!genre || !platform) {
            console.error("Genre or Platform not found.");
            return;
        }

        // Check if this is a sequel and apply franchise bonuses
        let franchiseBonus = { salesMultiplier: 1, developmentBonus: 0, description: null };
        if (project.franchiseId) {
            franchiseBonus = getSequelBonus(project.franchiseId);
        }

        // Calculate the initial sales, MetaCritic score, etc.
        const genrePopularity = genre.popularity; // Use actual popularity from the genre system
        const sizeFactor = { 'A': 1, 'AA': 2, 'AAA': 3 }[project.size];
        const yearFactor = 1 + (currentYear - 1985) / 40;
        const marketingFactor = project.marketingPoints || 1;
        const randomFactor = Math.random() * 0.5 + 0.75;
        
        // Apply studio culture marketing efficiency bonus
        const marketingEfficiencyBonus = getCultureBonus('marketingEfficiency');
        
        // Apply any active sales boost from events
        let initialSalesBoost = nextGameSalesBoost;

        // Apply trending genre boost
        const bestGenre = getBestGenre();
        if (bestGenre && project.genre === bestGenre.name) {
            initialSalesBoost *= 1.2; // 20% boost for trending genre
            addNotification(`Your game is in the trending ${bestGenre.name} genre! Sales boosted by 20%`, 'success');
        }
        
        // Reset the next game sales boost after applying it
        if (nextGameSalesBoost !== 1.0) {
            setNextGameSalesBoost(1.0);
            addNotification(`Your viral marketing campaign boosted initial sales by ${Math.round((nextGameSalesBoost - 1) * 100)}%!`, 'success');
        }
        
        // Apply franchise bonus if applicable
        initialSalesBoost *= franchiseBonus.salesMultiplier;
        if (franchiseBonus.description) {
            addNotification(franchiseBonus.description, 'success');
        }
        
        // Use genre popularity directly in sales calculation (previously was just using a fixed genreFactor)
        const initialSales = genrePopularity * sizeFactor * yearFactor * (marketingFactor * marketingEfficiencyBonus) * randomFactor * initialSalesBoost;
        const metaCriticScore = calculateMetaCriticScore(genre.complexity, platform.power, project.designPoints, project.progress, marketingFactor, genre.popularity);

        // Set the project as shipped with initial sales and revenue
        project.shipped = true;
        project.shippingWeek = currentWeek;
        project.shippingYear = currentYear;
        project.sales = []; // Initialize an empty sales array to track sales week by week after shipping
        project.sales.push(initialSales); // Start recording sales from the shipping week
        project.revenue = initialSales * 10; // Example revenue calculation for the first week
        project.metaCriticRating = metaCriticScore;
        project.publisher = publisherName;

        // Create or update franchise
        if (!project.franchiseId && metaCriticScore >= 70) {
            // This is a new potential franchise
            project.franchiseId = createFranchise(project);
        } else if (project.franchiseId) {
            // Update existing franchise with this sequel's performance
            const franchise = franchises.find(f => f.id === project.franchiseId);
            if (franchise) {
                const updatedFranchise = {
                    ...franchise,
                    games: [...franchise.games, project.id],
                    totalSales: franchise.totalSales + initialSales * 10,
                    averageRating: (franchise.averageRating * franchise.games.length + metaCriticScore) / (franchise.games.length + 1),
                    lastGameId: project.id,
                    fanbase: franchise.fanbase * (metaCriticScore >= 75 ? 1.2 : 0.9) // Grow or shrink fanbase based on quality
                };
                
                setFranchises(prevFranchises => 
                    prevFranchises.map(f => f.id === project.franchiseId ? updatedFranchise : f)
                );
                
                // Notify about franchise update
                if (metaCriticScore >= 75) {
                    addNotification(`${franchise.name} franchise fanbase has grown!`, 'success');
                } else {
                    addNotification(`${franchise.name} franchise fanbase has shrunk due to lower game quality.`, 'warning');
                }
            }
        }

        // Update the state with the new project details
        setProjects(projects.map(p => p.id === projectId ? project : p));
        setPublishers(publishers.map(p => p.name === publisherName ? { ...p, dealHistory: [...p.dealHistory, project] } : p));

        // Optional: Add a notification or other logic to handle the game shipping
        addNotification(`Successfully shipped ${project.name} with ${publisherName}!`, 'success');
        
        // Return the shipped game for other functions to use
        return project;
    };



    const calculateMetaCriticScore = (genreComplexity, consolePower, designFactor, progressFactor, marketingFactor, genrePopularity) => {
        // Base score calculation
        let score = 50; // Base score
        
        // Technical factors
        score += (genreComplexity + consolePower) / 2;
        score += designFactor / 10; // Adjust scale as needed
        score += (progressFactor - 1) * 20; // Bonus for extra development
        score += marketingFactor / 5; // Adjust scale as needed
        
        // Genre popularity factor - critics tend to be slightly harsher on popular genres
        // due to higher expectations and more competition
        const popularityFactor = (genrePopularity - 6.5) * -0.5; // Range: -1.25 to +1.25
        score += popularityFactor;
        
        // Apply studio culture quality bonus
        const qualityBonus = getCultureBonus('qualityBonus');
        score *= qualityBonus;
        
        // Apply innovation bonus for new IPs vs sequels (not implemented yet)
        const innovationBonus = getCultureBonus('innovationBonus');
        // Innovation would apply more to new IPs than sequels
        
        return Math.min(Math.max(score, 0), 100); // Ensure score is between 0 and 100
    };

    const calculateSalary = (employee, year) => {
        const monthlySalary = employee.salary;
        let salaryToPay = monthlySalary;

        if (employee.startYear === year) {
            const monthsWorked = 12 - employee.startMonth + 1;
            salaryToPay = (monthlySalary / 12) * monthsWorked;
        }

        return salaryToPay;
    };

    // Utility function to generate unique IDs
    const generateUniqueId = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        // Check if this ID already exists in any object that uses IDs
        const idExists = projects.some(project => project.id === newId) || 
                         employees.some(employee => employee.id === newId);
        
        // If ID already exists, recursively generate a new one
        if (idExists) {
            return generateUniqueId();
        }
        
        return newId;
    };

    // Function to update studio reputation based on project performance
    const updateStudioReputation = (project) => {
        // Reputation gain based on MetaCritic rating
        let reputationGain = 0;
        
        if (project.metaCriticRating > 90) {
            reputationGain = 0.5; // Excellent game
        } else if (project.metaCriticRating > 80) {
            reputationGain = 0.3; // Great game
        } else if (project.metaCriticRating > 70) {
            reputationGain = 0.1; // Good game
        } else if (project.metaCriticRating > 60) {
            reputationGain = 0.05; // Average game
        } else if (project.metaCriticRating > 50) {
            reputationGain = 0; // Below average game
        } else {
            reputationGain = -0.1; // Poor game - reputation loss
        }
        
        // Apply studio experience gain
        const expGain = project.metaCriticRating * 0.5;
        setStudioExp(prevExp => {
            const newExp = prevExp + expGain;
            
            // Check for studio level up
            if (newExp >= studioExpToNextLevel) {
                setStudioLevel(prevLevel => prevLevel + 1);
                setStudioExpToNextLevel(prevExpToNextLevel => prevExpToNextLevel * 2);
                addNotification(`Studio leveled up to level ${studioLevel + 1}!`, 'success');
                return newExp - studioExpToNextLevel;
            }
            
            return newExp;
        });
        
        // Apply the reputation change
        setStudioReputation(prevRep => {
            const newRep = Math.min(100, Math.max(0, prevRep + reputationGain));
            return newRep;
        });
    };
    
    // Function to calculate hiring cost based on studio reputation
    const calculateHiringCost = (type) => {
        const baseCost = 2500;
        const reputationMultiplier = 1 + (studioReputation / 100); // Better reputation attracts better talent for same cost
        
        // Type-specific salary adjustments
        let typeFactor = 1;
        if (type === 'Developer') typeFactor = 1.1;
        if (type === 'Designer') typeFactor = 1.0;
        if (type === 'Marketer') typeFactor = 0.9;
        
        return baseCost * typeFactor / reputationMultiplier;
    };

    // Function to calculate publisher deal quality based on studio reputation
    const calculatePublisherDealQuality = (publisher) => {
        const baseQuality = publisher.reputation;
        const reputationBonus = studioReputation / 200; // 0.0 to 0.5 bonus based on reputation
        
        return baseQuality + reputationBonus;
    };

    // Function to unlock a new technology
    const unlockTechnology = (techId) => {
        setTechnologies(prevTechnologies => {
            return prevTechnologies.map(tech => {
                if (tech.id === techId && !tech.unlocked) {
                    // Check if we have enough money and studio level
                    if (bankAccount >= tech.cost && studioLevel >= tech.requiredLevel) {
                        // Deduct the cost
                        setBankAccount(prevBalance => prevBalance - tech.cost);
                        
                        // Apply the technology effects
                        applyTechnologyEffects(tech);
                        
                        addNotification(`Unlocked technology: ${tech.name}`, 'success');
                        
                        return { ...tech, unlocked: true };
                    } else {
                        let reason = '';
                        if (bankAccount < tech.cost) reason = 'insufficient funds';
                        if (studioLevel < tech.requiredLevel) reason = reason ? `${reason} and low studio level` : 'studio level too low';
                        
                        addNotification(`Cannot unlock ${tech.name}: ${reason}`, 'error');
                        return tech;
                    }
                }
                return tech;
            });
        });
    };
    
    // Apply the effects of a technology
    const applyTechnologyEffects = (tech) => {
        switch (tech.effect.type) {
            case 'productivity':
                // Improve productivity for specific employee type
                setEmployees(prevEmployees => {
                    return prevEmployees.map(emp => {
                        if (emp.type === tech.effect.employeeType) {
                            return { ...emp, productivity: emp.productivity * tech.effect.multiplier };
                        }
                        return emp;
                    });
                });
                break;
            
            case 'globalProductivity':
                // Improve productivity for all employees
                setEmployees(prevEmployees => {
                    return prevEmployees.map(emp => {
                        return { ...emp, productivity: emp.productivity * tech.effect.multiplier };
                    });
                });
                break;
            
            case 'enableEngines':
                // This will be handled by checking if the technology is unlocked when needed
                break;
                
            default:
                // Other effects will be applied when relevant
                break;
        }
    };
    
    // Function to create a new game engine
    const createGameEngine = () => {
        // Check if game engine technology is unlocked
        const engineTech = technologies.find(tech => tech.id === 'tech-3');
        if (!engineTech || !engineTech.unlocked) {
            addNotification('You need to unlock Game Engine Framework technology first', 'error');
            return;
        }
        
        // Check for a valid name and type
        if (!newEngineName.trim() || !selectedEngineType) {
            addNotification('Please provide a name and type for your engine', 'error');
            return;
        }
        
        // Calculate cost based on engine type
        const costMultiplier = { 'Basic': 1, 'Advanced': 2, 'AAA': 3 }[selectedEngineType] || 1;
        const engineCost = 15000 * costMultiplier;
        
        // Check if we have enough money
        if (bankAccount < engineCost) {
            addNotification(`Not enough funds to create a ${selectedEngineType} engine`, 'error');
            return;
        }
        
        // Create the engine
        const newEngine = {
            id: generateUniqueId(),
            name: newEngineName,
            type: selectedEngineType,
            efficiency: 1.0 + (0.2 * costMultiplier), // Higher type = better efficiency
            compatibility: ['Action', 'Adventure', 'RPG', 'Shooter', 'Platformer'], // Example default compatibility
            createdYear: currentYear,
            version: 1.0
        };
        
        // Deduct the cost
        setBankAccount(prevBalance => prevBalance - engineCost);
        
        // Add to engines list
        setGameEngines(prevEngines => [...prevEngines, newEngine]);
        
        // Reset form
        setNewEngineName('');
        setSelectedEngineType('');
        setIsCreateEngineModalOpen(false);
        
        addNotification(`Created new game engine: ${newEngineName}`, 'success');
    };

    // Function to check for random events
    const checkForRandomEvents = () => {
        // Ensure events aren't constantly triggering by limiting frequency
        // Only check for events 5% of the time (roughly every 20 weeks on average)
        // Skip events before 1990
        if (currentYear < 1990 || Math.random() > 0.05) return;
        
        // Keep track of triggered events to avoid multiple in same week
        let eventTriggered = false;
        
        // Force a specific event when debugging is enabled
        const debugEvent = localStorage.getItem('debugEvent');
        if (debugEvent) {
            const event = activeEvents.find(e => e.id === debugEvent);
            if (event) {
                triggerRandomEvent(event);
                localStorage.removeItem('debugEvent'); // Clear debug event after triggering
                console.log('Debug event triggered:', event.title);
                return;
            }
        }
        
        // Shuffle events to prevent bias toward earlier events
        const shuffledEvents = [...activeEvents].sort(() => Math.random() - 0.5);
        
        // Check each event with weighted probability
        for (const event of shuffledEvents) {
            if (eventTriggered) break; // Only trigger one event per check
            
            // Calculate adjusted probability based on years past minimum
            const yearsSinceMin = currentYear - event.minimumYear;
            const probabilityMultiplier = 1 + (yearsSinceMin > 0 ? yearsSinceMin * 0.05 : 0);
            const adjustedProbability = event.probability * probabilityMultiplier;
            
            // Check if the event is eligible to trigger based on probabilities and conditions
            if (Math.random() < adjustedProbability && currentYear >= event.minimumYear) {
                // Additional conditions checking
                let canTrigger = true;
                
                if (event.minimumEmployees && employees.length < event.minimumEmployees) {
                    canTrigger = false;
                }
                
                // Prevent duplicate active events of same type
                if (event.effect.duration) {
                    const duplicateEvent = activeEvents.find(e => e.id === event.id);
                    if (duplicateEvent) {
                        canTrigger = false;
                    }
                }
                
                // If all conditions are met, trigger the event
                if (canTrigger) {
                    triggerRandomEvent(event);
                    eventTriggered = true;
                    console.log('Event triggered:', event.title);
                }
            }
        }
        
        // Update active events durations
        updateActiveEvents();
    };
    
    // Function to trigger a random event
    const triggerRandomEvent = (event) => {
        // Clone the event to avoid modifying the original
        const eventInstance = { 
            ...event,
            id: `${event.id}-${Date.now()}`, // Ensure unique ID for this instance
            startWeek: currentWeek,
            endWeek: event.effect.duration ? currentWeek + event.effect.duration : null
        };
        
        // Apply the event effect
        applyEventEffect(eventInstance);
        
        // Add the event to active events if it has a duration
        if (event.effect.duration) {
            setActiveEvents(prevEvents => [...prevEvents, eventInstance]);
        }
        
        // Notify the player
        const eventIcon = event.type === 'positive' ? '🎉' : '⚠️';
        addNotification(`${eventIcon} ${event.title}: ${event.description}`, event.type === 'positive' ? 'success' : 'error');
    };
    
    // Function to apply the effect of a random event
    const applyEventEffect = (event) => {
        switch (event.effect.type) {
            case 'nextGameSales':
                // Boost next game's initial sales
                setNextGameSalesBoost(event.effect.multiplier);
                break;
                
            case 'loseEmployee':
                // Lose a random employee
                if (employees.length > 0) {
                    const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
                    fireEmployee(randomEmployee.id);
                    addNotification(`${randomEmployee.name} has left your studio.`, 'warning');
                }
                break;
                
            case 'genreBoost':
                // Boost a random genre
                const randomGenreIndex = Math.floor(Math.random() * genres.length);
                setTrendingGenre({
                    name: genres[randomGenreIndex].name,
                    boost: 1.5 // 50% sales boost for this genre
                });
                addNotification(`${genres[randomGenreIndex].name} games are trending!`, 'info');
                break;
                
            case 'devProductivity':
                // Boost developer productivity
                setEmployees(prevEmployees => prevEmployees.map(employee => {
                    if (employee.type === 'Developer') {
                        return {
                            ...employee,
                            productivity: employee.productivity * event.effect.multiplier
                        };
                    }
                    return employee;
                }));
                addNotification(`Your developers are now ${Math.round((event.effect.multiplier-1)*100)}% more productive!`, 'success');
                break;
                
            case 'sales':
                // Global sales modifier effect is stored in the event itself
                // It will be applied to sales calculations in updateWeeklySales
                addNotification(`Game sales affected by ${Math.round((event.effect.multiplier-1)*100)}% for ${event.effect.duration/4} months!`, 
                    event.effect.multiplier > 1 ? 'success' : 'warning');
                break;
                
            default:
                console.warn(`Unknown event effect type: ${event.effect.type}`);
        }
    };
    
    // Function to update active events (decrease duration, remove expired)
    const updateActiveEvents = () => {
        setActiveEvents(prevEvents => {
            // Filter out expired events
            return prevEvents.filter(event => {
                if (currentWeek >= event.endWeek) {
                    // Reset the effect when the event expires
                    resetEventEffect(event);
                    addNotification(`The "${event.title}" event has ended.`, 'info');
                    return false;
                }
                return true;
            });
        });
    };
    
    // Function to reset the effect of an expired event
    const resetEventEffect = (event) => {
        switch (event.effect.type) {
            case 'genreBoost':
                setTrendingGenre(null);
                break;
                
            case 'devProductivity':
                // Reset developer productivity back to normal
                setEmployees(prevEmployees => prevEmployees.map(employee => {
                    if (employee.type === 'Developer') {
                        return {
                            ...employee,
                            productivity: calculateEmployeeProductivity(employee.type, employee.skills)
                        };
                    }
                    return employee;
                }));
                addNotification("Developer productivity boost has ended.", 'info');
                break;
                
            default:
                // Some effects don't need to be reset (one-time effects)
                break;
        }
    };

    // Debug function to trigger a specific event (for testing)
    const debugTriggerEvent = (eventId) => {
        const event = activeEvents.find(e => e.id === eventId);
        if (event) {
            triggerRandomEvent(event);
            return true;
        }
        return false;
    };
    
    // Debug function to log all active events
    const debugLogActiveEvents = () => {
        console.log('Active Events:', activeEvents);
        return activeEvents;
    };

    const toggleDebugPanel = () => {
        setIsDebugPanelOpen(!isDebugPanelOpen);
    };

    // Function to create a new franchise from a successful game
    const createFranchise = (game) => {
        // Only create franchises from successful games (over 70% rating)
        if (game.metaCriticRating < 70) return null;
        
        const franchiseName = game.name.split(':')[0].trim(); // Use base name without subtitles
        
        // Check if franchise already exists
        const existingFranchise = franchises.find(f => f.name === franchiseName);
        if (existingFranchise) {
            // Update existing franchise with new game
            const updatedFranchise = {
                ...existingFranchise,
                games: [...existingFranchise.games, game.id],
                totalSales: existingFranchise.totalSales + game.revenue,
                averageRating: (existingFranchise.averageRating * existingFranchise.games.length + game.metaCriticRating) / (existingFranchise.games.length + 1),
                lastGameId: game.id,
                fanbase: existingFranchise.fanbase * 1.2 // Fanbase grows with each game
            };
            
            setFranchises(prevFranchises => 
                prevFranchises.map(f => f.id === existingFranchise.id ? updatedFranchise : f)
            );
            
            return existingFranchise.id;
        } else {
            // Create new franchise
            const newFranchise = {
                id: generateUniqueId(),
                name: franchiseName,
                games: [game.id],
                originalGenre: game.genre,
                totalSales: game.revenue,
                averageRating: game.metaCriticRating,
                created: currentYear,
                lastGameId: game.id,
                fanbase: calculateInitialFanbase(game)
            };
            
            setFranchises(prevFranchises => [...prevFranchises, newFranchise]);
            
            addNotification(`New franchise "${franchiseName}" created!`, 'success');
            return newFranchise.id;
        }
    };
    
    // Calculate initial fanbase size based on game performance
    const calculateInitialFanbase = (game) => {
        const baseSize = game.revenue / 1000;
        const qualityMultiplier = game.metaCriticRating / 50; // 0-2 range
        return Math.round(baseSize * qualityMultiplier);
    };
    
    // Get sequel bonus for a game if it's part of a franchise
    const getSequelBonus = (franchiseId) => {
        if (!franchiseId) return { salesMultiplier: 1, developmentBonus: 0, description: null };
        
        const franchise = franchises.find(f => f.id === franchiseId);
        if (!franchise) return { salesMultiplier: 1, developmentBonus: 0, description: null };
        
        // Calculate bonuses based on franchise success
        const sequelNumber = franchise.games.length;
        const fanbaseBonus = franchise.fanbase / 10000; // Convert fanbase to percentage bonus
        
        // Diminishing returns for many sequels
        const fatigueFactor = Math.max(0.7, 1 - (sequelNumber - 2) * 0.1); // Starts affecting after 2nd sequel
        
        return {
            salesMultiplier: 1 + (fanbaseBonus * fatigueFactor),
            developmentBonus: Math.min(20, sequelNumber * 5), // 5% dev speed per sequel, max 20%
            description: `${franchise.name} Franchise Bonus: +${Math.round(fanbaseBonus * fatigueFactor * 100)}% sales, +${Math.min(20, sequelNumber * 5)}% dev speed`
        };
    };

    // Function to adopt a cultural value
    const adoptCulturalValue = (valueId) => {
        const value = culturalValues.find(v => v.id === valueId);
        if (!value) return;
        
        // Check if already adopted
        if (studioCulture.values.some(v => v.id === valueId)) {
            addNotification(`Already adopted the "${value.name}" cultural value.`, 'info');
            return;
        }
        
        // Max 3 cultural values
        if (studioCulture.values.length >= 3) {
            addNotification('You can only have 3 cultural values at a time. Remove one first.', 'warning');
            return;
        }
        
        // Calculate new bonuses
        const newBonuses = { ...studioCulture.bonuses };
        Object.entries(value.bonuses).forEach(([key, bonus]) => {
            newBonuses[key] = Math.max(0.5, Math.min(2.0, newBonuses[key] + bonus));
        });
        
        // Update culture
        setStudioCulture({
            ...studioCulture,
            values: [...studioCulture.values, value],
            bonuses: newBonuses
        });
        
        addNotification(`Adopted the "${value.name}" cultural value!`, 'success');
    };
    
    // Function to remove a cultural value
    const removeCulturalValue = (valueId) => {
        const value = culturalValues.find(v => v.id === valueId);
        if (!value) return;
        
        // Check if actually adopted
        if (!studioCulture.values.some(v => v.id === valueId)) {
            return;
        }
        
        // Calculate new bonuses by removing this value's bonuses
        const newBonuses = { ...studioCulture.bonuses };
        Object.entries(value.bonuses).forEach(([key, bonus]) => {
            newBonuses[key] = Math.max(0.5, Math.min(2.0, newBonuses[key] - bonus));
        });
        
        // Update culture
        setStudioCulture({
            ...studioCulture,
            values: studioCulture.values.filter(v => v.id !== valueId),
            bonuses: newBonuses
        });
        
        addNotification(`Removed the "${value.name}" cultural value.`, 'info');
    };
    
    // Function to get the current bonus for a specific stat
    const getCultureBonus = (statName) => {
        return studioCulture.bonuses[statName] || 1.0;
    };

    // Timeframe for genre popularity cycle (in weeks)
    const GENRE_CYCLE_PERIOD = 52 * 3; // 3 years
    
    // Function to update genre popularity periodically
    const updateGenrePopularity = () => {
        // Only update periodically (every month)
        if (currentWeek % 4 !== 0) return;
        
        // Create "waves" of popularity for each genre over time
        const GENRE_CYCLE_PERIOD = 52 * 3; // 3 years cycle
        
        const updatedGenres = genres.map(genre => {
            // Calculate phase based on genre ID and current time
            // This creates different cycles for each genre
            const phase = (genre.id * 1.5 + currentWeek / GENRE_CYCLE_PERIOD) % 1;
            
            // Calculate new popularity value (between 4 and 9)
            // Uses sine wave to create smooth cycles
            const newPopularity = 6.5 + Math.sin(phase * Math.PI * 2) * 2.5;
            
            // Apply some randomness (±10% of the range)
            const randomFactor = (Math.random() * 0.5) - 0.25;
            const finalPopularity = Math.max(4, Math.min(9, newPopularity + randomFactor));
            
            // If this is a significant change (>15%), notify the user
            if (Math.abs(finalPopularity - genre.popularity) > 0.8) {
                const increasing = finalPopularity > genre.popularity;
                addNotification(
                    `${genre.name} games are ${increasing ? 'gaining' : 'losing'} popularity!`, 
                    increasing ? 'success' : 'warning'
                );
            }
            
            return {
                ...genre,
                popularity: finalPopularity
            };
        });
        
        setGenres(updatedGenres);
        
        // Save updated genres to localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('genres', JSON.stringify(updatedGenres));
        }
    };
    
    // Load genres from localStorage on initial load
    useEffect(() => {
        setGenres(safeLocalStorageGet('genres', genres));
    }, []);
    
    // Update genre popularity when week changes
    useEffect(() => {
        // Only run after initial load when genres are available
        if (genres.length > 0) {
            updateGenrePopularity();
        }
    }, [currentWeek]);

    // Function to cancel a project
    const cancelProject = (projectId) => {
        // Find the project to cancel
        const projectToCancel = projects.find(p => p.id === projectId);
        
        if (!projectToCancel) {
            addNotification('Project not found', 'error');
            return;
        }
        
        // Unassign any employees from this project
        setEmployees(prevEmployees => 
            prevEmployees.map(employee => 
                employee.projectId === projectId 
                    ? { ...employee, projectId: null } 
                    : employee
            )
        );
        
        // Remove the project from state
        setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
        
        addNotification(`Project "${projectToCancel.name}" has been cancelled`, 'info');
    };
    
    // Function to get the best genre based on current popularity
    const getBestGenre = () => {
        if (!genres || genres.length === 0) return null;
        
        // Sort by popularity (highest first) and return the top genre
        return [...genres].sort((a, b) => b.popularity - a.popularity)[0];
    };
    
    // Filter projects to get shipped games for the ShippingComponent
    const shippedGames = projects.filter(project => project.shipped);
    
    // Function to add money (for debug purposes)
    const addMoney = (amount) => {
        setBankAccount(prevAmount => prevAmount + amount);
        addNotification(`Added ${amount} to bank account`, 'success');
    };
    
    // Function to add experience (for debug purposes)
    const addExperience = (amount) => {
        setStudioExp(prevExp => {
            const newExp = prevExp + amount;
            
            // Check for studio level up
            if (newExp >= studioExpToNextLevel) {
                setStudioLevel(prevLevel => prevLevel + 1);
                setStudioExpToNextLevel(prevExpToNextLevel => prevExpToNextLevel * 2);
                addNotification(`Studio leveled up to level ${studioLevel + 1}!`, 'success');
                return newExp - studioExpToNextLevel;
            }
            
            return newExp;
        });
        addNotification(`Added ${amount} experience points`, 'success');
    };
    
    // Function to add a free employee (for debug purposes)
    const addFreeEmployee = (type) => {
        hireEmployee(type);
        addNotification(`Added a free ${type}`, 'success');
    };
    
    // Function to unlock all technologies (for debug purposes)
    const unlockAllTechnologies = () => {
        setTechnologies(prevTechs => 
            prevTechs.map(tech => ({ ...tech, unlocked: true }))
        );
        addNotification('All technologies unlocked', 'success');
    };
    
    // Function to upgrade game engine (for research component)
    const upgradeGameEngine = (engineId) => {
        setGameEngines(prevEngines => 
            prevEngines.map(engine => {
                if (engine.id === engineId) {
                    // Upgrade stats based on current engine level
                    const upgradeCost = 5000 * engine.version;
                    
                    if (bankAccount < upgradeCost) {
                        addNotification(`Not enough funds to upgrade ${engine.name}`, 'error');
                        return engine;
                    }
                    
                    // Deduct cost
                    setBankAccount(prevBalance => prevBalance - upgradeCost);
                    
                    // Upgrade engine
                    return {
                        ...engine,
                        version: engine.version + 0.1,
                        efficiency: engine.efficiency * 1.1 // 10% improvement
                    };
                }
                return engine;
            })
        );
    };
    
    // Function to research technology
    const researchTechnology = (techId) => {
        unlockTechnology(techId);
    };

    // Add this useEffect to apply employee work to projects
    useEffect(() => {
        // Check if we have employees and projects
        if (employees.length === 0 || projects.length === 0) return;
        
        // Find active (unshipped) projects
        const activeProjects = projects.filter(project => !project.shipped);
        
        // Process each active project
        activeProjects.forEach(project => {
            // Find employees assigned to this project
            const assignedEmployees = employees.filter(emp => emp.projectId === project.id);
            
            // If we have assigned employees, update the project progress
            if (assignedEmployees.length > 0) {
                // Calculate total productivity of assigned employees
                const totalProductivity = assignedEmployees.reduce((sum, employee) => {
                    return sum + calculateEmployeeProductivity(employee.type, employee.skills);
                }, 0);
                
                // Update project progress with the calculated productivity
                if (totalProductivity > 0) {
                    updateProjectProgress(project.id, totalProductivity);
                }
            }
        });
    }, [currentWeek]); // Run this effect when the week changes

    return (
        <div className="App">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            
            <div className="main-container p-2">
                <TimeComponent
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    currentDay={currentDay}
                    setCurrentDay={setCurrentDay}
                    updateWeeklySales={updateWeeklySales}
                    platforms={platforms}
                    employees={employees}
                    updateConsoleSales={updateConsoleSales}
                    paySalaries={paySalaries}
                    addNotification={addNotification}
                    resetGame={resetGame}
                    isDebugPanelOpen={isDebugPanelOpen}
                    toggleDebugPanel={toggleDebugPanel}
                    manualSaveGame={manualSaveGame}
                    saveStatus={saveStatus}
                    lastSavedTime={lastSavedTime}
                    paused={paused}
                    togglePaused={togglePaused}
                    gameSpeed={gameSpeed}
                    setGameSpeed={setGameSpeed}
                    monthProgress={monthProgress}
                />
                
                <div className="card-grid">
                    <div className="game-card">
                        <FinanceComponent
                            salaryCosts={salaryCosts}
                            bankAccount={bankAccount}
                        />
                    </div>

                    <div className="game-card">
                        <NewsComponent
                            news={activeNews}
                            onDismissNews={dismissNews}
                        />
                    </div>

                    <div className="game-card">
                        <ProjectComponent
                            startNewProject={createProject}
                            projects={projects}
                            gameEngines={gameEngines}
                            genres={genres}
                            platforms={platforms}
                            currentYear={currentYear}
                            cancelProject={cancelProject}
                            getBestGenre={getBestGenre}
                            shipGame={shipGame}
                            franchises={franchises}
                            openShippingModal={openShippingModal}
                        />
                    </div>
                    
                    <div className="game-card">
                        <EmployeeComponent
                            employees={employees}
                            hireEmployee={hireEmployee}
                            fireEmployee={fireEmployee}
                            bankAccount={bankAccount}
                            genres={genres}
                            studioLevel={studioLevel}
                            projects={projects}
                            assignToProject={assignToProject}
                            improveEmployeeSkill={improveEmployeeSkill}
                        />
                    </div>
                    
                    <div className="game-card">
                        <ResearchComponent
                            technologies={technologies}
                            researchTechnology={researchTechnology}
                            showResearchModal={() => setIsResearchModalOpen(true)}
                            isResearchModalOpen={isResearchModalOpen}
                            closeResearchModal={() => setIsResearchModalOpen(false)}
                            showCreateEngineModal={() => setIsCreateEngineModalOpen(true)}
                            isCreateEngineModalOpen={isCreateEngineModalOpen}
                            closeCreateEngineModal={() => setIsCreateEngineModalOpen(false)}
                            newEngineName={newEngineName}
                            setNewEngineName={setNewEngineName}
                            selectedEngineType={selectedEngineType}
                            setSelectedEngineType={setSelectedEngineType}
                            createGameEngine={createGameEngine}
                            gameEngines={gameEngines}
                            upgradeGameEngine={upgradeGameEngine}
                            bankAccount={bankAccount}
                            studioLevel={studioLevel}
                        />
                    </div>
                    
                    <div className="game-card">
                        <FranchisesComponent 
                            franchises={franchises} 
                            currentYear={currentYear}
                        />
                    </div>
                    
                    <div className="game-card">
                        <StudioCultureComponent
                            culturalValues={culturalValues}
                            studioCulture={studioCulture}
                            adoptCulturalValue={adoptCulturalValue}
                            removeCulturalValue={removeCulturalValue}
                            studioLevel={studioLevel}
                        />
                    </div>
                </div>
                
                {isShippingModalOpen && (
                    <ShippingComponent
                        isModalOpen={isShippingModalOpen}
                        closeModal={() => setIsShippingModalOpen(false)}
                        game={selectedProjectForShipping ? projects.find(p => p.id === selectedProjectForShipping) : null}
                        publishers={publishers}
                        shipGame={shipGame}
                        calculateUpfrontPayment={calculateUpfrontPayment}
                        calculateRevenueShare={calculateRevenueShare}
                        addNotification={addNotification}
                    />
                )}
                
                {isDebugPanelOpen && (
                    <DebugPanel
                        addMoney={addMoney}
                        addExperience={addExperience}
                        advanceYear={() => setCurrentYear(currentYear + 1)}
                        addFreeEmployee={addFreeEmployee}
                        unlockAllTechnologies={unlockAllTechnologies}
                        addNotification={addNotification}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
