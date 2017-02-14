import {h, render, Component} from 'preact';
import styles from './header.scss';

const HEADER = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title} >Your browser rocks!</h1>
        </header>
    );
};

HEADER.propTypes = {};

export default HEADER;
