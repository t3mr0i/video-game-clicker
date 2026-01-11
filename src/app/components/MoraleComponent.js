import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MORALE_FACTORS = {
    projectSuccess: 10,
    projectFailure: -15,
    platformLaunch: 15,
    gameShipping: 25,
    negativeReview: -20,
    crunchTime: -10,
    employeeHiring: 5,
    employeeFiring: -10,
    achievement: 5
};

function MoraleComponent({
    gameState,
    onMoraleChange,
    projects,
    achievements,
    shipments
}) {
    const [morale, setMorale] = useState(50);
    const [moraleHistory, setMoraleHistory] = useState([]);

    useEffect(() => {
        let moraleAdjustment = 0;

        // Check project successes and failures
        const recentProjects = projects.filter(p => p.completed !== undefined);
        recentProjects.forEach(project => {
            moraleAdjustment += project.completed
                ? MORALE_FACTORS.projectSuccess
                : MORALE_FACTORS.projectFailure;
        });

        // Track platform launches
        const newPlatforms = gameState.platforms.length > moraleHistory.length;
        if (newPlatforms) {
            moraleAdjustment += MORALE_FACTORS.platformLaunch;
        }

        // Track game shipments
        const newShipments = shipments.length > (moraleHistory.length / 2);
        if (newShipments) {
            moraleAdjustment += MORALE_FACTORS.gameShipping;
        }

        // Track achievements
        const newAchievements = achievements.length > (moraleHistory.length / 3);
        if (newAchievements) {
            moraleAdjustment += MORALE_FACTORS.achievement;
        }

        const newMorale = Math.max(0, Math.min(100, morale + moraleAdjustment));

        if (newMorale !== morale) {
            setMorale(newMorale);
            onMoraleChange(newMorale);
            setMoraleHistory([...moraleHistory, newMorale]);
        }
    }, [gameState, projects, achievements, shipments]);

    const getMoraleStatus = () => {
        if (morale < 20) return { text: 'Critical', color: 'text-red-600' };
        if (morale < 40) return { text: 'Low', color: 'text-orange-500' };
        if (morale < 60) return { text: 'Average', color: 'text-gray-500' };
        if (morale < 80) return { text: 'Good', color: 'text-green-500' };
        return { text: 'Excellent', color: 'text-green-700' };
    };

    const moraleStatus = getMoraleStatus();

    return (
        <div className="morale-container p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-bold mb-2">Studio Morale</h2>
            <div className="morale-bar bg-gray-300 rounded h-6 w-full">
                <div
                    className="morale-level bg-blue-500 h-full rounded"
                    style={{ width: `${morale}%` }}
                ></div>
            </div>
            <div className={`morale-status mt-2 font-semibold ${moraleStatus.color}`}>
                Morale: {morale}% - {moraleStatus.text}
            </div>
            <div className="morale-tips text-sm mt-2">
                {morale < 40 && "Your team is struggling. Consider team-building activities."}
                {morale >= 80 && "Your team is highly motivated and performing exceptionally well!"}
            </div>
        </div>
    );
}

MoraleComponent.propTypes = {
  gameState: PropTypes.shape({
    platforms: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  onMoraleChange: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool
  })).isRequired,
  achievements: PropTypes.arrayOf(PropTypes.object).isRequired,
  shipments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MoraleComponent;