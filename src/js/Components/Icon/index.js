import {h, render, Component} from 'preact';
import {bool, string} from 'proptypes';
import classnames from 'classnames';

const Icon = ({icon, color, flipHorizontal}) => {
    const classes = classnames(`iconic iconic-sm iconic-${icon} ${color}`, {
        'iconic-flip-horizontal': flipHorizontal,
    });

    return <i className={classes} />;
};

Icon.propTypes = {
    color: string,
    flipHorizontal: bool,
    icon: string.isRequired,
};

Icon.defaultProps = {
    color: '',
};

export default Icon;
