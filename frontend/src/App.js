import logo from './logo.svg';
import './App.css';
import Context from "./context";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserDetails } from './store/userSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AllUsers from './components/AllUsers';
import AdminPanel from './pages/AdminPanel';
import RoleLogin from './pages/RoleLogin';
import ScrumHome from './pages/ScrumHome';
import DeveloperHome from './pages/DeveloperHome';
import ClientHome from './pages/ClientHome';
import Contact from './pages/Contact';
import AboutUs from './pages/Aboutus';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    dispatch(fetchUserDetails()); 
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home  />
        </>
      ),
    },
    {
      path: '/Home',
      element: (
        <>
          <Navbar />
          <Home  />
        </>
      ),
    },
    {
      path: '/Login',
      element: (
        <>
          <Navbar />
          <Login  />
        </>
      ),
    },
    {
      path: '/Register',
      element: (
        <>
          <Navbar />
          <Register  />
        </>
      ),
    },
    {
      path: '/Profile',
      element: (
        <>
          <Navbar />
          <Profile />
        </>
      ),
    },
    {
      path: '/Contact',
      element: (
        <>
          <Navbar />
          <Contact />
        </>
      ),
    },
    {
      path: '/Aboutus',
      element: (
        <>
          <Navbar />
          <AboutUs />
        </>
      ),
    },
    {
      path: '/Developer/Login',
      element: (
        <>
          <Navbar />
          <RoleLogin />
        </>
      ),
    },
    {
      path: '/Client/Login',
      element: (
        <>
          <Navbar />
          <RoleLogin />
        </>
      ),
    },
    {
      path: '/ScrumMaster/Login',
      element: (
        <>
          <Navbar />
          <RoleLogin />
        </>
      ),
    },
    {
      path: '/Client/Dashboard',
      element: (
        <>
          <ClientHome />
        </>
      ),
    },
    {
      path: '/Developer/Dashboard',
      element: (
        <>
          <DeveloperHome />
        </>
      ),
    },
    {
      path: '/ScrumMaster/Dashboard',
      element: (
        <>
          <ScrumHome />
        </>
      ),
    },
    {
      path:"/AdminPanel",
      element: user?.role === "ADMIN" ? ( 
        <>
          <Navbar />
          <AdminPanel />
        </>
      ) : (
        <>
          <Navbar />
          <Login /> 
        </>
      ),
      children:[
        {
          path:"AllUsers",
          element:<AllUsers/>
        },
        // {
        //   path:"AllBlogs",
        //   element:<AllBlogs/>
        // },
        // {
        //   path:"AllQueries",
        //   element:<AllQueries/>
        // },
        // {
        //   path:"AllJobTrends",
        //   element:<AllJobTrends/>
        // },
        // {
        //   path:"AllFeedbacks",
        //   element:<AllFeedbacks/>
        // }
      ]
    }
  ]);


  return (
    <>
      <Context.Provider value={{fetchUserDetails}}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Context.Provider>
    </>
  );
}

export default App;
