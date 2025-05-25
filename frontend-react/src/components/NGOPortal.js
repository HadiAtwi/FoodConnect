// NGOPortal.js
import React, { useEffect, useState } from 'react';

function NGOPortal() {
    const [items, setItems] = useState([]);
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(true);
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored after login

    // Fetch items from the API when the component mounts
    useEffect(() => {
        fetch("http://localhost:8090/api/foods")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch items");
                }
                return res.json();
            })
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching items:", error));
    }, []); // Empty dependency array = run once on mount
    // Fetch NGO profile
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8090/api/users/${user.id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch profile");
                    return res.json();
                })
                .then((data) => setProfile(data))
                .catch((err) => console.error("Profile load error:", err));
        }
    }, [user]);

    // Handle profile changes
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Save profile changes
    const handleSave = () => {
        fetch(`http://localhost:8090/api/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to update profile");
            return res.json();
        })
        .then((data) => {
            setProfile(data);
            setEditMode(false);
            alert("Profile updated!");
        })
        .catch((err) => console.error("Update error:", err));
    };

    return (
        <div>
            <h2>NGO Portal</h2>
             {/* NGO Profile Section */}
             <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '2rem' }}>
                <h3>My Profile</h3>
                {profile ? (
                    <div>
                        {editMode ? (
                            <>
                                <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
                                <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
                                <textarea name="description" value={profile.description} onChange={handleChange} placeholder="Description" />
                                <button onClick={handleSave}>Save</button>
                            </>
                        ) : (
                            <>
                                <p><strong>Name:</strong> {profile.name}</p>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Description:</strong> {profile.description}</p>
                                <button onClick={() => setEditMode(true)}>Edit Profile</button>
                            </>
                        )}
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>

            <ul>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item.id}>
                            <strong>Item:</strong> {item.name} <br />
                            <strong>Quantity:</strong> {item.quantity} <br />
                            <strong>Expires:</strong> {item.expirationDate}
                        </li>
                    ))
                ) : (
                    <p>No items available.</p>
                )}
            </ul>
        </div>
    );
}

export default NGOPortal;
