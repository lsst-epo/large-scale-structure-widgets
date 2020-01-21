import React, { Component } from 'react';
import reactn from 'reactn';
import { hot } from 'react-hot-loader/root';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import ScrollToTop from './components/site/ScrollToTop';
import SiteHeader from './components/site/SiteHeader';
import ChartLayout from './components/site/ChartLayout';
import StyleGuide from './StyleGuide';
import Questions from './Questions';
import Example from './Example';
import NoMatch from './components/site/NoMatch';
import Layout from './components/site/Layout';
import MultiAxisLayout from './components/site/MultiAxisLayout';
import MultiAxisLayoutBig from './components/site/MultiAxisLayoutBig';

@reactn
class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <SiteHeader />
          <main className="container-main">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Example {...props} greeting="This is an example Homepage" />
                )}
              />
              <Route exact path="/styles" component={StyleGuide} />
              <Route exact path="/questions" component={Questions} />
              <Route exact path="/phase1" component={ChartLayout} />
              <Route exact path="/phase2" component={Layout} />
              <Route exact path="/phase3" component={MultiAxisLayout} />
              <Route exact path="/phase4" component={MultiAxisLayoutBig} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </ScrollToTop>
      </Router>
    );
  }
}

export default hot(App);
