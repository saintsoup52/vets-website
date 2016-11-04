import React from 'react';
import ResultsBox from './ResultsBox';
import ResultsTable from './ResultsTable';

class BenefitCalculatorResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const calculated = this.props.calculatorState;
    console.log({ calculated });
    // TODO: deal with antiquated oldOnClick attributes
    return (
      <div>
        <ResultsBox
            housingAllowRate={calculated.housingAllowRate}
            totalYear={calculated.totalYear}
            totalPaidToSchool={calculated.totalPaidToSchool}
            totalPaidToYou={calculated.totalPaidToYou}
            totalLeftToPay={calculated.totalLeftToPay}
            totalTuitionFeesCharged={calculated.totalTuitionFeesCharged}
            totalTuitionFeesScholarships={calculated.totalTuitionFeesScholarships}
            totalSchoolReceived={calculated.totalSchoolReceived}/>
        <ResultsTable/>
      </div>
    );
  }

}

BenefitCalculatorResults.propTypes = {
  // toggleModalDisplay: React.PropTypes.func.isRequired,
  calculatorState: React.PropTypes.object.isRequired,
};

BenefitCalculatorResults.defaultProps = {};

export default BenefitCalculatorResults;
