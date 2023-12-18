import React, { useState } from 'react';

const EmployeeComponent = ({ employees, hireEmployee, fireEmployee, assignToProject, projects }) => {
    const [selectedEmployeeType, setSelectedEmployeeType] = useState('Developer');
    const [selectedProjectId, setSelectedProjectId] = useState(projects.length > 0 ? projects[0].id : '');

    const handleHireEmployee = () => {
        hireEmployee(selectedEmployeeType);
    };

    const handleFireEmployee = (employeeId) => {
        fireEmployee(employeeId);
    };

    const handleAssignToProject = (employeeId, projectId) => {
        console.log(employeeId, projectId)
        assignToProject(employeeId, projectId);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
                <select onChange={(e) => setSelectedEmployeeType(e.target.value)} className="p-2 border text-black border-gray-300 rounded-md">
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Marketeer">Marketeer</option>
                </select>
                <button onClick={handleHireEmployee} className="bg-blue-500 text-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Hire Employee
                </button>
            </div>

            {employees.map((employee, index) => (
                <div key={index} className="bg-white p-3  text-black rounded-lg shadow-md mb-2">
                    <p className="bg-white p-3  text-black rounded-lg shadow-md mb-2 font-bold">{employee.type}</p>
                    <p className="bg-white p-3  text-black rounded-lg shadow-md mb-2">Assigned to: {employee.projectId ? projects.find(p => p.id === employee.projectId).name : 'None'}</p>
                    <div className="flex justify-between items-center">
                        <select defaultValue={'---'} placeholder={"---"}

                            onChange={(e) => setSelectedProjectId(e.target.value)} className="p-2 border text-black border-gray-300 rounded-md">
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
                            ))}
                        </select>
                        <button onClick={() => handleAssignToProject(employee.id, selectedProjectId)} className="mr-2 bg-green-500 text-black hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                            Assign
                        </button>
                        <button onClick={() => handleFireEmployee(employee.id)} className="bg-red-500 text-black hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                            Fire
                        </button>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default EmployeeComponent;
