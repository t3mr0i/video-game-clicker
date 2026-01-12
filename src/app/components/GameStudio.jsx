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
// GameStudio styles are now consolidated in globals.css

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
        <div className="flex flex-col min-h-screen">
            {/* Application Header */}
            <div className="app-header">
                <div className="header-content">
                    {/* Brand Identity */}
                    <div className="app-logo">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="mr-2">
                            <rect x="4" y="8" width="24" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <rect x="8" y="12" width="4" height="8" fill="currentColor"/>
                            <rect x="14" y="12" width="4" height="8" fill="currentColor"/>
                            <rect x="20" y="12" width="4" height="8" fill="currentColor"/>
                        </svg>
                        Game Studio
                    </div>

                    {/* Header Controls */}
                    <div className="header-controls">
                        {/* System Status Display */}
                        <div className="status-display">
                            <div className={`status-indicator ${isRunning ? 'status-running' : 'status-paused'}`}></div>
                            <span>
                                {isRunning ? `Running ${currentSpeed}x` : 'Paused'}
                            </span>
                        </div>

                        {/* Time Controls */}
                        <TimeComponent />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                        {/* Management Section */}
                        <div className="executive-section xl:col-span-4 space-y-6">
                            <div className="section-header">
                                <div className="section-title">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                                    </svg>
                                    Management
                                </div>
                                <div className="section-description">
                                    Financial oversight and company management
                                </div>
                            </div>

                            <Card className="game-card">
                                <FinanceComponent />
                            </Card>
                            <Card className="game-card">
                                <MoraleComponent onMoraleChange={handleMoraleChange} />
                            </Card>
                            <Card className="game-card">
                                <AchievementsComponent onAchievementComplete={handleAchievementComplete} />
                            </Card>
                        </div>

                        {/* Development Section */}
                        <div className="development-section xl:col-span-5 space-y-6">
                            <div className="section-header">
                                <div className="section-title">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                    </svg>
                                    Development
                                </div>
                                <div className="section-description">
                                    Project creation and team management
                                </div>
                            </div>

                            <Card className="game-card">
                                <ProjectComponent />
                            </Card>
                            <Card className="game-card">
                                <EmployeeComponent />
                            </Card>
                            <Card className="game-card">
                                <ResearchComponent />
                            </Card>
                        </div>

                        {/* Business Operations */}
                        <div className="business-section xl:col-span-3 space-y-6">
                            <div className="section-header">
                                <div className="section-title">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    Business Operations
                                </div>
                                <div className="section-description">
                                    Market analysis and business growth
                                </div>
                            </div>

                            <Card className="game-card">
                                <ShippingComponent addNotification={notify} />
                            </Card>
                            <Card className="game-card">
                                <EventsComponent />
                            </Card>
                            <Card className="game-card">
                                <FranchisesComponent />
                            </Card>
                            <Card className="game-card">
                                <StocksComponent />
                            </Card>
                            <Card className="game-card">
                                <StudioCultureComponent />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Panel */}
            <div className="notification-panel">
                <div className="notification-header">
                    <div className="notification-title">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z"/>
                        </svg>
                        Activity Feed
                    </div>
                    {state.notifications.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="game-button"
                            title="Clear notifications"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="notification-list">
                    {state.notifications.slice(-8).map((notification, index) => (
                        <div
                            key={notification.id}
                            className={`notification-item ${notification.type}`}
                        >
                            <button
                                onClick={() => actions.removeNotification(notification.id)}
                                className="dismiss-button"
                                title="Dismiss notification"
                            >
                                ×
                            </button>

                            <div className="notification-content">
                                <div className={`notification-type ${notification.type}`}>
                                    {notification.type === 'success' ? 'Success'
                                     : notification.type === 'error' ? 'Error'
                                     : notification.type === 'warning' ? 'Warning'
                                     : 'Info'}
                                </div>
                                {notification.timestamp && (
                                    <div className="notification-timestamp">
                                        {new Date(notification.timestamp).toLocaleTimeString()}
                                    </div>
                                )}
                                <div className="notification-message">
                                    {notification.message}
                                </div>
                            </div>
                        </div>
                    ))}
                    {state.notifications.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="empty-state-title">
                                No recent activity
                            </div>
                            <div className="empty-state-description">
                                Notifications will appear here as you work
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Debug Panel */}
            <DebugPanel />
        </div>
    );
}

export default GameStudio;