import React from 'react';
import If from '../../If';

class ResultsBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="calc-outputs large-5 large-offset-1 columns">
        <div id="calculated-benefits" className="align-center">
          <h3>Calculator Results</h3>
          <table className="calc-results-1 borderless">
            <tbody>
              <If condition={this.props.showCalcHousingAllowRateRow}>
                <tr id="calc-housing-allow-rate-row">
                  <th className="noborder align-right">Housing Allowance:</th>
                  <td colSpan="2" id="housing-allow-rate" className="noborder align-left">{this.props.housingAllowRate}</td>
                </tr>
              </If>
              <tr></tr>
              <If condition={this.props.showCalcTermTotalRow}>
                <tr id="calc-term-total-row">
                  <th colSpan="2" className="noborder align-right data-row border-bottom">Total GI Bill Benefits:</th>
                  <td id="total-year" className="noborder align-left data-row"><b>{this.props.totalYear}</b></td>
                </tr>
              </If>
              <If condition={this.props.showCalcPaidToSchoolTotalRow}>
                <tr id="calc-paid-to-school-total-row">
                  <td colSpan="2" className="noborder align-right data-row">Paid to school:</td>
                  <td id="total-paid-to-school" className="noborder align-left data-row">{this.props.totalPaidToSchool}</td>
                </tr>
              </If>
              <If condition={this.props.showCalcPaidToYouTotalRow}>
                <tr id="calc-paid-to-you-total-row">
                  <td colSpan="2" className="noborder align-right data-row">Paid to You:</td>
                  <td id="total-paid-to-you" className="noborder align-left data-row">{this.props.totalPaidToYou}</td>
                </tr>
              </If>
              <tr></tr>
              <If condition={this.props.showCalcOutOfPocketRow}>
                <tr id="calc-out-of-pocket-row">
                  <th colSpan="2" className="noborder align-right data-row">Out of Pocket Tuition:</th>
                  <td id="total-left-to-pay" className="noborder align-left data-row">{this.props.totalLeftToPay}</td>
                </tr>
              </If>
              <If condition={this.props.showCalcTuitionFeesChargedRow}>
                <tr id="calc-tuition-fees-charged-row">
                  <td colSpan="2" className="noborder align-right data-row">Tuition &amp; Fees Charged:</td>
                  <td id="total-tuition-fees-charged" className="noborder align-left data-row">{this.props.totalTuitionFeesCharged}</td>
                </tr>
              </If>
              <If condition={this.props.showCalcTuitionFeesScholarshipRow}>
                <tr id="calc-tuition-fees-scholarship-row">
                  <td colSpan="2" className="noborder align-right data-row">Your Scholarships:</td>
                  <td id="total-tuition-fees-scholarships" className="noborder align-left data-row">{this.props.totalTuitionFeesScholarships}</td>
                </tr>
              </If>
              <If condition={this.props.showCalcSchoolReceivedRow}>
                <tr id="calc-school-received-row">
                  <td colSpan="2" className="noborder align-right data-row">GI Bill Pays:</td>
                  <td id="total-school-received" className="noborder align-left data-row">{this.props.totalSchoolReceived}</td>
                </tr>
              </If>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

ResultsBox.propTypes = {
  showCalcHousingAllowRateRow: React.PropTypes.bool.isRequired,
  showCalcTermTotalRow: React.PropTypes.bool.isRequired,
  showCalcPaidToSchoolTotalRow: React.PropTypes.bool.isRequired,
  showCalcPaidToYouTotalRow: React.PropTypes.bool.isRequired,
  showCalcOutOfPocketRow: React.PropTypes.bool.isRequired,
  showCalcTuitionFeesChargedRow: React.PropTypes.bool.isRequired,
  showCalcTuitionFeesScholarshipRow: React.PropTypes.bool.isRequired,
  showCalcSchoolReceivedRow: React.PropTypes.bool.isRequired,
  housingAllowRate: React.PropTypes.string,
  totalYear: React.PropTypes.string,
  totalPaidToSchool: React.PropTypes.string,
  totalPaidToYou: React.PropTypes.string,
  totalLeftToPay: React.PropTypes.string,
  totalTuitionFeesCharged: React.PropTypes.string,
  totalTuitionFeesScholarships: React.PropTypes.string,
  totalSchoolReceived: React.PropTypes.string
};

ResultsBox.defaultProps = {
  showCalcHousingAllowRateRow: true,
  showCalcTermTotalRow: true,
  showCalcPaidToSchoolTotalRow: true,
  showCalcPaidToYouTotalRow: true,
  showCalcOutOfPocketRow: true,
  showCalcTuitionFeesChargedRow: true,
  showCalcTuitionFeesScholarshipRow: true,
  showCalcSchoolReceivedRow: true,
  housingAllowRate: '$default',
  totalYear: '$default',
  totalPaidToSchool: '$default',
  totalPaidToYou: '$default',
  totalLeftToPay: '$default',
  totalTuitionFeesCharged: '$default',
  totalTuitionFeesScholarships: '$default',
  totalSchoolReceived: '$default'
};

export default ResultsBox;
