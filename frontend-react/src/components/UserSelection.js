// UserSelection.js
// Importing React
import React from 'react';

// UserSelection component
function UserSelection({ onUserTypeSelect }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            {/* Buttons to select user type, triggering the passed function */}
            <button onClick={() => onUserTypeSelect("Donor")}>Donor</button>
            <button onClick={() => onUserTypeSelect("NGO")}>NGO</button>
        </div>
    );
}

export default UserSelection;
