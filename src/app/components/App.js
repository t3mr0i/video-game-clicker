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

function App() {
    const [platforms, setPlatforms] = useState([
        { name: 'EnterTech', releaseYear: 1985, power: 5, difficulty: 3, timeline: 'Early home computing era', news: 'Introduces first home gaming computer system' },
        { name: 'SuperTech', releaseYear: 1990, power: 7, difficulty: 4, timeline: '16-bit gaming revolution', news: 'Breaks ground with advanced graphics processing' },
        { name: 'N-Cube', releaseYear: 1996, power: 8, difficulty: 5, timeline: '32-bit console generation', news: 'Introduces 3D polygon graphics mainstream' },
        { name: 'Portable Play', releaseYear: 1989, power: 3, difficulty: 2, timeline: 'First portable gaming devices', news: 'Launches portable gaming market' },
        { name: 'Portable Play Color', releaseYear: 1998, power: 4, difficulty: 3, timeline: 'Color portable gaming era', news: 'First color screen handheld console' },
        { name: 'Portable Play Plus', releaseYear: 2001, power: 5, difficulty: 3, timeline: 'Enhanced portable gaming', news: 'Advanced connectivity features' },
        { name: 'Venus System', releaseYear: 1989, power: 6, difficulty: 4, timeline: 'Early CD-ROM gaming', news: 'Introduces CD-based game storage' },
        { name: 'Venus Saturn', releaseYear: 1994, power: 7, difficulty: 5, timeline: '32-bit console competition', news: 'Challenges market leaders with unique games' },
        { name: 'Venus Vision', releaseYear: 1998, power: 8, difficulty: 6, timeline: 'Late 90s console wars', news: 'Pioneers online multiplayer features' },
        { name: 'GameStation', releaseYear: 1994, power: 7, difficulty: 4, timeline: 'First generation console', news: 'Revolutionizes home gaming entertainment' },
        { name: 'GameStation 2', releaseYear: 2000, power: 9, difficulty: 5, timeline: 'DVD gaming era', news: 'Supports DVD playback and gaming' },
        { name: 'GameStation 3', releaseYear: 2006, power: 11, difficulty: 7, timeline: 'High-definition gaming', news: 'Introduces Blu-ray and online network' },
        { name: 'GameStation 4', releaseYear: 2013, power: 13, difficulty: 6, timeline: 'Social gaming integration', news: 'Advanced streaming and sharing features' },
        { name: 'GameStation 5', releaseYear: 2020, power: 16, difficulty: 5, timeline: 'Next-gen performance', news: 'Ultra-fast SSD and ray tracing technology' },
        { name: 'M-Box', releaseYear: 2001, power: 10, difficulty: 6, timeline: 'First Microsoft console', news: 'Enters gaming market with powerful specs' },
        { name: 'M-Box 360', releaseYear: 2005, power: 12, difficulty: 6, timeline: 'Online multiplayer boom', news: 'Revolutionary online gaming service' },
        { name: 'M-Box One', releaseYear: 2013, power: 14, difficulty: 5, timeline: 'Entertainment hub era', news: 'Integrates TV and gaming services' },
        { name: 'M-Box X', releaseYear: 2020, power: 17, difficulty: 4, timeline: 'Cloud gaming start', news: 'Cloud game streaming capabilities' },
        { name: 'Cosmic Engine', releaseYear: 2022, power: 20, difficulty: 8, timeline: 'Next-Gen Gaming', news: 'AI-enhanced game rendering' },
        { name: 'Radiant Core', releaseYear: 2023, power: 21, difficulty: 9, timeline: 'Advanced Gaming Tech', news: 'Quantum computing game integration' },
        { name: 'Pixel Prime', releaseYear: 2024, power: 22, difficulty: 9, timeline: 'Immersive Gaming', news: 'Neural interface gaming experience' },
        { name: 'Neural Network', releaseYear: 2025, power: 23, difficulty: 10, timeline: 'Cognitive Gaming Era', news: 'Brain-wave game control' },
        { name: 'Holographic Hub', releaseYear: 2026, power: 24, difficulty: 11, timeline: 'Spatial Computing', news: 'Full holographic game environments' },
        { name: 'Synapse X', releaseYear: 2027, power: 25, difficulty: 12, timeline: 'Neuromorphic Gaming', news: 'Self-adapting game worlds' },
        { name: 'NeuraTech', releaseYear: 2028, power: 26, difficulty: 13, timeline: 'Adaptive Gaming', news: 'Real-time emotional game response' },
        { name: 'Quantum Pulse', releaseYear: 2029, power: 27, difficulty: 14, timeline: 'Quantum Gaming Frontier', news: 'Quantum entanglement multiplayer' },
        { name: 'Cyber Genesis', releaseYear: 2030, power: 28, difficulty: 15, timeline: 'Virtual Reality Convergence', news: 'Full sensory game immersion' },
        { name: 'Apex Horizon', releaseYear: 2031, power: 29, difficulty: 16, timeline: 'Transcendent Gaming', news: 'Consciousness transfer gaming' },
        { name: 'Stellar Horizon', releaseYear: 2032, power: 30, difficulty: 17, timeline: 'Interstellar Gaming', news: 'Galactic multiplayer universes' },
        { name: 'Quantum Link', releaseYear: 2033, power: 31, difficulty: 18, timeline: 'Quantum Multiverse', news: 'Parallel reality game worlds' },
        { name: 'Cosmic Nexus', releaseYear: 2034, power: 32, difficulty: 19, timeline: 'Sentient Gaming', news: 'AI-generated living game universes' },
        { name: 'Neural Forge', releaseYear: 2035, power: 33, difficulty: 20, timeline: 'Cognitive Evolution', news: 'Thought-powered game mechanics' },
        { name: 'Quantum Realm', releaseYear: 2036, power: 34, difficulty: 21, timeline: 'Dimensional Gaming', news: 'Multiverse game exploration' },
        { name: 'Synergy Core', releaseYear: 2037, power: 35, difficulty: 22, timeline: 'Unified Consciousness', news: 'Collective multiplayer experiences' },
        { name: 'Nebula Prime', releaseYear: 2038, power: 36, difficulty: 23, timeline: 'Cosmic Gaming Frontier', news: 'Interstellar game network' },
        { name: 'Temporal Pulse', releaseYear: 2039, power: 37, difficulty: 24, timeline: 'Time-Warp Gaming', news: 'Non-linear game narratives' },
        { name: 'Infinite Horizon', releaseYear: 2040, power: 38, difficulty: 25, timeline: 'Reality Simulation', news: 'Procedurally infinite game worlds' },
        { name: 'Quantum Echo', releaseYear: 2041, power: 39, difficulty: 26, timeline: 'Quantum Resonance', news: 'Quantum state game interactions' },
        { name: 'Celestial Matrix', releaseYear: 2042, power: 40, difficulty: 27, timeline: 'Universal Gaming', news: 'Galactic consciousness platforms' }
    ]);