import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from '../Timer/Timer';
import "./OverView.css";

class OverView extends Component {
    getRunningFinished() {
        let finished = this.props.athletes.filter(athlete => athlete.finishTime).length;
        let running = this.props.athletes.length - finished;
        return running + "/" + finished;
    }

    render() {
        return (
            <div className="Test-Client">
                <div className="Race-overview">
                    <div className="Race-participant-count">
                        <div className="overview-title">Participants</div>
                        <div className="overview-content">{this.props.athletes.length}</div>
                    </div>

                    <Timer enableActions={this.props.enableActions}/>

                    <div className="Race-stats">
                        <div className="overview-title">Running / Finished</div>
                        <div className="overview-content">{this.getRunningFinished()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    athletes: state.athletes
});

OverView.propTypes = {
    enableActions: PropTypes.bool
};

export default connect(mapStateToProps, null)(OverView);
