import React from 'react';

import { Route, Routes } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import styles from './assets/scss/app.module.css';

export const SearchContext = React.createContext();

function App() {
    const [search, setSearch] = React.useState('');

    return (
        <>
            <div className={styles.wrapper}>
                <SearchContext.Provider value={{ search, setSearch }}>
                    <Header />
                    <div className={styles.content}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </div>
        </>
    );
}

export default App;
