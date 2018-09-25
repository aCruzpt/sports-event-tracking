import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startRace, endRace } from "../../store/actions";
import './Timer.css';
import { msToTime } from "../../utils/time";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerInterval: null,
            timer: "00:00:000"
        }
    }

    componentDidMount() {
        if (this.props.raceInProgress) this.startTimer();
    }

    componentDidUpdate() {
        if (this.state.timerInterval && !this.props.raceInProgress) this.clearInterval();
        if (!this.state.timerInterval && this.props.raceInProgress) this.startTimer();
    }

    renderTimerAction() {
        if (!this.props.enableActions) return;
        let startButton = (<button onClick={() => this.startRace()}>Start race</button>);
        let endButton = (<button onClick={() => this.endRace()}>End race</button>);

        return this.props.raceInProgress ? endButton : startButton;
    }

    startTimer() {
        let timerInterval = setInterval(() => {
            let startTime = new Date(this.props.raceStartTime).getTime();
            let currentTime = new Date().getTime();
            let diff = currentTime - startTime;
            let timer = msToTime(diff);

            this.setState({timer})

        }, 123);
        this.setState({timerInterval});
    }

    clearInterval() {
        clearInterval(this.state.timerInterval)
    }

    startRace() {
        this.startTimer();
        this.props.startRace();
    }

    endRace() {
        this.clearInterval();
        this.props.endRace();
    }

    render() {
        return (
            <div className="Race-timer">
                <div className="overview-title">Timer</div>
                <div className="overview-content">{this.state.timer}</div>
                <div className="timer-actions">
                    {this.renderTimerAction()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    raceInProgress: state.race.inProgress,
    raceStartTime: state.race.startTime
});

const mapDispatchToProps = (dispatch) => ({
    startRace: () => dispatch(startRace(new Date().toISOString())),
    endRace: () => dispatch(endRace())
});

Timer.propTypes = {
    enableActions: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
