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
import DebugPanel from './common/DebugPanel';
import Card from './common/Card';

function GameStudio() {
    const { state, actions } = useGameContext();
    const { isRunning, currentSpeed } = useGameLoop();

    const addNotification = (message, type = 'info') => {
        const notification = {
            message,
            type
        };

        // Create and get the new notification's ID
        const notificationId = actions.addNotification(notification);

        // Auto-remove notification after 5 seconds
        const timeoutId = setTimeout(() => {
            actions.removeNotification(notificationId);
        }, 5000);

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
                        <Card className="bg-gray-800 border-2 border-cyan-900">
                            <StudioCultureComponent />
                        </Card>
                    </div>
                </div>
            </div>

            {/* Event Log / Notifications - More Tycoon-like Sidebar */}
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-72 bg-gray-800 shadow-lg p-4 rounded-l-lg z-50">
                <h3 className="text-lg font-bold mb-4 text-blue-400">Recent Events</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {state.notifications.slice(-5).map(notification => (
                        <div
                            key={notification.id}
                            className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                                notification.type === 'success'
                                    ? 'bg-green-700 text-white'
                                    : notification.type === 'error'
                                    ? 'bg-red-700 text-white'
                                    : notification.type === 'warning'
                                    ? 'bg-yellow-700 text-white'
                                    : 'bg-blue-700 text-white'
                            }`}
                        >
                            {notification.message}
                        </div>
                    ))}
                </div>
            </div>

            {/* Debug Panel */}
            <DebugPanel />
        </div>
    );
}

export default GameStudio;