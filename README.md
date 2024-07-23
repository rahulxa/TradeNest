# Tradenest - Full-Stack Stock Trading Platform Clone

## Overview

Tradenest is a custom-built full-stack stock trading platform clone inspired by the popular Zerodha platform. Designed and implemented from scratch, this project offers a tailored and secure environment for real-time stock trading. It combines advanced backend and frontend technologies to provide a user-friendly and efficient trading experience.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt
- **Frontend:** React.js, Redux, Bootstrap, Chart.js, Material UI
- **AI Chatbot:** Google Generative AI
- **State Management:** Redux for efficient and seamless state management across the application

## Features

### Backend 
- **User Authentication and Authorization:** Secure login and account registration with JWT tokens (access and refresh tokens) and middleware for robust authentication and authorization.
- **Password Security:** Password hashing with bcrypt to ensure secure user data.
- **Order and Holdings Management:** RESTful APIs for placing and viewing orders, as well as managing user holdings. Secured routes using authentication middleware.

### Frontend 
- **User Registration and Login:** Utilized React’s `useForm` hook for efficient data handling and encrypted user tokens with CryptoJS.
- **Real-Time Stock Trading:** Real-time buying and selling of stocks with instant value updates, managed through React-Redux.
- **AI Chatbot:** Real-time AI chatbot powered by Google Generative AI, retaining chat history and fetching messages seamlessly.
- **User Dashboard:** Comprehensive dashboard for viewing overall investment summary, profit/loss, holdings, and portfolio diversity.
- **Watchlist Feature:** Allows users to buy stocks and view detailed analytics using Chart.js.
- **Holdings Management:** Feature for selling stocks and monitoring holdings performance with visual analytics utilizing Redux to ensure up-to-date data.
- **Order History:** View all past and recent orders, both buying and selling.
- **News Feature:** Latest stock market news integrated via the thenewsapi.com API.

## Installation

## Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/TradeNest.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd TradeNest
    ```

3. **Navigate to the frontend Directory:**
    ```bash
    cd frontend
    npm install
    ```
    Create a `.env` file and add your environment variables (use `.env.sample` file for reference).
    Start the frontend development server:
    ```bash
    npm run dev
    ```

4. **Navigate to the dashboard Directory:**
    ```bash
    cd ../dashboard
    npm install
    ```
    Create a `.env` file and add your environment variables (use `.env.sample` file for reference).
    Start the dashboard development server:
    ```bash
    npm run dev
    ```

5. **Navigate to the backend Directory:**
    ```bash
    cd ../backend
    npm install
    ```
    Create a `.env` file and add your environment variables (use `.env.sample` file for reference).
    Start the backend server:
    ```bash
    npm run dev
    ```


