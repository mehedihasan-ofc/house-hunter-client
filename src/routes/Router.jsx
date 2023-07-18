import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import HouseList from "../pages/Dashboard/HouseList/HouseList";
import AddNewHouse from "../pages/Dashboard/AddNewHouse/AddNewHouse";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/house-list',
                element: <HouseList />
            },
            {
                path: '/add-new-house',
                element: <AddNewHouse />
            }
        ]
    }
]);

export default router;