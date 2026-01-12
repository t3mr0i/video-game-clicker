'use client'
import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { useGameLoop } from '../../hooks/useGameLoop';
import Card from './Card';
import Button from './Button';

export default function DebugPanel() {
  const { state } = useGameContext();
  const gameLoop = useGameLoop();
  const [showDebug, setShowDebug] = useState(false);
  const [performanceStats, setPerformanceStats] = useState(null);

  useEffect(() => {
    if (showDebug && gameLoop.getPerformanceStats) {
      const interval = setInterval(() => {
        setPerformanceStats(gameLoop.getPerformanceStats());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showDebug, gameLoop]);

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={() => setShowDebug(true)}
          variant="secondary"
          size="sm"
        >
          Debug
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <Card>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Debug Panel</h3>
            <Button
              onClick={() => setShowDebug(false)}
              variant="secondary"
              size="sm"
            >
              Hide
            </Button>
          </div>

          {/* Game State */}
          <div className="space-y-2 mb-4">
            <h4 className="font-medium text-sm text-gray-600">Game State</h4>
            <div className="text-xs space-y-1">
              <div>Money: ${state.money?.toLocaleString() || 0}</div>
              <div>Morale: {state.morale || 0}%</div>
              <div>Employees: {state.employees?.length || 0}</div>
              <div>Active Projects: {state.projects?.filter(p => p.status === 'in-progress').length || 0}</div>
              <div>Completed: {state.completedProjects?.length || 0}</div>
              <div>Speed: {state.gameSpeed}x</div>
              <div>Date: {state.currentDate?.month || 1}/{state.currentDate?.day || 1}/{state.currentDate?.year || 2024}</div>
            </div>
          </div>

          {/* Performance Stats */}
          {performanceStats && (
            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-sm text-gray-600">Performance</h4>
              <div className="text-xs space-y-1">
                <div>Frame Time: {performanceStats.frameTime.toFixed(1)}ms</div>
                <div>Max Frame: {performanceStats.maxFrameTime}ms</div>
                <div>Accumulated: {performanceStats.accumulatedTime.toFixed(1)}ms</div>
                <div>Running: {performanceStats.isRunning ? 'Yes' : 'No'}</div>
                <div>Loop Speed: {performanceStats.speed}x</div>
              </div>
            </div>
          )}

          {/* Recent Achievements */}
          {state.achievements?.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-600">Recent Achievements</h4>
              <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                {state.achievements.slice(-3).map((achievement, index) => (
                  <div key={index} className="text-green-600">
                    {achievement.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}