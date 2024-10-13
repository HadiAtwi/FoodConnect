
# **FoodConnect**

FoodConnect is a web application designed to connect users with a way to reduce food waste by sharing expired grocery items. The platform allows users to list and view available items that are past their expiration date but still consumable. The goal is to connect people who need food with those who have surplus items they are willing to share.

## **Current Features**

### **Backend: Spring Boot**
- **REST API**: Developed using Spring Boot to manage grocery items that are expired and ready to be shared.
- **Endpoints Implemented**:
  - **GET /api/v1/food**: Fetch all expired food items.
  - **POST /api/v1/food**: Add a new expired food item to the database.
  
- **Database Configuration**: 
  - Set up PostgreSQL as the database for storing food item data.
  - Spring Data JPA is used to interact with the PostgreSQL database seamlessly.
  
### **Frontend: React**
- **Homepage**:
  - Displays a list of expired grocery items.
  - Includes an input box that allows users to add new expired items to the list.
  
- **Data Handling**:
  - **React State**: Utilizes class components with a state for managing items.
  - **Fetching API**: Fetches backend data using the `fetch` method in the `componentDidMount` lifecycle method.
  
- **Folder Structure**:
  - **backend/**: Contains the Spring Boot application.
  - **frontend/**: Contains the React application for the user interface.

## **Getting Started**

### **Prerequisites**
- Java 11+
- Node.js and npm/yarn
- PostgreSQL installed and running

### **Backend Setup**
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd my-app/backend
   ```

2. **Configure Database**:
   - Update the `application.yml` or `application.properties` file to match your PostgreSQL settings.

3. **Run the Spring Boot Application**:
   ```bash
   ./mvnw spring-boot:run
   ```

### **Frontend Setup**
1. **Navigate to Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the React Application**:
   ```bash
   npm start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## **Project Structure**
```
my-app/
  backend/          # Spring Boot backend
    src/
    pom.xml         # Backend dependencies
  frontend/         # React frontend
    public/
    src/
    package.json    # Frontend dependencies
```

## **Technologies Used**
- **Backend**: Java, Spring Boot, Spring Data JPA, PostgreSQL
- **Frontend**: React, JavaScript, HTML, CSS
- **Database**: PostgreSQL

## **What's Coming Next?**

### **Upcoming Features**
1. **User Authentication**:
   - Implement user login and signup so that users can have personalized accounts.

2. **Enhanced Item Listings**:
   - Include item photos and descriptions to give more context about the groceries.

3. **Location-Based Listings**:
   - Allow users to filter food items based on location to make sharing more practical.

4. **Notification System**:
   - Notify users when new items are added in their vicinity.

5. **Frontend Modernization**:
   - Refactor components to use React Hooks for better state management.
   - Introduce Material UI or a similar library for a more modern look.

6. **Deployment**:
   - Deploy the backend (e.g., using Heroku or AWS).
   - Deploy the frontend (e.g., using Netlify or Vercel).
   
## **Contributing**
Feel free to submit pull requests for any improvements or open issues for discussions. Contributions are welcome!

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for more information.


