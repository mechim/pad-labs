# Microservice-based Music Rating and Discussion Application
An application that allows users to rate and discuss music in live forums.
## 1. Application Sustainability Assestment
1. Media rating and reviewing platforms tend to experience very high levels of user traffic especially in the times of new popular releases. Some functionality of these applications can be separated and improved on their own. This approach allows for better scaling and improvement in the long run.
2. Microservices give the ability to deploy parts of an application separately which allows for both a smoother developing and user experience.
* websites like Letterboxd and Goodreads which serve as inspiration for this project use microservices to separate their functionality (user auth, review, rating, notifications, list making etc.)



## 2. Service boundaries
![deployment](https://github.com/user-attachments/assets/87bc4d1c-9888-4b41-b17f-a7826eefc1ab)
* The CRUD service manages everything to do with users and music reviewing.
* Service B takes care of the discussion forums
## 3. Technology Stack and Communication Patterns
* Service A (Python): Django + MongoDB (a common combination)
* Service B (Python): Django + MongoDB (a common combination) + Dj Channels (WS) + Redis (Channels storage)
* API Gateway (JS): Express
* Inter-service communication: RESTful APIs (CRUD) and gRPC (service discovery)
## 4. Data Management
---

### **Service A: User & Music Review Service**

#### **POST | /api/users/auth/signup**  
Creates a new account

- **Expects:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **On Success:**  
  A confirmation message (e.g., `"User created successfully"`)

---

#### **POST | /api/users/auth/signin**  
Logs into an existing account

- **Expects:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **On Success:**
  ```json
  {
    "auth_token": "string"
  }
  ```

---

#### **GET | /api/users/friends/search?uname=**  
Searches users by username

- **Expects:**  
  `auth_token` in the header and parameters in the URL (e.g., `uname=John`)

- **On Success:**
  ```json
  [
    {
      "id": "number",
      "username": "string"
    }
  ]
  ```

---

#### **POST | /api/users/friends/req/:id**  
Creates a friend request

- **Expects:**  
  `auth_token` in the header and a **number** `id` (receiver's ID) in the URL.

- **On Success:**  
  A confirmation message (e.g., `"Friend request sent successfully"`)

---

#### **GET | /api/users/friends/get**  
Gets all existing friend requests

- **Expects:**  
  `auth_token` in the header

- **On Success:**
  ```json
  [
    {
      "id": "number",
      "username": "string"
    }
  ]
  ```

---

#### **POST | /api/users/friends/add?id=&accepted=**  
Resolves a friend request

- **Expects:**  
  `auth_token` in the header and parameters in the URL (e.g., `id=123&accepted=true`)

- **On Success:**  
  A confirmation message (e.g., `"Friend request resolved"`)

---

#### **PATCH | /api/users/ratings/upd?id=&del=**  
Updates user’s rating

- **Expects:**  
  Parameters in the URL (e.g., `id=456&del=true`), and authorization credentials (inter-service communication: **B** → **A**).

- **On Success:**  
  A confirmation message (e.g., `"Rating updated successfully"`)

---

### **Service B: Forum & Chat Service**

#### **POST | /api/records/save**  
Saves a record of moves

- **Expects:**  
  `auth_token` in the header, and the body:
  ```json
  {
    "moves": ["list", "of", "strings"]
  }
  ```

- **On Success:**  
  A confirmation message (e.g., `"Record saved successfully"`)

---

#### **GET | /api/records/get-all**  
Gets all the records' IDs and datetime data

- **Expects:**  
  `auth_token` in the header

- **On Success:**
  ```json
  [
    {
      "id": "number",
      "datetime": "string"
    }
  ]
  ```

---

#### **GET | /api/records/get/:id**  
Gets an actual record by its ID

- **Expects:**  
  `auth_token` in the header and a **number** `id` (record ID) in the URL.

- **On Success:**
  ```json
  {
    "moves": ["list", "of", "strings"]
  }
  ```

---

#### **POST | /api/games/create**  
Creates a new game lobby

- **Expects:**  
  `auth_token` in the header

- **On Success:**
  ```json
  {
    "lobby_id": "number"
  }
  ```

---

#### **GET | /api/games/discover**  
Gets a list of lobbies to join (filtered by rating/friends)

- **Expects:**  
  `auth_token` in the header

- **On Success:**
  ```json
  [
    {
      "lobby_id": "number",
      "avg_rating": "number",
      "friends_in": "boolean"
    }
  ]
  ```

---

#### **Django Channels JSONConsumer | wss://.../api/games/wss/lobby/:id**  
Lobby WebSocket consumer (removed when empty); receives streams of data to be deserialized and interpreted.

- **Expects:**  
  WebSocket connection with JSON payloads to manage real-time game interactions.

---

This API structure covers the required endpoints for user management, music reviews, social features, and real-time game lobbies, ensuring that all services operate independently yet communicate effectively.
## 5. Deployment and Scaling
For deployment, containerize the microservices using Docker and orchestrate them with Kubernetes on cloud platforms like AWS or GCP. Each service will have its own database, and secrets/configurations can be managed through environment variables. Managed Kubernetes services enable easy scaling and fault tolerance.

For scaling, use Redis for caching and improve performance. Auto-scaling policies in Kubernetes can adjust based on traffic or resource usage
