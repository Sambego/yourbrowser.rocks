import '../scss/styles.scss';

import {h, render} from 'preact';
import Router from 'preact-router';
import PreactCssTransitionGroup from 'preact-css-transition-group';
import {Container, Header} from './Components';
import {BatteryPage, LocationPage} from './Pages';

render((
    <div>
        <Header />
        <Container>
            <PreactCssTransitionGroup
                transitionName="slide-transition"
                transitionEnterTimeout={4000}
                transitionLeaveTimeout={4000}
                transitionEnter
                transitionLeave
            >
                <Router>
                    <BatteryPage path="/" />
                    <BatteryPage path="/battery" />
                    <LocationPage path="/location" />
                </Router>
            </PreactCssTransitionGroup>
        </Container>
    </div>
), document.body);
