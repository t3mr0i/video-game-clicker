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

            {/* Corporate Operations Floor */}
            <div className="enterprise-workspace" style={{
                padding: '2rem',
                background: 'linear-gradient(180deg, rgba(26, 26, 36, 0.8) 0%, rgba(16, 16, 24, 0.9) 100%)',
                position: 'relative'
            }}>
                {/* Floating data particles */}
                <div className="data-particles absolute inset-0 pointer-events-none opacity-20"></div>

                {/* Executive Dashboard Grid */}
                <div className="executive-dashboard grid grid-cols-1 xl:grid-cols-12 gap-8" style={{
                    maxWidth: '1800px',
                    margin: '0 auto'
                }}>
                    {/* 💼 EXECUTIVE COMMAND CENTER */}
                    <div className="executive-suite xl:col-span-4 space-y-6">
                        <div className="department-header">
                            <div className="department-title" style={{
                                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.05))',
                                border: '2px solid rgba(0, 217, 255, 0.3)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                backdropFilter: 'blur(15px)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-3">💼</div>
                                    <h2 className="text-xl font-bold text-cyan-300 font-mono tracking-wider uppercase">
                                        Executive Command
                                    </h2>
                                    <div className="mt-2 text-sm text-cyan-400/70 font-mono">
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
                            <div className="department-title" style={{
                                background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 255, 136, 0.05))',
                                border: '2px solid rgba(0, 255, 136, 0.3)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                backdropFilter: 'blur(15px)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h2 className="text-xl font-bold text-green-300 font-mono tracking-wider uppercase">
                                        Development Labs
                                    </h2>
                                    <div className="mt-2 text-sm text-green-400/70 font-mono">
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
                            <div className="department-title" style={{
                                background: 'linear-gradient(135deg, rgba(136, 0, 255, 0.15), rgba(136, 0, 255, 0.05))',
                                border: '2px solid rgba(136, 0, 255, 0.3)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                backdropFilter: 'blur(15px)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 animate-pulse"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-3">📈</div>
                                    <h2 className="text-xl font-bold text-purple-300 font-mono tracking-wider uppercase">
                                        Business Intel
                                    </h2>
                                    <div className="mt-2 text-sm text-purple-400/70 font-mono">
                                        Market & Analytics Center
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="game-card studio-business premium-workstation">
                            <ShippingComponent addNotification={addNotification} />
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
            <div className="enterprise-mission-control fixed right-6 top-1/2 transform -translate-y-1/2 w-[420px] z-50 max-h-[500px]"
                 style={{
                     background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(26, 26, 36, 0.9))',
                     border: '3px solid transparent',
                     borderImage: 'linear-gradient(45deg, #00D9FF, #FF0080, #8800FF) 1',
                     borderRadius: '20px',
                     boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 217, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                     backdropFilter: 'blur(20px)',
                     position: 'relative',
                     overflow: 'hidden'
                 }}>
                {/* Mission Control Header */}
                <div className="absolute inset-0">
                    <div className="holographic-overlay"></div>
                </div>

                <div className="relative z-10 p-6">
                    <div className="mission-control-header flex justify-between items-center mb-6" style={{
                        borderBottom: '2px solid rgba(0, 217, 255, 0.3)',
                        paddingBottom: '1rem'
                    }}>
                        <div className="control-title">
                            <div className="flex items-center space-x-3">
                                <div className="control-icon" style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'linear-gradient(135deg, #00D9FF, #FF0080)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    animation: 'rotate-glow 4s linear infinite'
                                }}>
                                    🚀
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold font-mono tracking-wider" style={{
                                        color: 'var(--text-neon-bright)',
                                        textShadow: '0 0 15px rgba(0, 217, 255, 0.8)',
                                        fontSize: '1.1rem',
                                        letterSpacing: '0.1em'
                                    }}>
                                        MISSION CONTROL
                                    </h3>
                                    <div className="text-xs font-mono" style={{
                                        color: 'rgba(0, 217, 255, 0.7)',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Enterprise Operations Feed
                                    </div>
                                </div>
                            </div>
                        </div>
                        {state.notifications.length > 0 && (
                            <button
                                onClick={() => actions.clearAllNotifications?.()}
                                className="clear-feed-btn"
                                title="Clear mission feed"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.1))',
                                    border: '1px solid rgba(255, 68, 68, 0.4)',
                                    borderRadius: '8px',
                                    padding: '0.5rem 1rem',
                                    color: '#FF4444',
                                    fontSize: '0.75rem',
                                    fontFamily: 'Fira Code, monospace',
                                    fontWeight: 'bold',
                                    letterSpacing: '0.05em',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                🗑️ PURGE
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