import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <nav className='d-flex justify-content-center my-3'>
                <Link className='btn btn-secondary mx-3' to='/login'>Login</Link>
                <Link className='btn btn-secondary' to='/register'>Register</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;