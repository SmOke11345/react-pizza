import React from 'react';

import { Outlet } from 'react-router';

import Header from './components/Header';

import styles from './assets/scss/app.module.css';

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
