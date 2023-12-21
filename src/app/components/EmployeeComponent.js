import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EmployeeComponent = ({
    employees,
    hireEmployee,
    fireEmployee,
    assignToProject,
    projects,
    currentYear,
    currentMonth
}) => {
    const [selectedEmployeeType, setSelectedEmployeeType] = useState('Developer');
    const [employeeAssignments, setEmployeeAssignments] = useState({});
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
        fireEmployee(employeeId);
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
        </div>
    );
};

export default EmployeeComponent;