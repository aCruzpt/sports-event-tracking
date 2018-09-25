import React, { Component } from 'react';
import {Route, BrowserRouter as Router, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAthletes } from "./store/actions";
import TestClient from './pages/TestClient';
import RaceData from './pages/RaceData';

class AppRoutes extends Component {
    componentDidMount() {
        this.props.fetchAthletes();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <header>
                        <div id="App-logo">Race App</div>
                        <nav>
                            <NavLink exact={true} to="/" activeClassName="active">Send dummy data</NavLink>
                            <NavLink to="/race" activeClassName="active">Results</NavLink>
                        </nav>
                    </header>
                    <div className="App-content">
                        <Route exact path="/" component={TestClient}/>
                        <Route path="/race" component={RaceData}/>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchAthletes: () => dispatch(fetchAthletes())
});

export default connect(null, mapDispatchToProps)(AppRoutes);
