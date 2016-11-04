import React from 'react';
import ProfileGraph from '../ProfileGraph';

class RetentionRates extends React.Component {

  // Calculates veteran retention rate
  getVeteranRetentionRate() {
    const school = this.props.institution;
    const upperClass = () => {
      const a = [3, 4].includes(school.predDegreeAwarded);
      const b = String(school.vaHighestDegreeOffered).toLowerCase() === '4-year';
      return a || b;
    };
    const firstPresentValue = (v1, v2) => {
      if (v1 === null) return v2;
      return v1;
    };

    if (upperClass()) {
      return firstPresentValue(school.retentionRateVeteranBa, school.retentionRateVeteranOtb);
    }
    return firstPresentValue(school.retentionRateVeteranOtb, school.retentionRateVeteranBa);
  }

  getAllStudentRetentionRate() {
    const school = this.props.institution;
    const upperClass = () => {
      const a = [3, 4].includes(school.predDegreeAwarded);
      const b = String(school.vaHighestDegreeOffered).toLowerCase() === '4-year';
      return a || b;
    };
    const firstPresentValue = (v1, v2) => {
      if (v1 === null) return v2;
      return v1;
    };

    if (upperClass()) {
      return firstPresentValue(school.retentionAllStudentsBa, school.retentionAllStudentsOtb);
    }
    return firstPresentValue(school.retentionAllStudentsOtb, school.retentionAllStudentsBa);
  }

  render() {
    const heading = <h3>Retention Rate<a onClick={this.props.toggleModalDisplay.bind(this, 'retention')} className="info-icons"><i className="fa fa-info-circle info-icons outcomes-learnmore"></i></a></h3>;
    const isNumeric = (n) => { return !Number.isNaN(parseFloat(n)); };
    const isaV = isNumeric(this.getVeteranRetentionRate());
    const isaC = isNumeric(this.getAllStudentRetentionRate());

    if (isaV || isaC) {
      const vetRate = isaV ? (parseFloat(this.getVeteranRetentionRate()) * 100) : null;
      const allRate = isaC ? (parseFloat(this.getAllStudentRetentionRate()) * 100) : null;
      const averageValue = 67.7;
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
        <p>Retention Rate Data Not Available</p>
      </div>
    );
  }

}

RetentionRates.propTypes = {
  institution: React.PropTypes.object.isRequired,
  toggleModalDisplay: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool.isRequired
};

RetentionRates.defaultProps = {
  expanded: true
};

export default RetentionRates;
