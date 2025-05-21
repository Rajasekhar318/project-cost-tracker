# Project Cost Manager

A React-based cost tracking application that allows users to manage and visualize project and miscellaneous costs. Users can sign up, log in, and track expenses through an intuitive dashboard featuring charts and summaries.

## Features

* **User Authentication** (Firebase)
* **Manage Costs and Items**: Add, update, and delete project costs and other expenses
* **Dashboard Overview**: View total costs, number of expenses, and active items
* **Interactive Charts**: Visualize cost and item trends over time
* **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

* **React**
* **Redux Toolkit**
* **React Router DOM**
* **Firebase Authentication**
* **Tailwind CSS**
* **Reselect for selectors**

## Getting Started

### Prerequisites

* Node.js (>= 14)
* npm (>= 6)
* A Firebase project for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd project-cost-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add your Firebase configuration:

   ```env
   REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
   ```

4. **Run the development server**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

* `npm start`: Runs the app in development mode
* `npm test`: Launches the test runner
* `npm run build`: Builds the app for production in the `build` folder

## Folder Structure

```
project-cost-manager/
├── public/                # Static files and HTML template
├── src/                   # Application source code
│   ├── components/        # Reusable UI components (forms, lists, charts)
│   ├── pages/             # Route-level components (Login, Signup, Dashboard)
│   ├── hooks/             # Custom React hooks (e.g., useAuth)
│   ├── firebase/          # Firebase initialization and auth functions
│   ├── features/          # Redux slices (items, costs, auth)
│   ├── store/             # Redux store setup and selectors
│   ├── utils/             # Utility functions
│   └── App.jsx            # Main application component with routes
├── .env                   # Environment variables for Firebase config
├── .gitignore
├── package.json
└── README.md              # Project overview and setup instructions
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. Feel free to customize as needed.
