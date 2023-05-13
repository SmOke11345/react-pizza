import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';

import { Route, Routes } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import styles from './assets/scss/app.module.css';

export const SearchContext = React.createContext();

function App() {
    const [search, setSearch] = React.useState('');

    const filter = useSelector((state) => state.filter.value);
    const dispatch = useDispatch();

    return (
        <>
            <div className={styles.wrapper}>
                <button
                    onClick={() => {
                        dispatch(increment());
                    }}>
                    Добавить
                </button>
                {filter}
                <button
                    onClick={() => {
                        dispatch(decrement());
                    }}>
                    Убрать
                </button>
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
