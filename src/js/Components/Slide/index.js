import {h, render, Component} from 'preact';
import {element, string} from 'proptypes';
import {SlideNav} from '../';
import styles from './slide.scss';

const Slide = ({children, previous, next}) => {
    return (
        <section className={styles.slide}>
            {previous && <SlideNav direction="left" to={previous} />}
            {next && <SlideNav direction="right" to={next} />}

            {children}
        </section>
    );
};

Slide.propTypes = {
    children: element.isRequired,
    previous: string,
    next: string,
};

export default Slide;
