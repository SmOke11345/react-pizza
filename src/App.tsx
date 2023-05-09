import React from 'react';

import Header from './components/Header';

import styles from './assets/scss/app.module.css';
import { Outlet } from 'react-router';

function App() {
    return (
        <>
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default App;
