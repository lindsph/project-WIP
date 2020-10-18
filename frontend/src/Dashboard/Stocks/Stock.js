import React from 'react';
import styles from './Stock.module.css';

const Stock = () => {
    return (
        <li className={styles.stock}>
            <div>Stock title</div>
            <div>Price data etc</div>
        </li>
    );
};

export default Stock;