# Microservice-based Music Rating and Discussion Application
An application that allows users to rate and discuss music in live forums.
## 1. Application Sustainability Assestment
1. Media rating and reviewing platforms tend to experience very high levels of user traffic especially in the times of new popular releases. Some functionality of these applications can be separated and improved on their own. This approach allows for better scaling and improvement in the long run.
2. Microservices give the ability to deploy parts of an application separately which allows for both a smoother developing and user experience.
* websites like Letterboxd and Goodreads which serve as inspiration for this project use microservices to separate their functionality (user auth, review, rating, notifications, list making etc.)



## 2. Service boundaries
![deployment drawio](https://github.com/user-attachments/assets/74d33d12-ae81-429c-b282-66bd8437a77d)

* The Review service manages everything to do with users and music reviewing.
* The Forum service takes care of the discussion forums
## 3. Technology Stack and Communication Patterns
* The Review Service (Python): Django + MongoDB (a common combination)
* The Forum Service (Python): Django + MongoDB (a common combination) + Dj Channels (WS) + Redis (Channels storage)
* API Gateway (JS): Express
* Inter-service communication: RESTful APIs (CRUD) and gRPC (service discovery)
## 4. Data Management
### The Review Microservice: Users and Music Reviews
This microservice handles user management, authentication, and music reviews (CRUD operations).

**Base URL**: `/api/users-reviews`

#### 1. **User Management**
- **Register a new user**
  - **Method**: `POST`
  - **Endpoint**: `/users/register`
  - **Description**: Create a new user.
  - **Request body**:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  - **Response**: User profile details or error message.

- **Login user**
  - **Method**: `POST`
  - **Endpoint**: `/users/login`
  - **Description**: Authenticate user and return token.
  - **Request body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response**: JWT token or error message.

- **Get user profile**
  - **Method**: `GET`
  - **Endpoint**: `/users/profile/{userId}`
  - **Description**: Get details of a specific user.
  - **Response**: User profile details.

#### 2. **Music Reviews**
- **Post a new review**
  - **Method**: `POST`
  - **Endpoint**: `/reviews`
  - **Description**: Submit a new music review.
  - **Request body**:
    ```json
    {
      "userId": "string",
      "albumId": "string",
      "rating": "number",
      "reviewText": "string"
    }
    ```
  - **Response**: Review details or error message.

- **Get all reviews for an album**
  - **Method**: `GET`
  - **Endpoint**: `/reviews/album/{albumId}`
  - **Description**: Fetch all reviews for a specific album.
  - **Response**: List of reviews.

- **Update a review**
  - **Method**: `PUT`
  - **Endpoint**: `/reviews/{reviewId}`
  - **Description**: Update an existing review.
  - **Request body**:
    ```json
    {
      "rating": "number",
      "reviewText": "string"
    }
    ```
  - **Response**: Updated review details.

- **Delete a review**
  - **Method**: `DELETE`
  - **Endpoint**: `/reviews/{reviewId}`
  - **Description**: Delete a specific review.
  - **Response**: Success or error message.

### The Forums Microservice: WebSocket-Based Forums/Chats/Discussions
This microservice handles live discussions about music, albums, or genres using WebSockets.

**Base URL**: `/api/forums`

#### 1. **WebSocket Connection for Discussions**
- **Connect to a discussion room (WebSocket)**
  - **Method**: `GET`
  - **Endpoint**: `/connect`
  - **Description**: Establish a WebSocket connection for real-time discussions. The client should initiate a connection to a specific discussion room (album or genre).
  - **Query parameters**:
    - `roomId` (albumId or genreId to identify the room).
    - `userId` (to identify the user in the room).

  - **Response**: Live WebSocket connection, enabling chat messages to be exchanged.

#### 2. **Send/Receive Messages**
- **Send message to the discussion room**
  - **Method**: `SEND` (over WebSocket)
  - **Endpoint**: WebSocket message
  - **Payload**:
    ```json
    {
      "userId": "string",
      "roomId": "string",
      "message": "string"
    }
    ```
  - **Response**: Acknowledgment of message sent or error.

- **Receive messages from the discussion room**
  - **Method**: `RECEIVE` (over WebSocket)
  - **Description**: Receive real-time messages from other participants in the discussion room.

#### 3. **Manage Discussion Rooms**
- **Create a new discussion room**
  - **Method**: `POST`
  - **Endpoint**: `/rooms`
  - **Description**: Create a new room for an album or genre discussion.
  - **Request body**:
    ```json
    {
      "roomType": "album/genre",
      "albumId": "string",
      "genreId": "string"
    }
    ```
  - **Response**: Room details.

- **Get active rooms**
  - **Method**: `GET`
  - **Endpoint**: `/rooms`
  - **Description**: Fetch all active discussion rooms.
  - **Response**: List of active rooms.

- **Close a discussion room**
  - **Method**: `DELETE`
  - **Endpoint**: `/rooms/{roomId}`
  - **Description**: Close a specific discussion room.
  - **Response**: Success or error message.

---

This structure separates the user and review management from the real-time discussion, which fits well with a microservice architecture focused on separation of concerns.
## 5. Deployment and Scaling
For deployment, containerize the microservices using Docker and orchestrate them with Kubernetes on cloud platforms like AWS or GCP. Each service will have its own database, and secrets/configurations can be managed through environment variables. Managed Kubernetes services enable easy scaling and fault tolerance.

For scaling, use Redis for caching and improve performance. Auto-scaling policies in Kubernetes can adjust based on traffic or resource usage
