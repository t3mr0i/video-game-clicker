import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrophy, faBolt, faLightbulb, faBullhorn, faHeart,
    faCode, faBuilding, faUsers, faTimes, faInfoCircle,
    faPlus, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { GAME_MECHANICS } from '../config/gameConstants';
import Modal from './common/Modal';

const StudioCultureComponent = ({ studioCulture = { values: [], bonuses: {} }, culturalValues = [], adoptCulturalValue = () => {}, removeCulturalValue = () => {}, studioLevel = 1 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Icon mapping
    const getIcon = (iconName) => {
        const iconMap = {
            'trophy': faTrophy,
            'bolt': faBolt,
            'lightbulb': faLightbulb,
            'bullhorn': faBullhorn,
            'heart': faHeart,
            'code': faCode
        };
        return iconMap[iconName] || faBullhorn;
    };

    // Format percentage display
    const formatBonus = (value) => {
        const percentage = (value - 1) * 100;
        if (percentage > 0) return `+${percentage.toFixed(0)}%`;
        if (percentage < 0) return `${percentage.toFixed(0)}%`;
        return "0%";
    };

    // Get color class based on bonus value
    const getBonusColorClass = (value) => {
        if (value > 1) return "text-green-600";
        if (value < 1) return "text-red-600";
        return "text-gray-600";
    };

    // Calculate how many values can still be adopted
    const availableSlots = 3 - (studioCulture?.values?.length || 0);
    
    // Check if studio level is high enough to adopt cultural values
    const canAdoptValues = studioLevel >= 2;
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold flex items-center">
                    <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-600" />
                    Studio Culture
                </h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    disabled={!canAdoptValues}
                    className={`text-sm px-3 py-1 rounded flex items-center ${canAdoptValues ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    Manage Culture
                </button>
            </div>
            
            {!canAdoptValues ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-3 text-yellow-700 text-sm">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    Reach Studio Level 2 to unlock cultural values
                </div>
            ) : studioCulture.values.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                    No cultural values adopted yet. Add some to gain studio bonuses!
                </div>
            ) : (
                <div className="space-y-3">
                    {studioCulture.values.map(value => (
                        <div key={value.id} className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                        <FontAwesomeIcon icon={getIcon(value.icon)} className="text-blue-600" />
                                    </div>
                                    <h3 className="font-medium">{value.name}</h3>
                                </div>
                                <button 
                                    onClick={() => removeCulturalValue(value.id)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 mb-2">{value.description}</p>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(value.bonuses).map(([key, bonus]) => {
                                    const displayName = {
                                        employeeProductivity: 'Employee Productivity',
                                        qualityBonus: 'Game Quality',
                                        marketingEfficiency: 'Marketing Efficiency',
                                        developmentSpeed: 'Development Speed',
                                        innovationBonus: 'Innovation',
                                        employeeRetention: 'Employee Retention'
                                    }[key];
                                    
                                    const valueClass = bonus > 0 ? 'text-green-600' : 'text-red-600';
                                    const formattedBonus = bonus > 0 ? `+${(bonus*100).toFixed(0)}%` : `${(bonus*100).toFixed(0)}%`;
                                    
                                    return (
                                        <div key={key} className="flex items-center">
                                            <span className="text-gray-600 mr-1">{displayName}:</span>
                                            <span className={valueClass}>{formattedBonus}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {canAdoptValues && (
                <div className="mt-4 border-t pt-3">
                    <h3 className="font-medium mb-2">Current Studio Bonuses</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(studioCulture.bonuses).map(([key, value]) => {
                            const displayName = {
                                employeeProductivity: 'Employee Productivity',
                                qualityBonus: 'Game Quality',
                                marketingEfficiency: 'Marketing Efficiency',
                                developmentSpeed: 'Development Speed',
                                innovationBonus: 'Innovation',
                                employeeRetention: 'Employee Retention'
                            }[key];
                            
                            return (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{displayName}:</span>
                                    <span className={`text-sm font-medium ${getBonusColorClass(value)}`}>
                                        {formatBonus(value)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {/* Modal for managing cultural values */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Studio Cultural Values"
                size="xl"
                className="max-h-[80vh] overflow-y-auto"
            >
                <div className="mb-4">
                    <p className="text-gray-700 mb-2">
                        Your studio can adopt up to 3 cultural values that define how your team approaches game development.
                        Each value provides different bonuses and trade-offs.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-800">
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                        You have {availableSlots} {availableSlots === 1 ? 'slot' : 'slots'} available for new cultural values.
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold mb-2">Current Values</h3>
                    {studioCulture.values.length === 0 ? (
                        <div className="text-gray-500 italic">No cultural values adopted yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {studioCulture.values.map(value => (
                                <div key={value.id} className="border rounded p-3 bg-gray-50 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                            <FontAwesomeIcon icon={getIcon(value.icon)} className="text-blue-600" />
                                        </div>
                                        <span>{value.name}</span>
                                    </div>
                                    <button
                                        onClick={() => removeCulturalValue(value.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {availableSlots > 0 && (
                    <div>
                        <h3 className="font-bold mb-2">Available Values</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {culturalValues.filter(v => !studioCulture.values.some(sv => sv.id === v.id)).map(value => (
                                <div key={value.id} className="border rounded p-3 hover:bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                                <FontAwesomeIcon icon={getIcon(value.icon)} className="text-blue-600" />
                                            </div>
                                            <h3 className="font-medium">{value.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => {
                                                adoptCulturalValue(value.id);
                                                if (studioCulture.values.length >= 2) { // Will be 3 after adoption
                                                    setIsModalOpen(false);
                                                }
                                            }}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center text-sm"
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="mr-1" />
                                            Adopt
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 mb-2">{value.description}</p>

                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {Object.entries(value.bonuses).map(([key, bonus]) => {
                                            const displayName = {
                                                employeeProductivity: 'Employee Productivity',
                                                qualityBonus: 'Game Quality',
                                                marketingEfficiency: 'Marketing Efficiency',
                                                developmentSpeed: 'Development Speed',
                                                innovationBonus: 'Innovation',
                                                employeeRetention: 'Employee Retention'
                                            }[key];

                                            const valueClass = bonus > 0 ? 'text-green-600' : 'text-red-600';
                                            const formattedBonus = bonus > 0 ? `+${(bonus*100).toFixed(0)}%` : `${(bonus*100).toFixed(0)}%`;

                                            return (
                                                <div key={key} className="flex items-center">
                                                    <span className="text-gray-600 mr-1">{displayName}:</span>
                                                    <span className={valueClass}>{formattedBonus}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default StudioCultureComponent; 