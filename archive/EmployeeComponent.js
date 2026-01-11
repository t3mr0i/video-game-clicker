import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faStar, faCode, faWrench, faBug, faPaintBrush, faUser, faChartLine, faVial, faBullhorn, faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

const PERSONALITIES = {
    Developer: [
        "Perfectionist", "Quick Learner", "Creative Coder", "Problem Solver", "Tech Geek",
        "Night Owl", "Team Player", "Solo Genius", "Caffeine Addict", "Experimental"
    ],
    Designer: [
        "Visionary", "Minimalist", "Color Enthusiast", "User-Focused", "Trendsetter",
        "Storyteller", "Pixel Perfectionist", "Unconventional", "Collaborative", "Intuitive"
    ],
    Marketer: [
        "Social Butterfly", "Data Driven", "Storyteller", "Persuasive", "Trend Spotter",
        "Digital Native", "Creative Strategist", "Network Expert", "Bold Communicator", "Adaptable"
    ]
};

const PERSONALITY_EFFECTS = {
    "Perfectionist": { skillGainRate: 1.2, projectDelayRisk: 0.3 },
    "Quick Learner": { skillGainRate: 1.5, initialSkillPoints: 2 },
    "Creative Coder": { bugFixRate: 1.3, randomBugChance: 0.2 },
    "Night Owl": { lateNightProductivity: 1.2, energyDrainRate: 0.3 },
    "Team Player": { teamBonusMultiplier: 1.2, individualPerformance: 0.9 },
    "Solo Genius": { individualPerformance: 1.3, teamBonusMultiplier: 0.8 },
    "Visionary": { creativityBoost: 1.3, marketAcceptanceChance: 1.2 },
    "User-Focused": { userExperienceImpact: 1.4, designCost: 1.1 },
    "Social Butterfly": { networkingEffectiveness: 1.3, socialMediaEngagement: 1.2 },
    "Data Driven": { marketResearchAccuracy: 1.4, advertisingEfficiency: 1.2 }
};

const getRandomPersonality = (type) => {
    const personalities = PERSONALITIES[type] || [];
    return personalities[Math.floor(Math.random() * personalities.length)];
};

