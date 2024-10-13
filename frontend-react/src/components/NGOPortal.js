// NGOPortal.js
// Importing React
import React from 'react';

// NGOPortal component
function NGOPortal({ items }) {
    return (
        <div>
            <h2>NGO Portal</h2>
            <ul>
                {/* Render the list of items */}
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>Item:</strong> {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NGOPortal;
