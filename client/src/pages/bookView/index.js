import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import BookView from './BookView';

const index = () => {
    return (
        <>
            <Navbar />
            <BookView />
            <Footer />
        </>
    )
}

export default index
