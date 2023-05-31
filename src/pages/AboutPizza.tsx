import React from 'react';
import axios from 'axios';

import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from '../assets/scss/app.module.css';

// Делаем интерфейс, т.к типизируем объект
interface IPizza {
    title: string;
    price: number;
    imageUrl: string;
}

const AboutPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<IPizza>();

    // Чтобы вытаскивать параметры из строки поиска
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await axios.get(
                    `https://6458b2368badff578ef810ab.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (error) {
                console.warn(error);
                navigate('/');
            }
        };
        fetchPizza();
    }, []);

    return (
        <>
            {!pizza ? (
                <div className={styles.container}>Загрузка...</div>
            ) : (
                <div className={styles.container}>
                    <div>
                        <img src={pizza.imageUrl} alt="pizza" />
                    </div>
                    <div>
                        <h2>{pizza.title}</h2>
                        <h4>{pizza.price} ₽</h4>
                    </div>
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
            )}
        </>
    );
};

export default AboutPizza;
