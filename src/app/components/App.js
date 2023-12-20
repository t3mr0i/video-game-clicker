import React, { useState, useEffect } from 'react';
import TimeComponent from './TimeComponent';
import ProjectComponent from './ProjectComponent';
import EmployeeComponent from './EmployeeComponent';
import FinanceComponent from './FinanceComponent';
import ShippingComponent from './ShippingComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // Initialize state with default values
    const [currentYear, setCurrentYear] = useState(1985);
    const [currentMonth, setCurrentMonth] = useState(1);
    const [currentWeek, setCurrentWeek] = useState(1);
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [bankAccount, setBankAccount] = useState(10000); // Initialize with some starting value
    const [salaryCosts, setSalaryCosts] = useState(0); // Initialize with some starting value

    // Function to safely get values from local storage
    const safeLocalStorageGet = (key, defaultValue) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const stored = localStorage.getItem(key);
            if (stored) {
                return JSON.parse(stored);
            }
        }
        return defaultValue;
    };

    // Use useEffect to set state from local storage once component mounts
    useEffect(() => {
        setCurrentYear(safeLocalStorageGet('currentYear', 1985));
        setCurrentMonth(safeLocalStorageGet('currentMonth', 1));
        setEmployees(safeLocalStorageGet('employees', []));
        setProjects(safeLocalStorageGet('projects', []));
        setPublishers(safeLocalStorageGet('publishers', []));
    }, []);

    // Update local storage whenever state changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('currentYear', JSON.stringify(currentYear));
            localStorage.setItem('currentMonth', JSON.stringify(currentMonth));
            localStorage.setItem('employees', JSON.stringify(employees));
            localStorage.setItem('projects', JSON.stringify(projects));
            localStorage.setItem('publishers', JSON.stringify(publishers));
        }
    }, [currentYear, currentMonth, employees, projects]);


    const [publishers, setPublishers] = useState([
        { name: 'Sony Interactive Entertainment', reputation: 0.9, dealHistory: [], imageName: 'PS.PNG' },
        { name: 'Microsoft Gaming', reputation: 0.85, dealHistory: [], imageName: 'XBOX.PNG' },
        { name: 'Apple', reputation: 0.8, dealHistory: [], imageName: 'APPLE.PNG' },
        { name: 'Nintendo', reputation: 0.9, dealHistory: [], imageName: 'NINTENDO.PNG' },
        { name: 'Electronic Arts', reputation: 0.75, dealHistory: [], imageName: 'EA.PNG' },
        { name: 'NetEase', reputation: 0.7, dealHistory: [], imageName: 'NETEASE.PNG' },
        { name: 'Take-Two Interactive', reputation: 0.75, dealHistory: [], imageName: 'TAKETWO.PNG' },
        { name: 'Embracer Group', reputation: 0.65, dealHistory: [], imageName: 'EMBRACER.PNG' },
        { name: 'Bandai Namco Entertainment', reputation: 0.8, dealHistory: [], imageName: 'BANDAI.PNG' },
        { name: 'Square Enix', reputation: 0.8, dealHistory: [], imageName: 'SQUARE_ENIX.PNG' },
        { name: 'Nexon', reputation: 0.7, dealHistory: [], imageName: 'NEXON.PNG' },
        { name: 'Ubisoft', reputation: 0.75, dealHistory: [], imageName: 'UBISOFT.PNG' },
        { name: 'Konami', reputation: 0.7, dealHistory: [], imageName: 'KONAMI.PNG' },
        { name: 'Sega', reputation: 0.75, dealHistory: [], imageName: 'SEGA.PNG' },
        { name: 'Wizards of the Coast', reputation: 0.7, dealHistory: [], imageName: 'WIZARD.PNG' },
        { name: 'Capcom', reputation: 0.8, dealHistory: [], imageName: 'CAPCOM.PNG' },
        { name: 'Psygnosis', reputation: 0.6, dealHistory: [], imageName: 'PSYGNOSIS.PNG' },
        { name: 'Tiger Entertainment', reputation: 0.6, dealHistory: [], imageName: 'TIGER.PNG' }
    ]);

    const [currentOffers, setCurrentOffers] = useState([]);
    const [platforms, setPlatforms] = useState([{ name: 'NES', releaseYear: 1985, power: 5, difficulty: 3 },
    { name: 'SNES', releaseYear: 1990, power: 7, difficulty: 4 },
    { name: 'N64', releaseYear: 1996, power: 8, difficulty: 5 },
    { name: 'Game Boy', releaseYear: 1989, power: 3, difficulty: 2 },
    { name: 'Game Boy Color', releaseYear: 1998, power: 4, difficulty: 3 },
    { name: 'Game Boy Advance', releaseYear: 2001, power: 5, difficulty: 3 },
    { name: 'Sega Genesis', releaseYear: 1989, power: 6, difficulty: 4 },
    { name: 'Sega Saturn', releaseYear: 1994, power: 7, difficulty: 5 },
    { name: 'Sega Dreamcast', releaseYear: 1998, power: 8, difficulty: 6 },
    { name: 'PlayStation', releaseYear: 1994, power: 7, difficulty: 4 },
    { name: 'PlayStation 2', releaseYear: 2000, power: 9, difficulty: 5 },
    { name: 'PlayStation 3', releaseYear: 2006, power: 11, difficulty: 7 },
    { name: 'PlayStation 4', releaseYear: 2013, power: 13, difficulty: 6 },
    { name: 'PlayStation 5', releaseYear: 2020, power: 16, difficulty: 5 },
    { name: 'Xbox', releaseYear: 2001, power: 10, difficulty: 6 },
    { name: 'Xbox 360', releaseYear: 2005, power: 12, difficulty: 6 },
    { name: 'Xbox One', releaseYear: 2013, power: 14, difficulty: 5 },
    { name: 'Xbox Series X', releaseYear: 2020, power: 17, difficulty: 4 },
    { name: 'Atari 2600', releaseYear: 1977, power: 2, difficulty: 2 },
    { name: 'Atari Lynx', releaseYear: 1989, power: 4, difficulty: 3 },
    { name: 'Neo Geo', releaseYear: 1990, power: 9, difficulty: 7 },
    { name: 'TurboGrafx-16', releaseYear: 1987, power: 6, difficulty: 5 },
    { name: 'GameCube', releaseYear: 2001, power: 8, difficulty: 5 },
    { name: 'Wii', releaseYear: 2006, power: 7, difficulty: 4 },
    { name: 'Wii U', releaseYear: 2012, power: 9, difficulty: 4 },
    { name: 'Switch', releaseYear: 2017, power: 10, difficulty: 4 },
    { name: 'Sega Master System', releaseYear: 1985, power: 4, difficulty: 3 },
    { name: 'Sega CD', releaseYear: 1992, power: 7, difficulty: 5 },
    { name: 'Atari Jaguar', releaseYear: 1993, power: 6, difficulty: 6 },
    { name: 'Gizmondo', releaseYear: 2005, power: 3, difficulty: 9 },
    { name: '3DO Interactive Multiplayer', releaseYear: 1993, power: 7, difficulty: 6 },
    { name: 'Vectrex', releaseYear: 1982, power: 3, difficulty: 3 },
    { name: 'Intellivision', releaseYear: 1979, power: 3, difficulty: 3 },
    { name: 'ColecoVision', releaseYear: 1982, power: 3, difficulty: 3 },
    { name: 'Amiga CD32', releaseYear: 1993, power: 6, difficulty: 5 },
    { name: 'Virtual Boy', releaseYear: 1995, power: 3, difficulty: 9 },
    { name: 'WonderSwan', releaseYear: 1999, power: 4, difficulty: 5 },
    { name: 'TurboExpress', releaseYear: 1990, power: 3, difficulty: 6 },
    { name: 'Ouya', releaseYear: 2013, power: 4, difficulty: 4 },
    { name: 'N-Gage', releaseYear: 2003, power: 4, difficulty: 4 },
    { name: 'Tapwave Zodiac', releaseYear: 2003, power: 3, difficulty: 4 },
    { name: 'Sega 32X', releaseYear: 1994, power: 7, difficulty: 6 },]); // Initialize this with your platform data
    const [genres, setGenres] = useState([{ name: 'Action', popularity: 8, complexity: 3 },
    { name: 'Adventure', popularity: 7, complexity: 2 },
    { name: 'Strategy', popularity: 7, complexity: 4 },
    { name: 'Simulation', popularity: 6, complexity: 3 },
    { name: 'RPG', popularity: 9, complexity: 5 },
    { name: 'Sports', popularity: 7, complexity: 3 },
    { name: 'Puzzle', popularity: 6, complexity: 2 },
    { name: 'Shooter', popularity: 8, complexity: 4 },
    { name: 'Platformer', popularity: 7, complexity: 3 },
    { name: 'Racing', popularity: 7, complexity: 3 },
    { name: 'Fighting', popularity: 8, complexity: 4 },
    { name: 'Horror', popularity: 8, complexity: 4 },
    { name: 'Survival', popularity: 8, complexity: 4 },
    { name: 'Stealth', popularity: 7, complexity: 3 },
    { name: 'Open World', popularity: 9, complexity: 5 },
    { name: 'Music', popularity: 6, complexity: 3 },
    { name: 'Educational', popularity: 5, complexity: 2 },
    { name: 'Casual', popularity: 6, complexity: 2 },
    { name: 'Visual Novel', popularity: 7, complexity: 3 },
    { name: 'Simulation', popularity: 6, complexity: 3 },
    { name: 'Tycoon', popularity: 7, complexity: 4 },
    { name: 'Management', popularity: 7, complexity: 4 },
    { name: 'Tactical', popularity: 8, complexity: 4 },
    { name: 'Card Game', popularity: 6, complexity: 3 },
    { name: 'Board Game', popularity: 6, complexity: 2 },
    ]);
    const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
    const [selectedProjectForShipping, setSelectedProjectForShipping] = useState(null);

    const openShippingModal = (projectId) => {
        setSelectedProjectForShipping(projects.find(p => p.id === projectId));
        setIsShippingModalOpen(true);
    };

    const closeShippingModal = () => {
        setIsShippingModalOpen(false);
        setSelectedProjectForShipping(null);
    };

    const addNotification = (message, type) => {
        toast(message, { type });
    };

    function hireEmployee(type) {
        const newEmployee = {
            id: generateUniqueId(),
            type: type,
            salary: 2500, // Example fixed salary
            startYear: currentYear,
            startMonth: currentMonth,
            projectId: null,
        };
        setEmployees([...employees, newEmployee]);

        setSalaryCosts(prevSalaryCosts => prevSalaryCosts + newEmployee.salary);

    }

    const [projectSalesData, setProjectSalesData] = useState({
        'projectId1': [100, 90, 80, 70, 60, 50] // Weekly sales data for a project
    });

    // Function to fire an employee
    const fireEmployee = (employeeId) => {
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeId));
    };


    const assignToProject = (projectId, employeeId) => {
        setEmployees(prevEmployees => prevEmployees.map(employee => {
            if (employee.id === employeeId) {
                return { ...employee, projectId: projectId };
            }
            return employee;
        }));
    };


    const createProject = (projectData) => {
        projectData.id = generateUniqueId();
        setProjects([...projects, projectData]);
    };

    const updateProjectProgress = (projectId, increment = 1) => {
        setProjects(projects.map(project => {
            if (project.id === projectId) {
                const newDevelopmentPoints = (project.developmentPoints || 0) + increment;
                const maxPoints = project.maxPoints > 0 ? project.maxPoints : 1; // Avoid division by zero
                const progressPercentage = (newDevelopmentPoints / maxPoints) * 100;
                return { ...project, developmentPoints: newDevelopmentPoints, progress: progressPercentage };
            }
            return project;
        }));
    };

    const updateConsoleSales = (platforms, year, month) => {
        // Update sales figures for each console
    };
    const updateWeeklySales = () => {
        const updatedProjects = projects.map(project => {
            if (project.shipped) {
                console.log(project.shippingWeek + currentWeek)
                const weeksOnMarket = currentWeek - project.shippingWeek;
                const decayFactor = 0.75; // Adjust as needed
                const qualityFactor = 1 + project.metaCriticRating / 100;

                let newSales = project.initialSales * Math.pow(decayFactor, weeksOnMarket) * qualityFactor;
                project.sales[weeksOnMarket] = newSales;
                project.revenue += newSales;

                // Add revenue to bank account
                setBankAccount(bankAccount + newSales); // For adding revenue
            }
            return project;
        });

        setProjects(updatedProjects);
    };

    const paySalaries = () => {
        let totalSalaries = 0;
        employees.forEach(employee => {
            const salaryToPay = calculateProRatedSalary(employee);
            totalSalaries += salaryToPay;
        });

        if (currentWeek % 4 === 0) {
            setBankAccount(prevBankAccount => prevBankAccount - totalSalaries);
            setSalaryCosts(totalSalaries);
        }
    };

    // Helper function to calculate pro-rated salary
    const calculateProRatedSalary = (employee) => {
        // Assuming 4 weeks in a month for simplification
        const salaryPerWeek = employee.salary / 4;
        // Calculate the number of weeks worked in the current month
        const weeksWorked = (employee.startMonth === currentMonth && employee.startYear === currentYear)
            ? 4 - Math.floor(employee.startDay / 7) : 4;
        return salaryPerWeek * weeksWorked;
    };


    const calculateUpfrontPayment = (project, publisher) => {
        const randomFactor = Math.random() * 0.5 + 0.75; // Random factor between 0.75 and 1.25
        return project.requiredPoints * publisher.reputation * randomFactor * 100; // Example calculation
    };

    const calculateRevenueShare = (publisher) => {
        const baseRevenueShare = 15; // Base revenue share percentage
        return baseRevenueShare + (publisher.reputation * 10); // Adjusted by publisher's reputation
    };


    const shipGame = (projectId, publisherName) => {
        // Find the project and publisher objects based on their names
        const project = projects.find(p => p.id === projectId);
        const publisher = publishers.find(p => p.name === publisherName);

        // Error handling if project or publisher are not found
        if (!project || !publisher) {
            console.error("Project or Publisher not found.");
            return;
        }

        // Error handling if genre or platform are not found
        const genre = genres.find(g => g.name === project.genre);
        const platform = platforms.find(p => p.name === project.platform);
        if (!genre || !platform) {
            console.error("Genre or Platform not found.");
            return;
        }

        // Calculate the initial sales, MetaCritic score, etc.
        const genreFactor = genre.popularity;
        const sizeFactor = { 'A': 1, 'AA': 2, 'AAA': 3 }[project.size];
        const yearFactor = 1 + (currentYear - 1985) / 40;
        const marketingFactor = project.marketingPoints || 1;
        const randomFactor = Math.random() * 0.5 + 0.75;
        const initialSales = genreFactor * sizeFactor * yearFactor * marketingFactor * randomFactor;
        const metaCriticScore = calculateMetaCriticScore(genre.complexity, platform.power, project.designPoints, project.progress, marketingFactor);

        // Set the project as shipped with initial sales and revenue
        project.shipped = true;
        project.shippingWeek = currentWeek;
        project.sales = Array(currentWeek).fill(0); // Fill previous weeks with 0 sales
        project.sales[currentWeek - 1] = initialSales; // First week sales start at the current week
        project.revenue = initialSales * 10; // Example revenue calculation for the first week
        project.metaCriticRating = metaCriticScore;
        project.publisher = publisherName;

        // Update the state with the new project details
        setProjects(projects.map(p => p.id === projectId ? project : p));
        setPublishers(publishers.map(p => p.name === publisherName ? { ...p, dealHistory: [...p.dealHistory, project] } : p));

        // Optional: Add a notification or other logic to handle the game shipping
        // addNotification(`Successfully shipped ${project.name} with ${publisher.name}.`);
    };



    const calculateMetaCriticScore = (genreComplexity, consolePower, designFactor, progressFactor, marketingFactor) => {
        // Example calculation formula
        let score = 50; // Base score
        score += (genreComplexity + consolePower) / 2;
        score += designFactor / 10; // Adjust scale as needed
        score += (progressFactor - 1) * 20; // Bonus for extra development
        score += marketingFactor / 5; // Adjust scale as needed

        return Math.min(Math.max(score, 0), 100); // Ensure score is between 0 and 100
    };

    const calculateSalary = (employee, year) => {
        const monthlySalary = employee.salary;
        let salaryToPay = monthlySalary;

        if (employee.startYear === year) {
            const monthsWorked = 12 - employee.startMonth + 1;
            salaryToPay = (monthlySalary / 12) * monthsWorked;
        }

        return salaryToPay;
    };

    // Utility function to generate unique IDs (placeholder)
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    return (
        <div className="App">
            <ToastContainer />
            <TimeComponent
                updateWeeklySales={updateWeeklySales}
                currentYear={currentYear}
                setCurrentYear={setCurrentYear}
                currentWeek={currentWeek}
                setCurrentWeek={setCurrentWeek}
                platforms={platforms}
                employees={employees}
                updateConsoleSales={updateConsoleSales}
                paySalaries={paySalaries}
                addNotification={addNotification}
                salaryCosts={salaryCosts}
                bankAccount={bankAccount}
            />
            <ProjectComponent
                projects={projects}
                createProject={createProject}
                setProjects={setProjects}
                updateProjectProgress={updateProjectProgress}
                currentYear={currentYear}
                platforms={platforms}
                genres={genres}
                employees={employees}
                openShippingModal={openShippingModal}
            />
            <EmployeeComponent
                employees={employees}
                hireEmployee={hireEmployee}
                fireEmployee={fireEmployee}
                assignToProject={assignToProject}
                projects={projects}
            />
            {selectedProjectForShipping && (
                <ShippingComponent
                    isModalOpen={isShippingModalOpen}
                    closeModal={closeShippingModal}
                    game={selectedProjectForShipping}
                    publishers={publishers}
                    shipGame={shipGame}
                    calculateUpfrontPayment={calculateUpfrontPayment}
                    calculateRevenueShare={calculateRevenueShare}
                    addNotification={addNotification}
                />
            )}
        </div>
    );
}

export default App;
