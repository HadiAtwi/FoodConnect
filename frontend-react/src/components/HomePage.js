// HomePage.js
// Importing React and necessary hooks, along with custom components
import React, { useState, useEffect } from 'react';
import UserSelection from './UserSelection'; // Component for user type selection
import DonorPortal from './DonorPortal'; // Component for the Donor interface
import NGOPortal from './NGOPortal'; // Component for the NGO interface
import { Button, Container, Row, Col, Form, ListGroup, Spinner } from 'react-bootstrap';

// The main HomePage component
function HomePage() {
    // State to manage the list of items (food items)
    const [items, setItems] = useState([]);
    // State to track if the data has been loaded from the server
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    // State to track the selected user type (Donor or NGO)
    const [userType, setUserType] = useState(null);
    const [isDonorView, setIsDonorView] = useState(false);

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

    // Toggle between Donor and NGO view
    const handleDonorClick = () => setIsDonorView(true);
    const handleNgoClick = () => setIsDonorView(false);

    // Render a loading message if data is not yet loaded
    if (!dataIsLoaded) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <h3>Please wait...</h3>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">FoodConnect - Expired Grocery Items</h1>

            {/* Buttons to switch between donor and NGO view */}
            <Row className="mb-4">
                <Col className="text-center">
                    <Button variant="primary" onClick={handleDonorClick} className="mr-2">
                        Donor
                    </Button>
                    <Button variant="success" onClick={handleNgoClick}>
                        NGO
                    </Button>
                </Col>
            </Row>

            {/* Conditional rendering based on the view */}
            {isDonorView ? (
                // Donor view: form to add new item
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Form.Group controlId="formItemName">
                                <Form.Label>New Item</Form.Label>
                                <Form.Control type="text" placeholder="Enter item name" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-2">
                                Add Item
                            </Button>
                        </Form>
                    </Col>
                </Row>
            ) : (
                // NGO view: list of donated items
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h3 className="text-center mb-3">Available Expired Items</h3>
                        <ListGroup>
                            {items.map((item) => (
                                <ListGroup.Item key={item.id}>
                                    <strong>Item:</strong> {item.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default HomePage;