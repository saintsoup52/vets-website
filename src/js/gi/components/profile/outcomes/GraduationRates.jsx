import React from 'react';
import ProfileGraph from '../ProfileGraph';

class GraduationRates extends React.Component {

  render() {
    const school = this.props.institution;
    const isNumeric = (n) => { return !Number.isNaN(parseFloat(n)); };
    const isaV = isNumeric(school.graduationRateVeteran);
    const isaC = isNumeric(school.graduationRateAllStudents);
    const heading = (
      <h3>
        Graduation Rate
        <a onClick={this.props.toggleModalDisplay.bind(this, 'gradrates')} className="info-icons">
          <i className="fa fa-info-circle info-icons outcomes-learnmore"></i>
        </a>
      </h3>
    );

    if (isaV || isaC) {
      const vetRate = isaV ? (parseFloat(school.graduationRateVeteran) * 100) : 'null';
      const allRate = isaC ? (parseFloat(school.graduationRateAllStudents) * 100) : 'null';
      const averageValue = 42.3;
      return (
        <div className="medium-6 columns">
          {heading}
          <ProfileGraph veterans={vetRate} all={allRate} average={averageValue}/>
        </div>
      );
    }

    return (
      <div className="medium-6 columns">
        {heading}
        <p>Grad Data Not Available</p>
      </div>
    );
  }

}

GraduationRates.propTypes = {
  institution: React.PropTypes.object.isRequired,
  toggleModalDisplay: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool.isRequired
};

GraduationRates.defaultProps = {
  expanded: true
};

export default GraduationRates;
