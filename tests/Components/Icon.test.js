import render from 'preact-render-to-string';
import {h, render as PreactRender} from 'preact';
import {Icon} from '../../src/js/Components';

describe('Icon', () => {
    const icon = 'home';
    const color = 'tomato';

    it('should render correctly', () => {
        const iconElement = render(
            <Icon icon={icon} color={color}/>
        );

        expect(iconElement).toMatchSnapshot();
    });

    it('should add an icon class', () => {
        const iconElement = PreactRender(
            <Icon icon={icon}/>
        );

        expect(iconElement.classList.contains(`iconic-${icon}`)).toMatchSnapshot();
    });

    it('should add a color class', () => {
        const iconElement = PreactRender(
            <Icon icon={icon} color={color}/>
        );

        expect(iconElement.classList.contains(color)).toMatchSnapshot();
    });
});
