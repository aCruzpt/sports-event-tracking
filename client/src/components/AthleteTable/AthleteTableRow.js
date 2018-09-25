import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enterCorridor, finish } from "../../store/actions";
import { msToTime } from "../../utils/time";
import './AthleteTable.css';
import '../flags/flags.min.css';

class AthleteTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            athlete: props.athlete
        }
    }

    componentDidMount() {
        if (!this.props.enableActions) this.scrollToAthlete();
    }

    componentDidUpdate() {
        if (!this.props.enableActions) this.scrollToAthlete();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.athlete !== this.props.athlete){
            this.setState({athlete: nextProps.athlete});
        }
    }

    scrollToAthlete = () => {
        this.athleteRow.scrollIntoView({ behavior: "smooth" });
    };

    disableEnterCorridorBtn() {
        let raceHasNotStarted = !this.props.raceInProgress;
        let athleteHasEnteredFinishCorridor = this.state.athlete.corridorTime;
        return !!raceHasNotStarted || !!athleteHasEnteredFinishCorridor;
    }

    disableFinishBtn() {
        let raceHasNotStarted = !this.props.raceInProgress;
        let athleteHasNotEnteredFinishCorridor = !this.state.athlete.corridorTime;
        let athleteHasFinished = this.state.athlete.finishTime;
        return !!raceHasNotStarted || !!athleteHasNotEnteredFinishCorridor || !!athleteHasFinished;
    }

    getActionButtons() {
        let enterCorridorBtn = (
            <button disabled={this.disableEnterCorridorBtn()} className="athlete-btn"
                    onClick={() => this.props.enterCorridor(this.state.athlete.chipId)}>
                Enter corridor
            </button>
        );

        let finishBtn = (
            <button disabled={this.disableFinishBtn()} className="athlete-btn"
                    onClick={() => this.props.finish(this.state.athlete.chipId)}>
                Finish
            </button>
        );
        return (
            <td>
                {enterCorridorBtn}
                {finishBtn}
            </td>
        )
    }

    getFinishTime() {
        return (<td>{msToTime(this.state.athlete.finishTime)}</td>);
    }

    render() {
        return (
            <tr ref={(el) => { this.athleteRow = el; }}>
                <td>{this.state.athlete.chipId}</td>
                <td>{this.state.athlete.startNumber}</td>
                <td><div className={"flag flag-" + this.state.athlete.country}/></td>
                <td>{this.state.athlete.fullName}</td>
                {this.props.enableActions ? this.getActionButtons() : this.getFinishTime()}
            </tr>
        );
    }
}

const mapStateToProps = (state) => ({
    raceInProgress: state.race.inProgress
});

const mapDispatchToProps = (dispatch) => ({
    enterCorridor: (athleteChipId) => dispatch(enterCorridor(athleteChipId, new Date().toISOString())),
    finish: (athleteChipId) => dispatch(finish(athleteChipId, new Date().toISOString()))
});

AthleteTableRow.propTypes = {
    athlete: PropTypes.object.isRequired,
    enableActions: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(AthleteTableRow);
