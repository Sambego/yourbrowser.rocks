import {h, render, Component} from 'preact';
import {Slide} from '../../Components';

const LocationPage = ({children}) => {
    return (
        <Slide previous="/battery">
            <h1>Location!</h1>
        </Slide>
    );
};

LocationPage.propTypes = {};

export default LocationPage;
