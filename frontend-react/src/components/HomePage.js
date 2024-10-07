import React, { useState, useEffect } from 'react';

function HomePage() {
    const [items, setItems] = useState([]);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/foods")
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setDataIsLoaded(true);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []); // Empty dependency array means this runs once after the initial render

    if (!dataIsLoaded) {
        return <div><h1>Please wait...</h1></div>;
    }

    return (
        <div className="App" style={{ padding: "20px" }}>
            <h1>FoodConnect - Expired Grocery Items</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>Item:</strong> {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
