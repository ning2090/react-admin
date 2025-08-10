import { createBrowserRouter, Navigate } from "react-router-dom"
import Main from "../pages/main"
import Home from "../pages/home"
import User from "../pages/user"
import Mall from "../pages/mall"
import pageOne from "../pages/other/pageOne"
import pageTwo from "../pages/other/pageTwo"

const routes = [
    {
        path: "/",
        Component: Main,
        children: [
            // 重定向
            {
                path: "/",
                element: <Navigate to="/home" replace />
            },            
            {
                path: "home",
                Component: Home
            },
            {
                path: "Mall",
                Component: Mall
            },
            {
                path: "User",
                Component: User
            },  
            {
                path: "other",
                children: [
                    {
                        path: "pageOne",
                        Component: pageOne
                    },
                    {
                        path: "pageTwo",
                        Component: pageTwo
                    },                    
                ]
            },           
        ]
    }
]

export default createBrowserRouter(routes)