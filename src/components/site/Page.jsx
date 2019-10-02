import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

class Page extends React.PureComponent {
  static defaultProps = {
    previousText: 'Previous',
    nextText: 'Next',
  };

  renderNav() {
    const { previous, previousText, next, nextText, nextHandler } = this.props;

    return (
      <nav role="navigation" className="nav-secondary">
        {previous && (
          <Button
            flat
            primary
            swapTheming
            to={previous}
            component={Link}
            iconEl={<ArrowLeft />}
            iconBefore
          >
            {previousText}
          </Button>
        )}
        {next && (
          <Button
            flat
            primary
            swapTheming
            to={next}
            component={Link}
            iconEl={<ArrowRight />}
            iconBefore={false}
            onClick={nextHandler}
          >
            {nextText}
          </Button>
        )}
      </nav>
    );
  }

  render() {
    const { children, previous, next } = this.props;

    return (
      <div className="container-page">
        {children}
        {(next || previous) && this.renderNav()}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node,
  previous: PropTypes.string,
  previousText: PropTypes.string,
  next: PropTypes.string,
  nextText: PropTypes.string,
  nextHandler: PropTypes.func,
};

export default Page;
