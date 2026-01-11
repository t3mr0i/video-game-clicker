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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-4">
                        <TimeComponent />
                        <FinanceComponent />
                        <MoraleComponent
                            onMoraleChange={handleMoraleChange}
                        />
                        <AchievementsComponent
                            onAchievementComplete={handleAchievementComplete}
                        />
                    </div>
                    <div className="space-y-4">
                        <ProjectComponent />
                        <EmployeeComponent />
                        <ResearchComponent />
                    </div>
                    <div className="space-y-4">
                        <ShippingComponent
                            addNotification={addNotification}
                        />
                        <EventsComponent />
                        <FranchisesComponent />
                        <StudioCultureComponent />
                    </div>
                </div>
            </div>

            {/* Game Status Indicator */}
            <div className="fixed top-4 right-4 z-50">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isRunning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                    {isRunning ? `Running ${currentSpeed}x` : 'Paused'}
                </div>
            </div>

            {/* Notifications */}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {state.notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg shadow-lg transition-all duration-300 ${
                            notification.type === 'success'
                                ? 'bg-green-500 text-white'
                                : notification.type === 'error'
                                ? 'bg-red-500 text-white'
                                : notification.type === 'warning'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-blue-500 text-white'
                        }`}
                    >
                        {notification.message}
                        <button
                            onClick={() => actions.removeNotification(notification.id)}
                            className="ml-2 text-white opacity-70 hover:opacity-100"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Debug Panel */}
            <DebugPanel />
        </div>
    );
}

export default GameStudio;