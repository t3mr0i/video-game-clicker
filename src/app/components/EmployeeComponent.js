import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faStar, faCode, faWrench, faBug, faPaintBrush, faUser, faChartLine, faVial, faBullhorn, faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

const EmployeeComponent = ({
    employees,
    hireEmployee,
    fireEmployee,
    assignToProject,
    projects,
    currentYear,
    currentMonth,
    improveEmployeeSkill
}) => {
    const [selectedEmployeeType, setSelectedEmployeeType] = useState('Developer');
    const [employeeAssignments, setEmployeeAssignments] = useState({});
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const activeProjects = projects.filter(project => !project.shipped);

    useEffect(() => {
        // Initialize employee assignments based on current projects
        const initialAssignments = projects.reduce((acc, project) => {
            acc[project.id] = 0;
            return acc;
        }, {});
        setEmployeeAssignments(initialAssignments);
    }, [projects]);

    const handleHireEmployee = () => {
        hireEmployee(selectedEmployeeType);
    };

    const handleFireEmployee = (employeeId) => {
        if (window.confirm('Are you sure you want to fire this employee?')) {
            fireEmployee(employeeId);
        }
    };

    const openEmployeeDetails = (employee) => {
        setSelectedEmployee(employee);
        setIsEmployeeModalOpen(true);
    };

    const closeEmployeeDetails = () => {
        setIsEmployeeModalOpen(false);
    };

    const handleImproveSkill = (skillName) => {
        if (selectedEmployee && selectedEmployee.skillPoints > 0) {
            improveEmployeeSkill(selectedEmployee.id, skillName);
            // Update the selected employee to show the changes
            setSelectedEmployee({
                ...selectedEmployee,
                skillPoints: selectedEmployee.skillPoints - 1,
                skills: {
                    ...selectedEmployee.skills,
                    [skillName]: selectedEmployee.skills[skillName] + 1
                }
            });
        }
    };

    const renderSkillIcons = (employee) => {
        if (employee.type === 'Developer') {
            return (
                <>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCode} className="text-blue-500 mr-2" />
                        <span>Coding: {employee.skills.coding}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faWrench} className="text-green-500 mr-2" />
                        <span>Optimization: {employee.skills.optimization}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faBug} className="text-red-500 mr-2" />
                        <span>Debugging: {employee.skills.debugging}</span>
                    </div>
                </>
            );
        } else if (employee.type === 'Designer') {
            return (
                <>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faPaintBrush} className="text-purple-500 mr-2" />
                        <span>Creativity: {employee.skills.creativity}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-indigo-500 mr-2" />
                        <span>User Experience: {employee.skills.userExperience}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faVial} className="text-pink-500 mr-2" />
                        <span>Visualization: {employee.skills.visualization}</span>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faBullhorn} className="text-yellow-500 mr-2" />
                        <span>Social Media: {employee.skills.socialMedia}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faChartLine} className="text-orange-500 mr-2" />
                        <span>Advertising: {employee.skills.advertising}</span>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faSearch} className="text-teal-500 mr-2" />
                        <span>Market Research: {employee.skills.marketResearch}</span>
                    </div>
                </>
            );
        }
    };

    const renderSkillUpgradeButtons = () => {
        if (!selectedEmployee || selectedEmployee.skillPoints <= 0) return null;

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
        return employees.filter(emp => emp.projectId === projectId && emp.type === selectedEmployeeType).length;
    };

    const handleSliderChange = (projectId, value) => {
        // Filter out free employees of the selected type
        const freeEmployees = employees.filter(emp => emp.type === selectedEmployeeType && !emp.projectId);

        // Randomly select employees to assign, up to the number indicated by the slider value
        const employeesToAssign = getRandomEmployees(freeEmployees, Number(value));

        // Get the IDs of the selected employees
        const employeeIdsToAssign = employeesToAssign.map(emp => emp.id);

        // Assign the selected employees to the project
        assignToProject(projectId, employeeIdsToAssign);
    };

    // Utility function to randomly select a given number of employees
    const getRandomEmployees = (employees, count) => {
        // Shuffle the array of employees
        const shuffled = employees.sort(() => 0.5 - Math.random());

        // Return the first 'count' employees from the shuffled array
        return shuffled.slice(0, count);
    };

    // Utility function to distribute employees evenly across projects
    const distributeEmployees = (employees, projects) => {
        let assignments = projects.map(project => ({ projectId: project.id, employeeIds: [] }));
        let currentIndex = 0;

        employees.forEach(employee => {
            assignments[currentIndex].employeeIds.push(employee.id);
            currentIndex = (currentIndex + 1) % projects.length; // Move to the next project, loop back to the first if necessary
        });

        return assignments;
    };

    // Utility function to update the UI with new assignments
    const updateUIWithNewAssignments = (assignments) => {
        const newAssignments = assignments.reduce((acc, assignment) => {
            acc[assignment.projectId] = assignment.employeeIds.length;
            return acc;
        }, {});

        setEmployeeAssignments(newAssignments);
    };

    const handleIncrement = (projectId) => {
        setEmployeeAssignments(prev => ({
            ...prev,
            [projectId]: Math.min(prev[projectId] + 1, freeEmployees)
        }));
    };

    const handleDecrement = (projectId) => {
        setEmployeeAssignments(prev => ({
            ...prev,
            [projectId]: Math.max(prev[projectId] - 1, 0)
        }));
    };

    const handleAssignRemove = (projectId, isAssigning) => {
        const freeEmployee = employees.find(emp => emp.type === selectedEmployeeType && !emp.projectId);
        if (isAssigning && freeEmployee) {
            assignToProject(freeEmployee.id, projectId);
        } else if (!isAssigning) {
            const assignedEmployee = employees.find(emp => emp.type === selectedEmployeeType && emp.projectId === projectId);
            if (assignedEmployee) {
                assignToProject(assignedEmployee.id, null);
            }
        }
    };

    const spreadEmployees = () => {
        const freeEmployeeIds = employees
            .filter(emp => emp.type === selectedEmployeeType && !emp.projectId)
            .map(emp => emp.id);

        projects.forEach((project, index) => {
            if (freeEmployeeIds[index]) {
                assignToProject(freeEmployeeIds[index], project.id);
            }
        });
    };

    const handleAddEmployeeToProject = (projectId) => {
        const freeEmployee = employees.find(emp => emp.type === selectedEmployeeType && !emp.projectId);
        if (freeEmployee) {
            assignToProject(projectId, freeEmployee.id);
        }
    };

    const handleRemoveEmployeeFromProject = (projectId) => {
        const assignedEmployee = employees.find(emp => emp.projectId === projectId && emp.type === selectedEmployeeType);
        if (assignedEmployee) {
            assignToProject(null, assignedEmployee.id);
        }
    };

    const totalEmployees = employees.filter(emp => emp.type === selectedEmployeeType).length;
    const freeEmployees = employees.filter(emp => emp.type === selectedEmployeeType && !emp.projectId).length;

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-800">
            <div className="flex mb-4 border-b text-gray-800">
                <button
                    onClick={() => setSelectedEmployeeType('Developer')}
                    className={`flex-1 py-2 ${selectedEmployeeType === 'Developer' ? 'text-blue-600 border-b-2 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Developer
                </button>
                <button
                    onClick={() => setSelectedEmployeeType('Designer')}
                    className={`flex-1 py-2 ${selectedEmployeeType === 'Designer' ? 'text-blue-600 border-b-2 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Designer
                </button>
                <button
                    onClick={() => setSelectedEmployeeType('Marketer')}
                    className={`flex-1 py-2 ${selectedEmployeeType === 'Marketer' ? 'text-blue-600 border-b-2 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Marketer
                </button>
            </div>

            {/* Employee Count Box */}
            <div className="bg-white p-3 rounded-lg shadow-md mb-4 flex">
                <div className="text-sm">
                    <p>Total {selectedEmployeeType}s: {totalEmployees}</p>
                    <p>Free {selectedEmployeeType}s: {freeEmployees}</p>
                </div>
                <button onClick={handleHireEmployee} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-5 mr-3 rounded">
                    Hire Employee
                </button>
            </div>

            {/* Employee List */}
            <div className="bg-white p-3 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold mb-2">Employee Roster</h3>
                <div className="space-y-2">
                    {employees.filter(emp => emp.type === selectedEmployeeType).map(employee => (
                        <div key={employee.id} className="border p-2 rounded flex justify-between items-center">
                            <div className="flex-1">
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm">
                                    <span className="mr-4">Level {employee.level}</span>
                                    <span>
                                        {employee.projectId 
                                            ? `Working on: ${projects.find(p => p.id === employee.projectId)?.name || 'Unknown Project'}`
                                            : 'Unassigned'
                                        }
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                    <div 
                                        className="bg-blue-600 h-1.5 rounded-full" 
                                        style={{ width: `${(employee.experience / employee.experienceToNextLevel * 100)}%` }}
                                        title={`Experience: ${employee.experience}/${employee.experienceToNextLevel}`}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => openEmployeeDetails(employee)}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                </button>
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleFireEmployee(employee.id)}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 text-black lg:grid-cols-3 gap-4 text-gray-800">
                {activeProjects.map(project => (
                    <div key={project.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h5 className="text-xl font-bold text-black mb-2">Project: {project.name}</h5>
                        <div className="flex flex-col text-black items-center mb-4">
                            <button
                                onClick={() => handleAddEmployeeToProject(project.id)}
                                className="bg-green-500 hover:bg-green-700 text-black font-bold py-1 px-2 rounded mb-2"
                                disabled={freeEmployees === 0}
                                title={freeEmployees === 0 ? "No free employees available" : "Add employee to project"}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <span className="text-sm mb-2">Assigned: {countEmployeesInProject(project.id)}</span>
                            <button
                                onClick={() => handleRemoveEmployeeFromProject(project.id)}
                                className="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-2 rounded"
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Employee Details Modal */}
            <Modal 
                isOpen={isEmployeeModalOpen} 
                onRequestClose={closeEmployeeDetails}
                className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-xl shadow-lg"
            >
                {selectedEmployee && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">{selectedEmployee.name}</h2>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg">{selectedEmployee.type}</span>
                            <span className="text-lg">Level {selectedEmployee.level}</span>
                        </div>
                        
                        <div className="bg-gray-100 p-3 rounded mb-4">
                            <div className="flex justify-between mb-1">
                                <span>Experience</span>
                                <span>{selectedEmployee.experience}/{selectedEmployee.experienceToNextLevel}</span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2.5">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${(selectedEmployee.experience / selectedEmployee.experienceToNextLevel * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Skills</h3>
                            <div className="bg-gray-100 p-3 rounded space-y-2">
                                {renderSkillIcons(selectedEmployee)}
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Stats</h3>
                            <div className="bg-gray-100 p-3 rounded space-y-2">
                                <div>Productivity: {selectedEmployee.productivity.toFixed(2)}</div>
                                <div>Morale: {selectedEmployee.morale}%</div>
                                <div>Salary: ${selectedEmployee.salary.toFixed(2)}</div>
                            </div>
                        </div>
                        
                        {selectedEmployee.skillPoints > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">
                                    Skill Points Available: <span className="text-green-600">{selectedEmployee.skillPoints}</span>
                                </h3>
                                {renderSkillUpgradeButtons()}
                            </div>
                        )}
                        
                        <button 
                            onClick={closeEmployeeDetails}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                        >
                            Close
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EmployeeComponent;