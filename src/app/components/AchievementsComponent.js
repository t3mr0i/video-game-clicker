import React, { useState, useEffect } from 'react';

const achievements = [
    {
        id: 'first_console',
        title: 'First Console',
        description: 'Launch your first gaming console',
        condition: (state) => state.platforms.length >= 1,
        reward: 500
    },
    {
        id: 'tech_innovator',
        title: 'Tech Innovator',
        description: 'Develop 5 unique gaming platforms',
        condition: (state) => state.platforms.length >= 5,
        reward: 2000
    },
    {
        id: 'market_domination',
        title: 'Market Domination',
        description: 'Reach a total of 10 gaming platforms',
        condition: (state) => state.platforms.length >= 10,
        reward: 5000
    },
    {
        id: 'future_tech',
        title: 'Future Tech Pioneer',
        description: 'Develop platforms beyond 2030',
        condition: (state) => state.platforms.some(p => p.releaseYear > 2030),
        reward: 3000
    },
    {
        id: 'quantum_leap',
        title: 'Quantum Leap',
        description: 'Develop a platform with difficulty over 20',
        condition: (state) => state.platforms.some(p => p.difficulty > 20),
        reward: 7500
    }
];

function AchievementsComponent({ gameState, onAchievementComplete }) {
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);

    useEffect(() => {
        const newUnlockedAchievements = achievements.filter(achievement =>
            !unlockedAchievements.some(a => a.id === achievement.id) &&
            achievement.condition(gameState)
        );

        if (newUnlockedAchievements.length > 0) {
            newUnlockedAchievements.forEach(achievement => {
                onAchievementComplete(achievement);
            });

            setUnlockedAchievements([
                ...unlockedAchievements,
                ...newUnlockedAchievements
            ]);
        }
    }, [gameState]);

    return (
        <div className="achievements-container p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-bold mb-4">Achievements</h2>
            {achievements.map(achievement => (
                <div
                    key={achievement.id}
                    className={`achievement mb-2 p-2 rounded ${
                        unlockedAchievements.some(a => a.id === achievement.id)
                            ? 'bg-green-200'
                            : 'bg-gray-200'
                    }`}
                >
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm">{achievement.description}</p>
                    {unlockedAchievements.some(a => a.id === achievement.id) && (
                        <span className="text-green-600">✓ Unlocked! (+{achievement.reward})</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AchievementsComponent;