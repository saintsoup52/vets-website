import React from 'react';
import ProfileGraph from '../ProfileGraph';

class SalaryRates extends React.Component {

  render() {
    const school = this.props.institution;
    const heading = <h3>Average Salaries<a onClick={this.props.toggleModalDisplay.bind(this, 'salaries')} className="info-icons"><i className="fa fa-info-circle info-icons outcomes-learnmore"></i></a></h3>;
    const averageValue = 33400;

    if (school.salaryAllStudents) {
      return (
        <div className="medium-6 columns">
          {heading}
          <ProfileGraph decimals={0} max={100000} average={averageValue} all={school.salaryAllStudents}/>
        </div>
      );
    }

    return (
      <div className="medium-6 columns">
        {heading}
        <p>Salary Data Not Available</p>
      </div>
    );
  }

}

SalaryRates.propTypes = {
  institution: React.PropTypes.object.isRequired,
  toggleModalDisplay: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool.isRequired
};

SalaryRates.defaultProps = {
  expanded: true
};

export default SalaryRates;
