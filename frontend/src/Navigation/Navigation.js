import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <Header>
            {/* button for hamburger menu? */}
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <NavLink to="/sign_in">Sign in</NavLink>
                    </li>
                </ul>
            </nav>
        </Header>
    );
};

export default Navigation;