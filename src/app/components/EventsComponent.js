import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const EventsComponent = ({ events, currentWeek }) => {
    if (!events || events.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Active Events</h2>
            <div className="space-y-3">
                {events.map(event => {
                    const weeksRemaining = Math.max(0, event.endWeek - currentWeek);
                    const isPositive = event.type === 'positive';
                    
                    return (
                        <div 
                            key={event.id} 
                            className={`border-l-4 ${isPositive ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} p-3 rounded-r`}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon 
                                    icon={isPositive ? faCheckCircle : faExclamationTriangle} 
                                    className={`mr-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`} 
                                />
                                <h3 className="font-medium">{event.title}</h3>
                            </div>
                            <p className="text-sm ml-6 text-gray-600">{event.description}</p>
                            <div className="flex items-center mt-2 ml-6 text-sm text-gray-500">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                <span>{weeksRemaining > 0 ? `${weeksRemaining} ${weeksRemaining === 1 ? 'week' : 'weeks'} remaining` : 'Ending soon'}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventsComponent; 