import {h, render, Component} from 'preact';
import {bool, string} from 'proptypes';
import classnames from 'classnames';

const Icon = ({icon, color, flipHorizontal}) => {
    const classes = classnames(`iconic iconic-sm iconic-${icon} ${color}`);

    return <i className={classes} />;
};

Icon.propTypes = {
    color: string,
    icon: string.isRequired,
};

Icon.defaultProps = {
    color: '',
};

export default Icon;
