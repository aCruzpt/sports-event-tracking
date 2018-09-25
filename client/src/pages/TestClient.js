import React, { Component } from 'react';
import { connect } from 'react-redux';

import OverView from '../components/OverView/OverView';
import AthleteTable from '../components/AthleteTable/AthleteTable';

class TestClient extends Component {
    render() {
        return (
            <div className="Test-Client">
                <OverView enableActions={true}/>
                <AthleteTable athletes={this.props.athletes} enableActions={true}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    athletes: state.athletes
});

export default connect(mapStateToProps, null)(TestClient);
