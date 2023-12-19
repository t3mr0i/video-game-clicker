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

    const spreadEmployees = () => {
        // Filter out free employees of the selected type
        const freeEmployees = employees.filter(emp => emp.type === selectedEmployeeType && !emp.projectId);

        // Distribute these employees evenly across projects
        const assignments = distributeEmployees(freeEmployees, projects);

        // Assign the employees to the projects
        assignments.forEach(({ projectId, employeeIds }) => {
            // Assign each employee to the project
            employeeIds.forEach(employeeId => {
                assignToProject(employeeId, projectId);
            });
        });

        // Update the UI to reflect these new assignments
        updateUIWithNewAssignments(assignments);
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

    const totalEmployees = employees.filter(emp => emp.type === selectedEmployeeType).length;
    const freeEmployees = employees.filter(emp => emp.type === selectedEmployeeType && !emp.projectId).length;

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex mb-4 border-b">
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

            <div className="flex justify-between mb-4">
                <div>Total {selectedEmployeeType}s: {totalEmployees}</div>
                <div>Free {selectedEmployeeType}s: {freeEmployees}</div>
                <button onClick={handleHireEmployee} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Hire Employee
                </button>
                <button onClick={spreadEmployees} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Spread Employees
                </button>
            </div>

            {/* Projects list with sliders */}
            {projects.map((project) => (
                <div key={project.id} className="bg-white p-3 rounded-lg shadow-md mb-2">
                    <div className="flex justify-between items-center">
                        <p>{project.name}</p>
                        <div className="flex items-center">
                            <button
                                onClick={() => handleDecrement(project.id)}
                                className="text-sm bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded mr-2">
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>{employeeAssignments[project.id] || 0}</span>
                            <button
                                onClick={() => handleIncrement(project.id)}
                                className="text-sm bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-2 rounded ml-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeComponent;
