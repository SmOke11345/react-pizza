import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaItem from './components/PizzaItem';

import styles from './assets/scss/app.module.css';

function App() {
    return (
        <>
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.container}>
                        <div className={styles.content__top}>
                            <Categories />
                            <Sort />
                        </div>
                        <h2 className={styles.content__title}>Все пиццы</h2>
                        <div className={styles.content__items}>
                            <PizzaItem />
                            <PizzaItem />
                            <PizzaItem />
                            <PizzaItem />
                            <PizzaItem />
                            <PizzaItem />
                            <PizzaItem />
                            <PizzaItem />
                            <PizzaItem />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
