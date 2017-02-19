import {h, render, Component} from 'preact';
import {Icon, Button} from '../../Components';
import styles from './home.scss';
import general from '../../../scss/styles.scss';

const HomePage = ({children}) => {
    return (
        <section className={styles.home}>
            <div className={styles.container}>
                <Icon name="browser" size="huge" style={{'margin-bottom': '4rem'}} />
                <p className={general.intro}>This is collection of code examples illustrating browser API's. Some of these might be wildly used, while others are a bit lesser know.</p>
                <Button href="/battery">View examples</Button>
                <Button href="https://github.com/sambego/yourbrowser.rocks" icon="github" type="secondary">Visit on Github</Button>
            </div>
        </section>
    );
};

HomePage.propTypes = {};

export default HomePage;
