// HomePage.js
// Importing React and necessary hooks, along with custom components
import React, { useState, useEffect } from 'react';
import UserSelection from './UserSelection'; // Component for user type selection
import DonorPortal from './DonorPortal'; // Component for the Donor interface
import NGOPortal from './NGOPortal'; // Component for the NGO interface

// The main HomePage component
function HomePage() {
    // State to manage the list of items (food items)
    const [items, setItems] = useState([]);
    // State to track if the data has been loaded from the server
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    // State to track the selected user type (Donor or NGO)
    const [userType, setUserType] = useState(null);

    // Fetch data from the server once the component is mounted
    useEffect(() => {
        fetch("http://localhost:8090/api/foods") // Replace with your API endpoint
            .then((res) => res.json()) // Parse the JSON response
            .then((json) => {
                setItems(json); // Update the items state with fetched data
                setDataIsLoaded(true); // Mark data as loaded
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []); // Empty dependency array ensures this runs only once after initial render

    // Function to handle the selection of the user type
    const handleUserTypeSelection = (type) => {
        setUserType(type);
    };

    // Render a loading message if data is not yet loaded
    if (!dataIsLoaded) {
        return <div><h1>Please wait...</h1></div>;
    }

    // Main return statement to render the component
    return (
        <div className="App" style={{ padding: "20px" }}>
            <h1>FoodConnect</h1>
            <p>Welcome to FoodConnect! Our goal is to connect donors with NGOs to help distribute expired but still usable food items to those in need.</p>
            {/* Render UserSelection component, passing the user type handler function */}
            <UserSelection onUserTypeSelect={handleUserTypeSelection} />

            {/* Conditionally render DonorPortal or NGOPortal based on user selection */}
            {userType === "Donor" && <DonorPortal items={items} setItems={setItems} />}
            {userType === "NGO" && <NGOPortal items={items} />}
            {/* Show a prompt to select user type if none is selected */}
            {userType === null && <p>Please select whether you are a Donor or an NGO to proceed.</p>}
        </div>
    );
}

export default HomePage;