const EmployeeComponent = ({
    employees = [],
    hireEmployee,
    fireEmployee,
    assignToProject,
    projects = [],
    currentYear,
    currentMonth,
    improveEmployeeSkill
}) => {
    const [selectedEmployeeType, setSelectedEmployeeType] = useState('Developer');
    const [employeeAssignments, setEmployeeAssignments] = useState({});
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const activeProjects = projects && Array.isArray(projects) ? projects.filter(project => !project.shipped) : [];

    useEffect(() => {
        // Initialize employee assignments based on current projects
        if (projects && Array.isArray(projects)) {
            const initialAssignments = projects.reduce((acc, project) => {
                acc[project.id] = 0;
                return acc;
            }, {});
            setEmployeeAssignments(initialAssignments);
        }
    }, [projects]);

    const handleHireEmployee = () => {
        if (typeof hireEmployee === 'function') {
            const personality = getRandomPersonality(selectedEmployeeType);
            const personalityEffects = PERSONALITY_EFFECTS[personality] || {};
            hireEmployee(selectedEmployeeType, { personality, personalityEffects });
        }
    };

    const handleFireEmployee = (employeeId) => {
        if (typeof fireEmployee === 'function' && window.confirm('Are you sure you want to fire this employee?')) {
            fireEmployee(employeeId);
        }
    };

    const openEmployeeDetails = (employee) => {
        if (employee) {
            setSelectedEmployee(employee);
            setIsEmployeeModalOpen(true);
        }
    };

    const closeEmployeeDetails = () => {
        setIsEmployeeModalOpen(false);
    };

    const handleImproveSkill = (skillName) => {
        if (selectedEmployee && selectedEmployee.skillPoints > 0 && typeof improveEmployeeSkill === 'function') {
            improveEmployeeSkill(selectedEmployee.id, skillName);
            // Update the selected employee to show the changes
            setSelectedEmployee({
                ...selectedEmployee,
                skillPoints: selectedEmployee.skillPoints - 1,
                skills: {
                    ...selectedEmployee.skills,
                    [skillName]: (selectedEmployee.skills?.[skillName] || 0) + 1
                }
            });
        }
    };

    const renderSkillIcons = (employee) => {
        if (!employee || !employee.type || !employee.skills) return null;

        if (employee.type === 'Developer') {
            return (
                <>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCode} className="text-blue-500 mr-2" />
                        <span className="text-gray-800">Coding: {employee.skills.coding || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faWrench} className="text-green-500 mr-2" />
                        <span className="text-gray-800">Optimization: {employee.skills.optimization || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faBug} className="text-red-500 mr-2" />
                        <span className="text-gray-800">Debugging: {employee.skills.debugging || 0}</span>
                    </div>
                </>
            );
        } else if (employee.type === 'Designer') {
            return (
                <>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faPaintBrush} className="text-purple-500 mr-2" />
                        <span className="text-gray-800">Creativity: {employee.skills.creativity || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-indigo-500 mr-2" />
                        <span className="text-gray-800">User Experience: {employee.skills.userExperience || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faVial} className="text-pink-500 mr-2" />
                        <span className="text-gray-800">Visualization: {employee.skills.visualization || 0}</span>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faBullhorn} className="text-yellow-500 mr-2" />
                        <span className="text-gray-800">Social Media: {employee.skills.socialMedia || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faChartLine} className="text-orange-500 mr-2" />
                        <span className="text-gray-800">Advertising: {employee.skills.advertising || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faSearch} className="text-teal-500 mr-2" />
                        <span className="text-gray-800">Market Research: {employee.skills.marketResearch || 0}</span>
                    </div>
                </>
            );
        }
    };

    const renderSkillUpgradeButtons = () => {
        if (!selectedEmployee || !selectedEmployee.skillPoints || selectedEmployee.skillPoints <= 0) return null;

        if (selectedEmployee.type === 'Developer') {
            return (
                <div className="flex flex-col space-y-2 mt-4">
                    <button onClick={() => handleImproveSkill('coding')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Improve Coding
                    </button>
                    <button onClick={() => handleImproveSkill('optimization')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                        Improve Optimization
                    </button>
                    <button onClick={() => handleImproveSkill('debugging')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Improve Debugging
                    </button>
                </div>
            );
        } else if (selectedEmployee.type === 'Designer') {
            return (
                <div className="flex flex-col space-y-2 mt-4">
                    <button onClick={() => handleImproveSkill('creativity')} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">
                        Improve Creativity
                    </button>
                    <button onClick={() => handleImproveSkill('userExperience')} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded">
                        Improve User Experience
                    </button>
                    <button onClick={() => handleImproveSkill('visualization')} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-2 rounded">
                        Improve Visualization
                    </button>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col space-y-2 mt-4">
                    <button onClick={() => handleImproveSkill('socialMedia')} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                        Improve Social Media
                    </button>
                    <button onClick={() => handleImproveSkill('advertising')} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded">
                        Improve Advertising
                    </button>
                    <button onClick={() => handleImproveSkill('marketResearch')} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded">
                        Improve Market Research
                    </button>
                </div>
            );
        }
    };

    const countEmployeesInProject = (projectId) => {
        if (!employees || !Array.isArray(employees)) return 0;
        return employees.filter(emp => emp.projectId === projectId && emp.type === selectedEmployeeType).length;
    };

    const handleAddEmployeeToProject = (projectId) => {
        if (!employees || !Array.isArray(employees) || !assignToProject || typeof assignToProject !== 'function') return;
        
        // Get free employees of the selected type
        const freeEmployees = employees.filter(emp => emp.type === selectedEmployeeType && !emp.projectId);
        
        if (freeEmployees.length === 0) {
            alert(`No free ${selectedEmployeeType}s available.`);
            return;
        }
        
        // Assign the first free employee to the project
        const employeeToAssign = freeEmployees[0];
        assignToProject(employeeToAssign.id, projectId);
    };

    const handleRemoveEmployeeFromProject = (projectId) => {
        if (!employees || !Array.isArray(employees) || !assignToProject || typeof assignToProject !== 'function') return;
        
        // Get employees of the selected type assigned to this project
        const assignedEmployees = employees.filter(emp => emp.type === selectedEmployeeType && emp.projectId === projectId);
        
        if (assignedEmployees.length === 0) {
            alert(`No ${selectedEmployeeType}s assigned to this project.`);
            return;
        }
        
        // Remove the last assigned employee from the project
        const employeeToRemove = assignedEmployees[assignedEmployees.length - 1];
        assignToProject(employeeToRemove.id, null);
    };

    return (
        <>
            <div className="p-3">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-base font-bold text-gray-800">Employees</h2>
                    <div className="flex items-center space-x-2">
                        <select 
                            className="text-sm rounded border py-1 px-2 bg-white text-gray-800"
                            value={selectedEmployeeType}
                            onChange={(e) => setSelectedEmployeeType(e.target.value)}
                        >
                            <option value="Developer">Developers</option>
                            <option value="Designer">Designers</option>
                            <option value="Marketer">Marketers</option>
                        </select>
                        <button 
                            onClick={handleHireEmployee} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-1" />
                            Hire
                        </button>
                    </div>
                </div>
                
                {employees.length === 0 ? (
                    <div className="text-center py-3 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 text-sm">No employees yet. Hire some staff!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2">
                        {employees
                            .filter(employee => employee.type === selectedEmployeeType)
                            .map(employee => (
                                <div 
                                    key={employee.id} 
                                    className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                                    onClick={() => openEmployeeDetails(employee)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                                            {employee.personality && (
                                                <div className="text-xs text-gray-600 mt-0.5">
                                                    {employee.personality}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-xs font-medium px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                                            {employee.type}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-700 mt-1 space-y-1">
                                        {renderSkillIcons(employee)}

                                        <div className="mt-1 flex justify-between items-center">
                                            <div className="text-gray-800 space-x-1">
                                                {employee.skillPoints > 0 && (
                                                    <span className="bg-yellow-100 text-yellow-800 px-1 rounded">
                                                        {employee.skillPoints} skill points
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-gray-800">
                                                {employee.projectId ? (
                                                    <div className="flex items-center">
                                                        <span className="mr-1">Assigned to:</span>
                                                        <span className="font-medium text-blue-600">
                                                            {projects.find(p => p.id === employee.projectId)?.name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-green-600">Available</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
                
                {activeProjects.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-2">Project Assignments</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {activeProjects.map(project => (
                                <div key={project.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                                    <div className="text-sm text-gray-800">{project.name}</div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-700">
                                            {countEmployeesInProject(project.id)} {selectedEmployeeType}(s)
                                        </span>
                                        <button 
                                            onClick={() => handleRemoveEmployeeFromProject(project.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white rounded-full h-5 w-5 flex items-center justify-center"
                                            title={`Remove ${selectedEmployeeType}`}
                                        >
                                            <FontAwesomeIcon icon={faMinus} className="text-xs" />
                                        </button>
                                        <button 
                                            onClick={() => handleAddEmployeeToProject(project.id)}
                                            className="bg-green-500 hover:bg-green-700 text-white rounded-full h-5 w-5 flex items-center justify-center"
                                            title={`Add ${selectedEmployeeType}`}
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <Modal
                    isOpen={isEmployeeModalOpen}
                    onRequestClose={closeEmployeeDetails}
                    contentLabel="Employee Details"
                    className="bg-white rounded-lg p-4 mx-auto my-10 border max-w-md shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    ariaHideApp={false}
                >
                    {selectedEmployee && (
                        <>
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-bold text-gray-800">{selectedEmployee.name}</h2>
                                <button className="text-gray-500 hover:text-gray-700" onClick={closeEmployeeDetails}>×</button>
                            </div>
                            
                            <div className="text-sm text-gray-800 mb-2">
                                <div>{selectedEmployee.type}</div>
                                <div>Experience: {selectedEmployee.experience || 0} years</div>
                                <div>Skill Points: {selectedEmployee.skillPoints || 0}</div>
                                {selectedEmployee.personality && (
                                    <div className="mt-1 flex items-center">
                                        <span className="font-semibold mr-2">Personality:</span>
                                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                            {selectedEmployee.personality}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 text-sm">
                                <h3 className="font-bold text-gray-700 mb-1">Skills</h3>
                                <div className="space-y-1">
                                    {renderSkillIcons(selectedEmployee)}
                                </div>
                            </div>

                            {selectedEmployee.skillPoints > 0 && (
                                <div className="mt-2">
                                    <h3 className="font-bold text-gray-700 mb-1">Improve Skills</h3>
                                    {renderSkillUpgradeButtons()}
                                </div>
                            )}

                            {selectedEmployee.personalityEffects && Object.keys(selectedEmployee.personalityEffects).length > 0 && (
                                <div className="mt-2 text-sm">
                                    <h3 className="font-bold text-gray-700 mb-1">Personality Effects</h3>
                                    <ul className="list-disc list-inside text-xs text-gray-700">
                                        {Object.entries(selectedEmployee.personalityEffects).map(([key, value]) => (
                                            <li key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => {
                                        handleFireEmployee(selectedEmployee.id);
                                        closeEmployeeDetails();
                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                                >
                                    Fire Employee
                                </button>
                            </div>
                        </>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default EmployeeComponent;