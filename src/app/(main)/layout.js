import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const MainLayout = ({children}) => {
    return (
        <body>
        <Navbar />
         <main  className="max-w-7xl mx-auto">{children} </main>
        <Footer />
         <ToastContainer />
      </body>
    );
};

export default MainLayout;