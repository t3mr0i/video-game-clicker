import React, { useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useGameLoop } from '../hooks/useGameLoop';
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

function GameStudio() {
    const { state, actions } = useGameContext();
    const { isRunning, currentSpeed } = useGameLoop();

    const addNotification = (message, type = 'info') => {
        const notification = {
            message,
            type,
            timestamp: Date.now()
        };

        // Create and get the new notification's ID
        const notificationId = actions.addNotification(notification);

        // Auto-remove notification after 8 seconds (increased for better UX)
        const timeoutId = setTimeout(() => {
            actions.removeNotification(notificationId);
        }, 8000);

        // Return the notification id to allow external cancellation
        return { id: notificationId, timeoutId };
    };

    const handleAchievementComplete = (achievement) => {
        const existingAchievement = state.achievements.find(a => a.id === achievement.id);
        if (!existingAchievement) {
            actions.unlockAchievement(achievement);
            addNotification(`Achievement Unlocked: ${achievement.title} (+$${achievement.reward})`, 'success');
        }
    };

    const handleMoraleChange = (newMorale) => {
        actions.updateMorale(newMorale);
    };

    return (
        <div className="flex flex-col min-h-screen enterprise-dashboard" style={{background: 'var(--gradient-studio)'}}>
            {/* Executive Command Center - Premium Header */}
            <div className="executive-header" style={{
                background: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A24 50%, #252538 100%)',
                borderBottom: '3px solid transparent',
                borderImage: 'linear-gradient(90deg, #00D9FF, #00FF88, #FF0080) 1',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
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
                            <h1 className="studio-title" style={{
                                fontSize: '2.8rem',
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                background: 'linear-gradient(45deg, #00D9FF, #00FF88, #FF0080, #8800FF)',
                                backgroundSize: '300% 300%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'gradient-flow 4s ease infinite',
                                letterSpacing: '0.15em',
                                textShadow: '0 0 30px rgba(0, 217, 255, 0.5)'
                            }}>
                                GAMING EMPIRE
                            </h1>
                            <div className="studio-subtitle" style={{
                                fontSize: '1rem',
                                color: '#8A8A9F',
                                fontFamily: 'Fira Code, monospace',
                                letterSpacing: '0.1em',
                                marginTop: '0.5rem'
                            }}>
                                > NEXT-GEN ENTERTAINMENT CORPORATION
                            </div>
                        </div>
                    </div>

                    {/* Executive Control Panel */}
                    <div className="executive-controls flex items-center space-x-8">
                        {/* System Status Display */}
                        <div className="status-monitor" style={{
                            background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 217, 255, 0.05))',
                            border: '2px solid rgba(0, 217, 255, 0.3)',
                            borderRadius: '12px',
                            padding: '1rem 1.5rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div className={`system-status ${isRunning ? 'active' : 'paused'}`} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '0.9rem',
                                fontFamily: 'Fira Code, monospace',
                                fontWeight: 'bold',
                                letterSpacing: '0.05em'
                            }}>
                                <div className={`status-indicator ${isRunning ? 'running' : 'paused'}`} style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: isRunning ? '#00FF88' : '#FF4444',
                                    boxShadow: `0 0 20px ${isRunning ? 'rgba(0, 255, 136, 0.6)' : 'rgba(255, 68, 68, 0.6)'}`,
                                    animation: isRunning ? 'pulse-glow 2s ease-in-out infinite' : 'none'
                                }}></div>
                                <span style={{
                                    color: isRunning ? '#00FF88' : '#FF4444',
                                    textShadow: `0 0 10px ${isRunning ? 'rgba(0, 255, 136, 0.8)' : 'rgba(255, 68, 68, 0.8)'}`
                                }}>
                                    {isRunning ? `SYSTEMS ACTIVE ${currentSpeed}X` : 'OPERATIONS PAUSED'}
                                </span>
                            </div>
                        </div>

                        {/* Time Management Console */}
                        <div className="time-console" style={{
                            background: 'linear-gradient(135deg, rgba(136, 0, 255, 0.1), rgba(136, 0, 255, 0.05))',
                            border: '2px solid rgba(136, 0, 255, 0.3)',
                            borderRadius: '12px',
                            padding: '1rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <TimeComponent />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Studio Floor Layout - Organized by functional areas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 🏢 EXECUTIVE SUITE */}
                    <div className="space-y-6">
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-bold text-cyan-300 font-mono tracking-wider">
                                🏢 EXECUTIVE SUITE
                            </h2>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                        </div>
                        <Card className="game-card studio-executive">
                            <FinanceComponent />
                        </Card>
                        <Card className="game-card studio-executive">
                            <MoraleComponent
                                onMoraleChange={handleMoraleChange}
                            />
                        </Card>
                        <Card className="game-card studio-executive">
                            <AchievementsComponent
                                onAchievementComplete={handleAchievementComplete}
                            />
                        </Card>
                    </div>

                    {/* 🎯 DEVELOPMENT FLOOR */}
                    <div className="space-y-6">
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-bold text-green-300 font-mono tracking-wider">
                                🎯 DEVELOPMENT FLOOR
                            </h2>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                        </div>
                        <Card className="game-card studio-dev">
                            <ProjectComponent />
                        </Card>
                        <Card className="game-card studio-dev">
                            <EmployeeComponent />
                        </Card>
                        <Card className="game-card studio-dev">
                            <ResearchComponent />
                        </Card>
                    </div>

                    {/* 📈 BUSINESS OPERATIONS */}
                    <div className="space-y-6">
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-bold text-purple-300 font-mono tracking-wider">
                                📈 BUSINESS OPS
                            </h2>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                        </div>
                        <Card className="game-card studio-business">
                            <ShippingComponent
                                addNotification={addNotification}
                            />
                        </Card>
                        <Card className="game-card studio-business">
                            <EventsComponent />
                        </Card>
                        <Card className="game-card studio-business">
                            <FranchisesComponent />
                        </Card>
                        <Card className="game-card studio-business">
                            <StocksComponent />
                        </Card>
                        <Card className="game-card studio-business">
                            <StudioCultureComponent />
                        </Card>
                    </div>
                </div>
            </div>

            {/* 📡 STUDIO ACTIVITY MONITOR */}
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-96 z-50 max-h-96"
                 style={{
                     background: 'var(--gradient-screen)',
                     border: '2px solid var(--color-neon-blue)',
                     borderRadius: '12px',
                     boxShadow: 'var(--shadow-studio), 0 0 25px rgba(0, 217, 255, 0.3)',
                     backdropFilter: 'blur(10px)'
                 }}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold font-mono tracking-wider" style={{
                            color: 'var(--text-neon-bright)',
                            textShadow: '0 0 10px rgba(0, 217, 255, 0.5)'
                        }}>
                            📡 ACTIVITY LOG
                        </h3>
                        {state.notifications.length > 0 && (
                            <button
                                onClick={() => actions.clearAllNotifications?.()}
                                className="game-button text-xs px-3 py-1"
                                title="Clear all notifications"
                                style={{fontSize: '0.7rem', padding: '0.3rem 0.6rem'}}
                            >
                                CLEAR
                            </button>
                        )}
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto" style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#00D9FF #1A1A24'
                    }}>
                        {state.notifications.slice(-8).map(notification => (
                            <div
                                key={notification.id}
                                className="relative p-3 pr-10 rounded-lg text-sm transition-all duration-300 transform hover:scale-102 font-mono"
                                style={{
                                    background: notification.type === 'success'
                                        ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1))'
                                        : notification.type === 'error'
                                        ? 'linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.1))'
                                        : notification.type === 'warning'
                                        ? 'linear-gradient(135deg, rgba(255, 170, 0, 0.2), rgba(255, 170, 0, 0.1))'
                                        : 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.1))',
                                    border: `1px solid ${
                                        notification.type === 'success' ? '#00FF88'
                                        : notification.type === 'error' ? '#FF4444'
                                        : notification.type === 'warning' ? '#FFAA00'
                                        : '#00D9FF'
                                    }`,
                                    color: 'var(--text-neon-bright)',
                                    boxShadow: `0 0 10px ${
                                        notification.type === 'success' ? 'rgba(0, 255, 136, 0.3)'
                                        : notification.type === 'error' ? 'rgba(255, 68, 68, 0.3)'
                                        : notification.type === 'warning' ? 'rgba(255, 170, 0, 0.3)'
                                        : 'rgba(0, 217, 255, 0.3)'
                                    }`
                                }}
                            >
                                <button
                                    onClick={() => actions.removeNotification(notification.id)}
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    style={{
                                        background: 'rgba(255, 68, 68, 0.8)',
                                        border: '1px solid #FF4444'
                                    }}
                                    title="Dismiss notification"
                                >
                                    ×
                                </button>
                                <div className="pr-2" style={{fontSize: '0.8rem'}}>
                                    <span style={{
                                        color: notification.type === 'success' ? '#00FF88'
                                            : notification.type === 'error' ? '#FF4444'
                                            : notification.type === 'warning' ? '#FFAA00'
                                            : '#00D9FF'
                                    }}>
                                        {notification.type === 'success' ? '✓'
                                         : notification.type === 'error' ? '✗'
                                         : notification.type === 'warning' ? '⚠'
                                         : 'ℹ'}
                                    </span>{' '}
                                    {notification.message}
                                </div>
                                {notification.timestamp && (
                                    <div className="text-xs opacity-75 mt-1 font-mono" style={{
                                        color: 'var(--text-muted-console)',
                                        fontSize: '0.7rem'
                                    }}>
                                        {new Date(notification.timestamp).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        ))}
                        {state.notifications.length === 0 && (
                            <div className="text-center py-8 font-mono" style={{
                                color: 'var(--text-muted-console)',
                                fontSize: '0.9rem'
                            }}>
                                > SYSTEM IDLE
                                <div className="animate-pulse mt-2" style={{color: 'var(--color-neon-green)'}}>
                                    █
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