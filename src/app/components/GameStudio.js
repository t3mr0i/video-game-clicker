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
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Management Dashboard Header */}
            <div className="bg-gray-800 p-4 shadow-lg flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-400">Game Studio Tycoon</h1>
                <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isRunning ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                        {isRunning ? `Running ${currentSpeed}x` : 'Paused'}
                    </div>
                    <TimeComponent />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Left Column: Studio Management */}
                    <div className="space-y-6">
                        <Card className="bg-gray-800 border-2 border-blue-900">
                            <FinanceComponent />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-green-900">
                            <MoraleComponent
                                onMoraleChange={handleMoraleChange}
                            />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-purple-900">
                            <AchievementsComponent
                                onAchievementComplete={handleAchievementComplete}
                            />
                        </Card>
                    </div>

                    {/* Middle Column: Production */}
                    <div className="space-y-6">
                        <Card className="bg-gray-800 border-2 border-indigo-900">
                            <ProjectComponent />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-yellow-900">
                            <EmployeeComponent />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-teal-900">
                            <ResearchComponent />
                        </Card>
                    </div>

                    {/* Right Column: Business Strategy */}
                    <div className="space-y-6">
                        <Card className="bg-gray-800 border-2 border-red-900">
                            <ShippingComponent
                                addNotification={addNotification}
                            />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-orange-900">
                            <EventsComponent />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-pink-900">
                            <FranchisesComponent />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-purple-700">
                            <StocksComponent />
                        </Card>
                        <Card className="bg-gray-800 border-2 border-cyan-900">
                            <StudioCultureComponent />
                        </Card>
                    </div>
                </div>
            </div>

            {/* Event Log / Notifications - Enhanced with dismiss functionality */}
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-80 bg-gray-800 border-l-2 border-blue-600 shadow-xl p-4 rounded-l-lg z-50 max-h-96">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-400">Recent Events</h3>
                    {state.notifications.length > 0 && (
                        <button
                            onClick={() => actions.clearAllNotifications?.()}
                            className="text-xs text-gray-400 hover:text-white transition-colors duration-200 px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
                            title="Clear all notifications"
                        >
                            Clear All
                        </button>
                    )}
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-700">
                    {state.notifications.slice(-8).map(notification => (
                        <div
                            key={notification.id}
                            className={`relative p-3 pr-10 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 ${
                                notification.type === 'success'
                                    ? 'bg-green-700 hover:bg-green-600 text-white border-l-4 border-green-400'
                                    : notification.type === 'error'
                                    ? 'bg-red-700 hover:bg-red-600 text-white border-l-4 border-red-400'
                                    : notification.type === 'warning'
                                    ? 'bg-yellow-700 hover:bg-yellow-600 text-white border-l-4 border-yellow-400'
                                    : 'bg-blue-700 hover:bg-blue-600 text-white border-l-4 border-blue-400'
                            }`}
                        >
                            <button
                                onClick={() => actions.removeNotification(notification.id)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white text-xs flex items-center justify-center transition-all duration-200 hover:scale-110"
                                title="Dismiss notification"
                            >
                                ×
                            </button>
                            <div className="pr-2">
                                {notification.message}
                            </div>
                            {notification.timestamp && (
                                <div className="text-xs opacity-75 mt-1">
                                    {new Date(notification.timestamp).toLocaleTimeString()}
                                </div>
                            )}
                        </div>
                    ))}
                    {state.notifications.length === 0 && (
                        <div className="text-gray-500 text-center py-8 italic">
                            No recent events
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