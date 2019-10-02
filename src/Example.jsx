import React from 'react';
import PropTypes from 'prop-types';
import Page from './components/site/Page';

class Example extends React.PureComponent {
  render() {
    const { greeting } = this.props;

    return (
      <Page next="/styles" previous="questions">
        <div className="container-flex centered middle">
          <div>{greeting}</div>
        </div>
      </Page>
    );
  }
}

Example.propTypes = {
  greeting: PropTypes.string,
};

export default Example;
