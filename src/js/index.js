import '../scss/styles.scss';

import {h, render} from 'preact';
import Router from 'preact-router';
import {Container, Header} from './Components';
import {BatteryPage, LocationPage} from './Pages';

render((
    <div>
        <Header />
        <Container>
            <Router>
                <BatteryPage path="/" />
                <BatteryPage path="/battery" />
                <LocationPage path="/location" />
            </Router>
        </Container>
    </div>
), document.body);
