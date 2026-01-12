import React, { useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useGameLoop } from '../hooks/useGameLoop';
import { useNotification } from '../hooks/useNotification';
import TimeComponent from './TimeComponent';
import ProjectComponent from './Project/ProjectComponent';
import EmployeeComponent from './Employee/EmployeeComponent';
import FinanceComponent from './FinanceComponent';
import ShippingComponent from './ShippingComponent';
import ResearchComponent from './ResearchComponent';
import EventsComponent from './EventsComponent';
import FranchisesComponent from './FranchisesComponent';
import StudioCultureComponent from './StudioCultureComponent';
import AchievementsComponent from './AchievementsComponent';
import MoraleComponent from './MoraleComponent';
import StocksComponent from './StocksComponent';
import DebugPanel from './common/DebugPanel';
import Card from './common/Card';
import '../styles/GameStudio.css';

function GameStudio() {
    const { state, actions } = useGameContext();
    const { isRunning, currentSpeed } = useGameLoop();
    const { gameEvents, clearAll, notify } = useNotification();

    const handleAchievementComplete = (achievement) => {
        const existingAchievement = state.achievements.find(a => a.id === achievement.id);
        if (!existingAchievement) {
            actions.unlockAchievement(achievement);
            gameEvents.achievementUnlocked(achievement);
        }
    };

    const handleMoraleChange = (newMorale) => {
        actions.updateMorale(newMorale);
    };

    return (
        <div className="flex flex-col min-h-screen enterprise-dashboard">
            {/* Executive Command Center - Premium Header */}
            <div className="executive-header">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="circuit-pattern"></div>
                </div>

                <div className="relative z-10 p-8 flex justify-between items-center">
                    {/* Studio Brand Identity */}
                    <div className="flex items-center space-x-6">
                        <div className="studio-logo-container">
                            <div className="text-5xl relative">
                                <span className="studio-logo-icon">🏢</span>
                                <div className="logo-glow"></div>
                            </div>
                        </div>
                        <div className="studio-brand">
                            <h1 className="studio-title">
                                GAMING EMPIRE
                            </h1>
                            <div className="studio-subtitle">
                                &gt; NEXT-GEN ENTERTAINMENT CORPORATION
                            </div>
                        </div>
                    </div>

                    {/* Executive Control Panel */}
                    <div className="executive-controls flex items-center space-x-8">
                        {/* System Status Display */}
                        <div className="status-monitor">
                            <div className={`system-status ${isRunning ? 'active' : 'paused'}`}>
                                <div className={`status-indicator ${isRunning ? 'running' : 'paused'}`}></div>
                                <span className="status-text">
                                    {isRunning ? `SYSTEMS ACTIVE ${currentSpeed}X` : 'OPERATIONS PAUSED'}
                                </span>
                            </div>
                        </div>

                        {/* Time Management Console */}
                        <div className="time-console">
                            <TimeComponent />
                        </div>
                    </div>
                </div>
            </div>

            {/* Corporate Operations Floor */}
            <div className="enterprise-workspace">
                {/* Floating data particles */}
                <div className="data-particles absolute inset-0 pointer-events-none opacity-20"></div>

                {/* Executive Dashboard Grid */}
                <div className="executive-dashboard grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* 💼 EXECUTIVE COMMAND CENTER */}
                    <div className="executive-suite xl:col-span-4 space-y-6">
                        <div className="department-header">
                            <div className="department-title executive">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-3">💼</div>
                                    <h2>Executive Command</h2>
                                    <div className="department-subtitle">
                                        Strategic Operations Control
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="game-card studio-executive premium-workstation">
                            <FinanceComponent />
                        </Card>
                        <Card className="game-card studio-executive premium-workstation">
                            <MoraleComponent onMoraleChange={handleMoraleChange} />
                        </Card>
                        <Card className="game-card studio-executive premium-workstation">
                            <AchievementsComponent onAchievementComplete={handleAchievementComplete} />
                        </Card>
                    </div>

                    {/* 🎯 DEVELOPMENT OPERATIONS */}
                    <div className="development-suite xl:col-span-5 space-y-6">
                        <div className="department-header">
                            <div className="department-title development">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h2>Development Labs</h2>
                                    <div className="department-subtitle">
                                        Innovation & Creation Hub
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="game-card studio-dev premium-workstation">
                            <ProjectComponent />
                        </Card>
                        <Card className="game-card studio-dev premium-workstation">
                            <EmployeeComponent />
                        </Card>
                        <Card className="game-card studio-dev premium-workstation">
                            <ResearchComponent />
                        </Card>
                    </div>

                    {/* 📈 BUSINESS INTELLIGENCE */}
                    <div className="business-suite xl:col-span-3 space-y-6">
                        <div className="department-header">
                            <div className="department-title business">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 animate-pulse"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-3">📈</div>
                                    <h2>Business Intel</h2>
                                    <div className="department-subtitle">
                                        Market & Analytics Center
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="game-card studio-business premium-workstation">
                            <ShippingComponent addNotification={notify} />
                        </Card>
                        <Card className="game-card studio-business premium-workstation">
                            <EventsComponent />
                        </Card>
                        <Card className="game-card studio-business premium-workstation">
                            <FranchisesComponent />
                        </Card>
                        <Card className="game-card studio-business premium-workstation">
                            <StocksComponent />
                        </Card>
                        <Card className="game-card studio-business premium-workstation">
                            <StudioCultureComponent />
                        </Card>
                    </div>
                </div>
            </div>

            {/* 🚀 ENTERPRISE MISSION CONTROL */}
            <div className="enterprise-mission-control">
                {/* Mission Control Header */}
                <div className="absolute inset-0">
                    <div className="holographic-overlay"></div>
                </div>

                <div className="relative z-10 p-6">
                    <div className="mission-control-header flex justify-between items-center mb-6">
                        <div className="control-title">
                            <div className="flex items-center space-x-3">
                                <div className="control-icon">
                                    🚀
                                </div>
                                <div>
                                    <h3>MISSION CONTROL</h3>
                                    <div className="control-subtitle">
                                        Enterprise Operations Feed
                                    </div>
                                </div>
                            </div>
                        </div>
                        {state.notifications.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="clear-feed-btn"
                                title="Clear mission feed"
                            >
                                🗑️ PURGE
                            </button>
                        )}
                    </div>

                    <div className="mission-feed space-y-3 max-h-80 overflow-y-auto">
                        {state.notifications.slice(-8).map((notification, index) => (
                            <div
                                key={notification.id}
                                className={`mission-log-entry ${notification.type}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Mission log status indicator */}
                                <div className={`log-status-indicator ${notification.type}`}></div>

                                <button
                                    onClick={() => actions.removeNotification(notification.id)}
                                    className="dismiss-btn"
                                    title="Dismiss log entry"
                                >
                                    ✕
                                </button>

                                <div className="log-content">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className={`log-type ${notification.type}`}>
                                            {notification.type === 'success' ? '✅ SUCCESS'
                                             : notification.type === 'error' ? '🚨 ERROR'
                                             : notification.type === 'warning' ? '⚠️ WARNING'
                                             : '📡 INFO'}
                                        </span>
                                        {notification.timestamp && (
                                            <span className="log-timestamp">
                                                {new Date(notification.timestamp).toLocaleTimeString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="log-message">
                                        {notification.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {state.notifications.length === 0 && (
                            <div className="mission-idle">
                                <div className="idle-icon">🛸</div>
                                <div className="idle-title">
                                    MISSION CONTROL STANDBY
                                </div>
                                <div className="idle-subtitle">
                                    All systems operational
                                </div>
                                <div className="status-bar mt-4 flex justify-center">
                                    <div className="status-cursor">
                                        ▊
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Debug Panel */}
            <DebugPanel />
        </div>
    );
}

export default GameStudio;