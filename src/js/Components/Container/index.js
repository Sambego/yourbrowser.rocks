import {h, render, Component} from 'preact';
import {element} from 'proptypes';
import styles from './container.scss';

const Container = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: element.isRequired,
};

export default Container;
