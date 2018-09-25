import React, { Component } from 'react';
import AthleteTable from '../components/AthleteTable/AthleteTable';
import OverView from "../components/OverView/OverView";

class TestClient extends Component {
    render() {
        return (
            <div className="Race-Data">
                <OverView/>
                <AthleteTable/>
            </div>
        );
    }
}

export default TestClient;
