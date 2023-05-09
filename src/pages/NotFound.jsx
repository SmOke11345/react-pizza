import styles from '../assets/scss/app.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div
            className={styles.container}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
            }}>
            <h1>Ничего не найдено</h1>
            <Link
                className={`${styles.button} ${styles['button--outline']} ${styles['button--add']} ${styles['go-back-btn']}`}
                to="/">
                <svg
                    fill="none"
                    height="14"
                    viewBox="0 0 8 14"
                    width="8"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 13L1 6.93015L6.86175 1"
                        stroke="#D3D3D3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                </svg>
                Вернуться назад
            </Link>
        </div>
    );
};
export default NotFound;
