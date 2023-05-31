import { Link } from 'react-router-dom';

import emptyCart from '../assets/img/empty-cart.png';
import styles from '../assets/scss/app.module.css';

const EmptyCart: React.FC = () => {
    return (
        <div className={styles.content}>
            <div className={`${styles.container} ${styles['container--cart']}`}>
                <div className={`${styles.cart} ${styles['cart--empty']}`}>
                    <h2>
                        Корзина пустая <icon>😕</icon>
                    </h2>
                    <p>
                        Вероятней всего, вы не заказывали ещё пиццу.
                        <br />
                        Для того, чтобы заказать пиццу, перейди на главную страницу.
                    </p>
                    <img src={emptyCart} alt="Empty cart" />
                    <Link to="/" className={`${styles.button} ${styles['button--black']}`}>
                        <span>Вернуться назад</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default EmptyCart;
