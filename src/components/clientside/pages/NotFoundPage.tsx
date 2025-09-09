import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage: React.FC = () => {

    return (

        <div className='min-h-screen flex flex-col items-center justify-center bg-[#fefefe] text-gray-800 px-4'>
            <h1 className='text-5xl font-bold mb-4 text-[#81C408'>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link  to="/"
            className='px-6 py-3 bg-[#81C408] text-white rounded-lg hover:bg-[#6da80a] transition-colors'
            >
                Go Back HOme
            </Link> 
        </div> 



    )
};

export default NotFoundPage;