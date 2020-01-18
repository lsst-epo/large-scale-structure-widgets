import React from 'react';
import { Link } from 'react-router-dom';
import Page from './components/site/Page';

class Example extends React.PureComponent {
  render() {
    return (
      <Page next="/phase1" previous="/phase3">
        <div>
          <h1>Welcome to Large Scale Structure Widgets</h1>
          <br />
          <div>
            <h2>Phases of Development</h2>
            <ul>
              <li>
                <Link to="/phase1">Widgets: Phase 1</Link>
              </li>
              <li>
                <Link to="/phase2">Widgets: Phase 2</Link>
              </li>
              <li>
                <Link to="/phase3">Widgets: Phase 3</Link>
              </li>
            </ul>
          </div>
          <br />
        </div>
      </Page>
    );
  }
}

export default Example;
