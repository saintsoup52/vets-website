import React from 'react';
import ProfileGraph from '../ProfileGraph';

class RepaymentRates extends React.Component {

  render() {
    const school = this.props.institution;
    const heading = <h3>Repayment Rate<a onClick={this.props.toggleModalDisplay.bind(this, 'repayment')} className="info-icons"><i className="fa fa-info-circle info-icons outcomes-learnmore"></i></a></h3>;
    const allBarValue = parseFloat(school.repaymentRateAllStudents) * 100;
    const averageValue = 67.9;
    if (school.salaryAllStudents) {
      return (
        <div className="medium-6 columns">
          {heading}
          <ProfileGraph average={averageValue} veterans={null} all={allBarValue}/>
        </div>
      );
    }
    return (
      <div className="medium-6 columns">
        {heading}
        <p>Repayment Data Not Available</p>
      </div>
    );
  }
}

RepaymentRates.propTypes = {
  institution: React.PropTypes.object.isRequired,
  toggleModalDisplay: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool.isRequired
};

RepaymentRates.defaultProps = {
  expanded: true
};

export default RepaymentRates;
