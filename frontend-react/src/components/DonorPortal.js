// DonorPortal.js
// Importing React and necessary hooks
import React, { useState } from 'react';

// DonorPortal component
function DonorPortal({ items, setItems }) {
    // State for the new item's name
    const [newItemName, setNewItemName] = useState("");

    // Function to handle adding a new item
    const handleAddItem = () => {
        if (newItemName.trim() === "") {
            alert("Item name cannot be empty."); // Validation check
            return;
        }

        // Create a new item object
        const newItem = {
            name: newItemName,
            expirationDate: "2024-12-31", // Placeholder expiration date
            quantity: 1 // Placeholder quantity
        };

        // Send a POST request to add the new item to the server
        fetch("http://localhost:8090/api/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        })
        .then((res) => res.json())
        .then((addedItem) => {
            setItems([...items, addedItem]); // Update state with the new item
            setNewItemName(""); // Clear the input field
        })
        .catch((error) => console.error("Error adding item:", error));
    };

    return (
        <div>
            <h2>Donor Portal</h2>
            {/* Input field for entering a new item's name */}
            <input
                type="text"
                placeholder="Enter item name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
            />
            {/* Button to add the item */}
            <button onClick={handleAddItem}>Add Item</button>
        </div>
    );
}

export default DonorPortal;
