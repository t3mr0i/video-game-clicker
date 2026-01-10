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
import AchievementsComponent from './AchievementsComponent';
import MoraleComponent from './MoraleComponent';

function App() {
    const [platforms, setPlatforms] = useState([
        // ... (keep the existing platforms array)
        // Platforms list from previous implementation
    ]);

    const [gameState, setGameState] = useState({
        platforms: platforms,
        money: 10000,
        reputation: 50,
        employees: [],
        projects: [],
        achievements: [],
        shipments: [],
        morale: 50
    });

    const [notifications, setNotifications] = useState([]);
    const [achievements, setAchievements] = useState([]);

    const addNotification = (message, type = 'info') => {
        const id = Date.now();
        const newNotification = { id, message, type };
        setNotifications([...notifications, newNotification]);

        // Remove notification after 5 seconds
        setTimeout(() => {
            setNotifications(notifications.filter(n => n.id !== id));
        }, 5000);
    };

    const handleAchievementComplete = (achievement) => {
        const existingAchievement = achievements.find(a => a.id === achievement.id);
        if (!existingAchievement) {
            const newAchievements = [...achievements, achievement];
            setAchievements(newAchievements);
            setGameState(prevState => ({
                ...prevState,
                money: prevState.money + achievement.reward
            }));
            addNotification(`Achievement Unlocked: ${achievement.title} (+${achievement.reward})`, 'success');
        }
    };

    const handleMoraleChange = (newMorale) => {
        setGameState(prevState => ({
            ...prevState,
            morale: newMorale
        }));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <TimeComponent />
                        <FinanceComponent gameState={gameState} />
                        <MoraleComponent
                            gameState={gameState}
                            onMoraleChange={handleMoraleChange}
                            projects={gameState.projects}
                            achievements={achievements}
                            shipments={gameState.shipments}
                        />
                        <AchievementsComponent
                            gameState={gameState}
                            onAchievementComplete={handleAchievementComplete}
                        />
                    </div>
                    <div>
                        <ProjectComponent />
                        <EmployeeComponent />
                        <ResearchComponent />
                    </div>
                    <div>
                        <ShippingComponent
                            addNotification={addNotification}
                        />
                        <EventsComponent />
                        <FranchisesComponent />
                        <StudioCultureComponent />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg shadow-lg ${
                            notification.type === 'success'
                                ? 'bg-green-500 text-white'
                                : notification.type === 'error'
                                ? 'bg-red-500 text-white'
                                : 'bg-blue-500 text-white'
                        }`}
                    >
                        {notification.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;