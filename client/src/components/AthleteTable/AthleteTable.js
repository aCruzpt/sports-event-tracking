import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByTime } from "../../utils/time";
import './AthleteTable.css';
import '../flags/flags.min.css';
import AthleteTableRow from "./AthleteTableRow";

class AthleteTable extends Component {
    athletesInFinishCorridor() {
        return this.props.athletes
            .map(a => Object.assign({}, a))
            .filter(athlete => athlete.corridorTime);
    }

    sortedAthletes() {
        if (this.props.enableActions) {
            return this.props.athletes.map(a => Object.assign({}, a));
        }
        return sortByTime(this.athletesInFinishCorridor());
    }

    renderAthletes() {
        return this.sortedAthletes()
            .map((athlete,i) => {
                return <AthleteTableRow key={athlete.chipId} enableActions={this.props.enableActions} athlete={athlete}/>;
            });
    }

    render() {
        let lastCol = this.props.enableActions ? (<th width="230px">Actions</th>) : (<th width="120px">Finish time</th>);
        return (
            <div className="Athletes-table">
                <table>
                    <thead>
                    <tr>
                        <th width="100px">Chip ID</th>
                        <th width="120px">Start number</th>
                        <th width="100px">Country</th>
                        <th>Full name</th>
                        {lastCol}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderAthletes()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    raceInProgress: state.race.inProgress,
    athletes: state.athletes
});

AthleteTable.propTypes = {
    enableActions: PropTypes.bool
};

export default connect(mapStateToProps, null)(AthleteTable);
