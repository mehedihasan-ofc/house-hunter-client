import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import HouseList from "../pages/Dashboard/HouseList/HouseList";
import AddNewHouse from "../pages/Dashboard/AddNewHouse/AddNewHouse";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import HouseEdit from "../pages/Dashboard/HouseEdit/HouseEdit";

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
                path: '/dashboard/house-list',
                element: <HouseList />
            },
            {
                path: '/dashboard/house-edit/:id',
                element: <HouseEdit />,
                loader: ({ params }) => fetch(`http://localhost:5000/house-edit/${params.id}`)
            },
            {
                path: '/dashboard/add-new-house',
                element: <AddNewHouse />
            },
            {
                path: '/dashboard/my-bookings',
                element: <MyBookings />
            }
        ]
    }
]);

export default router;