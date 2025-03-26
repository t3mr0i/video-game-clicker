import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faStar, faCode, faWrench, faBug, faPaintBrush, faUser, faChartLine, faVial, faBullhorn, faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

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
            hireEmployee(selectedEmployeeType);
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
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Employees</h2>
                <div className="flex justify-between items-center">
                    <div className="tab-container flex border-b border-gray-300 mb-4">
                        <button
                            className={`py-2 px-4 mr-2 ${selectedEmployeeType === 'Developer' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-700'}`}
                            onClick={() => setSelectedEmployeeType('Developer')}
                        >
                            Developer
                        </button>
                        <button
                            className={`py-2 px-4 mr-2 ${selectedEmployeeType === 'Designer' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-700'}`}
                            onClick={() => setSelectedEmployeeType('Designer')}
                        >
                            Designer
                        </button>
                        <button
                            className={`py-2 px-4 ${selectedEmployeeType === 'Marketer' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-700'}`}
                            onClick={() => setSelectedEmployeeType('Marketer')}
                        >
                            Marketer
                        </button>
                    </div>
                    <button
                        onClick={handleHireEmployee}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                    >
                        Hire Employee
                    </button>
                </div>
            </div>

            <div className="employee-roster">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Employee Roster</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {employees.filter(employee => employee.type === selectedEmployeeType).map(employee => (
                        <div key={employee.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-semibold text-gray-800">{employee.name}</h4>
                                    <p className="text-sm text-gray-600">{employee.type}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleFireEmployee(employee.id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Fire Employee"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>
                            
                            <div className="text-sm space-y-1 mb-2">
                                {renderSkillIcons(employee)}
                                {employee.skillPoints > 0 && (
                                    <div className="mt-1 text-blue-600 font-semibold">
                                        Skill Points Available: {employee.skillPoints}
                                    </div>
                                )}
                            </div>
                            
                            {employee.projectId ? (
                                <div className="mt-2 text-sm">
                                    <span className="text-gray-700 font-medium">Assigned to:</span> 
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-1">
                                        {projects.find(p => p.id === employee.projectId)?.name || 'Unknown Project'}
                                    </span>
                                </div>
                            ) : (
                                <div className="mt-2 text-sm text-gray-500 italic">Available for assignment</div>
                            )}
                            
                            <div className="mt-2 flex justify-between">
                                <button
                                    onClick={() => openEmployeeDetails(employee)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                                >
                                    Details
                                </button>
                                {employee.skillPoints > 0 && (
                                    <button
                                        onClick={() => openEmployeeDetails(employee)}
                                        className="bg-purple-500 hover:bg-purple-700 text-white text-xs py-1 px-2 rounded"
                                    >
                                        Improve Skills
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {employees.filter(employee => employee.type === selectedEmployeeType).length === 0 && (
                        <div className="col-span-full text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500">No {selectedEmployeeType}s hired yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {activeProjects.length > 0 && (
                <div className="project-assignment mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Assignments</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeProjects.map(project => (
                            <div key={project.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                                <h4 className="font-semibold text-gray-800">{project.name}</h4>
                                <div className="text-sm text-gray-600 mb-2">
                                    <span className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mt-1 text-gray-800">{project.platform}</span>
                                    <span className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mt-1 text-gray-800">{project.genre}</span>
                                </div>
                                
                                <div className="flex items-center justify-between mt-3">
                                    <div className="text-sm text-gray-800">
                                        <span className="font-medium">{countEmployeesInProject(project.id)}</span> {selectedEmployeeType}(s) assigned
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleAddEmployeeToProject(project.id)}
                                            className="bg-green-500 hover:bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center"
                                            title={`Add ${selectedEmployeeType}`}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <button 
                                            onClick={() => handleRemoveEmployeeFromProject(project.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center"
                                            title={`Remove ${selectedEmployeeType}`}
                                            disabled={countEmployeesInProject(project.id) === 0}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Employee Details Modal */}
            <Modal
                isOpen={isEmployeeModalOpen}
                onRequestClose={closeEmployeeDetails}
                contentLabel="Employee Details"
                className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-md"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                {selectedEmployee && (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">{selectedEmployee.name}</h2>
                            <button onClick={closeEmployeeDetails} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-medium">Type:</span> {selectedEmployee.type}</p>
                            <p className="text-gray-700"><span className="font-medium">Experience:</span> {selectedEmployee.experience || 0} XP</p>
                            {selectedEmployee.projectId && (
                                <p className="text-gray-700">
                                    <span className="font-medium">Assigned to:</span> {projects.find(p => p.id === selectedEmployee.projectId)?.name || 'Unknown'}
                                </p>
                            )}
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
                            <div className="space-y-2">
                                {renderSkillIcons(selectedEmployee)}
                            </div>
                        </div>
                        
                        {selectedEmployee.skillPoints > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Skill Points Available: {selectedEmployee.skillPoints}
                                </h3>
                                {renderSkillUpgradeButtons()}
                            </div>
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
};

export default EmployeeComponent;