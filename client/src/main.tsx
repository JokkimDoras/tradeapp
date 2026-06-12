import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router"
import App from './App.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import DashBoard from './pages/DashBoard.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/dashboard',
    element:<DashBoard/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
