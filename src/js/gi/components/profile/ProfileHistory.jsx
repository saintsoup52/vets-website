import React from 'react';

class ProfileHistory extends React.Component {

  render() {
    const fiscalYear = 'FY\'14'; // TODO: this shouldn't be hard-coded
    const school = this.props.institution;

    // Formats positive and negative currency values in USD
    const formatCurrency = (num) => {
      const str = Number(num).toFixed(2).toString().split('.');
      // Match a digit if it's followed by 3 other digits,
      // appending a comma to each match.
      const regex = /\d(?=(\d{3})+$)/g;
      return [
        '$',
        [str[0].replace(regex, '$&,'), str[1]].join('.')
      ].join('').replace('$-', '-$');
    };

    const formatNumber = (num) => {
      const str = Math.round(Number(num)).toString();
      // Match a digit if it's followed by 3 other digits,
      // appending a comma to each match.
      const regex = /\d(?=(\d{3})+$)/g;
      return str.replace(regex, '$&,');
    };

    return (
      <div className="usa-width-one-whole">
        <table className="usa-table-borderless">
          <thead>
            <tr>
              <th scope="col">Benefit</th>
              <th scope="col">Recipients</th>
              <th scope="col">Paid ({fiscalYear})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="text-left">Post-9/11 GI Bill:</th>
              <td>{formatNumber(school.p911Recipients)}</td>
              <td>{formatCurrency(school.p911TuitionFees)}</td>
            </tr>
            <tr>
              <th scope="row" className="text-left">Yellow Ribbon:</th>
              <td>{formatNumber(school.p911YrRecipients)}</td>
              <td>{formatCurrency(school.p911YellowRibbon)}</td>
            </tr>
          </tbody>
        </table>
        <table className="usa-table-borderless">
          <thead>
            <tr>
              <th scope="col">Additional Information</th>
              <th scope="col">&nbsp;</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>VA Facility Code:&nbsp;<a onClick={this.props.toggleModalDisplay.bind(this, 'facilityCode')} className="info-icons"><i id="va-facility-code-info" className="fa fa-info-circle info-icons"></i></a></td>
              <td>{school.facilityCode ? school.facilityCode : 'No Data'}</td>
              <td></td>
            </tr>
            <tr>
              <td>ED IPEDS Code:&nbsp;<a onClick={this.props.toggleModalDisplay.bind(this, 'ipedsCode')} className="info-icons"><i id="ipeds-code-info" className="fa fa-info-circle info-icons"></i></a></td>
              <td>{school.cross ? school.cross : 'No Data'}</td>
              <td></td>
            </tr>
            <tr>
              <td>ED OPE Code:&nbsp;<a onClick={this.props.toggleModalDisplay.bind(this, 'opeCode')} className="info-icons"><i id="ed-ope-code-info" className="fa fa-info-circle info-icons"></i></a></td>
              <td>{school.ope ? school.ope : 'No Data'}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

ProfileHistory.propTypes = {
  institution: React.PropTypes.object.isRequired,
  toggleModalDisplay: React.PropTypes.func,
  expanded: React.PropTypes.bool.isRequired
};

ProfileHistory.defaultProps = {
  expanded: true
};

export default ProfileHistory;
