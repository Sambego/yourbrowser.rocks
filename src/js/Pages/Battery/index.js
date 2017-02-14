import {h, render, Component} from 'preact';
import {Slide} from '../../Components';

const BatteryPage = ({children}) => {
    return (
        <Slide next="/location">
            <h1>Battery!</h1>
        </Slide>
    );
};

BatteryPage.propTypes = {};

export default BatteryPage;
