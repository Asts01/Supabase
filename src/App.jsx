import React from 'react';
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // No need for BrowserRouter here

// Define the routes
const route = createBrowserRouter([
  {
    path: "/",
    element: <SignUp /> // Render the Home component at the root path
  },
  {
    path: "/home",
    element: <Home /> // Home component for /home route as well
  },
  {
    path: "/signup",
    element: <SignUp /> // Render the SignUp component at /signup
  },
  {
    path: "/login",
    element: <Login /> // Render the Login component at /login
  }
]);

// Main App Component
function App() {
  return (
    <RouterProvider router={route} /> // Use RouterProvider to manage routing
  );
}

export default App;
