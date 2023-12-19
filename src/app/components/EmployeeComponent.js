import React, { useState, useEffect } from 'react';

const EmployeeComponent = ({
    employees,
    hireEmployee,
    fireEmployee,
    assignToProject,
    projects,
    spreadEmployees
}) => {
    const [selectedEmployeeType, setSelectedEmployeeType] = useState('Developer');
    const [freeEmployees, setFreeEmployees] = useState([]);
    const [sliderValues, setSliderValues] = useState({});

    useEffect(() => {
        setFreeEmployees(employees.filter(emp => emp.type === selectedEmployeeType && !emp.projectId));
        initializeSliderValues();
    }, [employees, selectedEmployeeType, projects]);

    const employeeTypes = ['Developer', 'Designer', 'Marketeer'];

    const initializeSliderValues = () => {
        const initialSliderValues = {};
        projects.forEach(project => {
            initialSliderValues[project.id] = 0;
        });
        setSliderValues(initialSliderValues);
    };

    const handleHireEmployee = () => {
        hireEmployee(selectedEmployeeType);
    };

    const handleFireEmployee = (employeeId) => {
        fireEmployee(employeeId);
    };

    const handleAssignToProject = (employeeId, projectId) => {
        assignToProject(employeeId, projectId);
    };

    const handleSpreadEmployees = () => {
        // Placeholder for spreadEmployees function
        // spreadEmployees(selectedEmployeeType, projects);
        console.error('spreadEmployees function needs to be implemented');
    };

    const handleSliderChange = (projectId, value) => {
        setSliderValues(prevValues => ({ ...prevValues, [projectId]: value }));
        // Here, you would implement logic to reassign employees based on the new slider values
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {employeeTypes.map(type => (
                    <li key={type} className="me-2">
                        <button
                            onClick={() => setSelectedEmployeeType(type)}
                            className={`inline-block p-4 rounded-t-lg ${selectedEmployeeType === type ? 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}
                        >
                            {type}s
                        </button>
                    </li>
                ))}
            </ul>

            <div className="p-3 bg-white rounded-b-lg shadow-md">
                <h3 className="font-bold">{selectedEmployeeType}s</h3>
                <p>Available: {freeEmployees.length}</p>
                <button onClick={handleHireEmployee} className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded">
                    Hire {selectedEmployeeType}
                </button>
                <button onClick={handleSpreadEmployees} className="bg-green-500 text-white hover:bg-green-700 font-bold py-2 px-4 rounded ml-2">
                    Spread Free {selectedEmployeeType}s
                </button>

                {/* Projects list and sliders */}
                {projects.map((project) => (
                    <div key={project.id} className="mt-4">
                        <h4 className="font-bold">{project.name}</h4>
                        <input
                            type="range"
                            min="0"
                            max={freeEmployees.length}
                            value={sliderValues[project.id]}
                            onChange={(e) => handleSliderChange(project.id, e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <p className="text-xs mt-2">Assign {selectedEmployeeType}s: {sliderValues[project.id]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeComponent;
