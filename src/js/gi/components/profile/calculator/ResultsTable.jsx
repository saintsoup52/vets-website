import React from 'react';
import If from '../../If';

class ResultsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="usa-width-one-whole newrow term-calc-results">
        <table className="calc-results-2">
          <thead>
            <tr id="payments-to-you-terms">
              <th aria-hidden="false"></th>
              <If condition={this.props.showTerm1}>
                <th className="term1">Term1</th>
              </If>
              <If condition={this.props.showTerm2}>
                <th className="term2">Term2</th>
              </If>
              <If condition={this.props.showTerm3}>
                <th className="term3">Term3</th>
              </If>
              <If condition={this.props.showTerm4}>
                <th className="term4">Total</th>
              </If>
            </tr>
          </thead>
          <tbody>
            <If condition={this.props.showCalcTuitionFeesRow}>
              <tr id="calc-tuition-fees-row">
                <th>
                  <a id="tuition-fees-benefit-calc-info-link-out" href="http://www.benefits.va.gov/gibill/comparison_tool/about_this_tool.asp#tuitionfees"> {/* TODO: oldOnClick="track('Tool Tips', 'Benefit Calculator / Tuition Fees');" target="_blank" alt="Click here for more information about the tuition/fees benefit." */}
                    Tuition / Fees Benefit:
                  </a>
                </th>
                <td id="tuition-fees-term-1">{this.props.tuitionFeesTerm1}</td>
                <If condition={this.props.showTuitionFeesTerm2}>
                  <td id="tuition-fees-term-2">{this.props.tuitionFeesTerm2}</td>
                </If>
                <If condition={this.props.showTuitionFeesTerm3}>
                  <td id="tuition-fees-term-3">{this.props.tuitionFeesTerm3}</td>
                </If>
                <td id="tuition-fees-total" style={{ fontWeight: 'bold' }}>{this.props.tuitionFeesTotal}</td>
              </tr>
            </If>
            <If condition={this.props.showCalcYellowRibbonRow}>
              <tr id="calc-yellow-ribbon-row">
                <th>
                  <a id="yellow-ribbon-school-calc-info-link-out" href="http://www.benefits.va.gov/gibill/comparison_tool/about_this_tool.asp#yellowribbon"> {/* TODO: oldOnClick="track('Tool Tips', 'Benefit Calculator / Yellow Ribbon (School)');" target="_blank" alt="Click here for more information." */}
                    Yellow Ribbon (School):
                  </a>
                </th>
                <td id="yr-ben-term-1">{this.props.yrBenTerm1}</td>
                <If condition={this.props.showYrBenTerm2}>
                  <td id="yr-ben-term-2">{this.props.yrBenTerm2}</td>
                </If>
                <If condition={this.props.showYrBenTerm3}>
                  <td id="yr-ben-term-3">{this.props.yrBenTerm3}</td>
                </If>
                <td id="yr-ben-total" style={{ fontWeight: 'bold' }}>{this.props.yrBenTotal}</td>
              </tr>
            </If>
            <If condition={this.props.showCalcYellowRibbonVaRow}>
              <tr id="calc-yellow-ribbon-va-row">
                <th>
                  <a id="yellow-ribbon-va-calc-info-link-out" href="http://www.benefits.va.gov/gibill/comparison_tool/about_this_tool.asp#yellowribbon"> {/* TODO: oldOnClick="track('Tool Tips', 'Benefit Calculator / Yellow Ribbon (VA)');" target="_blank" alt="Click here for more information." */}
                    Yellow Ribbon (VA):
                  </a>
                </th>
                <td id="yr-ben-term-va-1">{this.props.yrBenTermVa1}</td>
                <If condition={this.props.showYrBenTermVa2}>
                  <td id="yr-ben-term-va-2">{this.props.yrBenTermVa2}</td>
                </If>
                <If condition={this.props.showYrBenTermVa3}>
                  <td id="yr-ben-term-va-3">{this.props.yrBenTermVa3}</td>
                </If>
                <td id="yr-ben-va-total" style={{ fontWeight: 'bold' }}>{this.props.yrBenVaTotal}</td>
              </tr>
            </If>

            <tr>
              <th>
                <a id="housing allowance-calc-info-link-out" href="http://www.benefits.va.gov/gibill/comparison_tool/about_this_tool.asp#housingallowance"> {/* TODO: oldOnClick="track('Tool Tips', 'Benefit Calculator / Housing Allowance');" target="_blank" alt="Click here for more information about the housing allowance." */}
                  Housing Allowance:
                </a>
              </th>
              <td id="housing-allow-term-1">{this.props.housingAllowTerm1}</td>
              <If condition={this.props.showHousingAllowTerm2}>
                <td id="housing-allow-term-2">{this.props.housingAllowTerm2}</td>
              </If>
              <If condition={this.props.showHousingAllowTerm3}>
                <td id="housing-allow-term-3">{this.props.housingAllowTerm3}</td>
              </If>
              <td id="housing-allow-total" style={{ fontWeight: 'bold' }}>{this.props.housingAllowTotal}</td>
            </tr>

            <tr>
              <th>
                <a id="book-stipend-calc-info-link-out" href="http://www.benefits.va.gov/gibill/comparison_tool/about_this_tool.asp#bookstipend"> {/* TODO: oldOnClick="track('Tool Tips', 'Benefit Calculator / Book Stipend');" target="_blank" alt="Click here for more information about the book stipend." */}
                  Book Stipend:
                </a>
              </th>
              <td id="book-stipend-term-1">{this.props.bookStipendTerm1}</td>
              <If condition={this.props.showBookStipendTerm2}>
                <td id="book-stipend-term-2">{this.props.bookStipendTerm2}</td>
              </If>
              <If condition={this.props.showBookStipendTerm3}>
                <td id="book-stipend-term-3">{this.props.bookStipendTerm3}</td>
              </If>
              <td id="book-stipend-total" style={{ fontWeight: 'bold' }}>{this.props.bookStipendTotal}</td>
            </tr>

          </tbody>
        </table>
      </div>
    );
  }

}

ResultsTable.propTypes = {
  showTerm1: React.PropTypes.bool.isRequired,
  showTerm2: React.PropTypes.bool.isRequired,
  showTerm3: React.PropTypes.bool.isRequired,
  showTerm4: React.PropTypes.bool.isRequired,
  showCalcTuitionFeesRow: React.PropTypes.bool.isRequired,
  showTuitionFeesTerm2: React.PropTypes.bool.isRequired,
  showTuitionFeesTerm3: React.PropTypes.bool.isRequired,
  showCalcYellowRibbonRow: React.PropTypes.bool.isRequired,
  showYrBenTerm2: React.PropTypes.bool.isRequired,
  showYrBenTerm3: React.PropTypes.bool.isRequired,
  showCalcYellowRibbonVaRow: React.PropTypes.bool.isRequired,
  showYrBenTermVa2: React.PropTypes.bool.isRequired,
  showYrBenTermVa3: React.PropTypes.bool.isRequired,

  showHousingAllowTerm2: React.PropTypes.bool.isRequired,
  showHousingAllowTerm3: React.PropTypes.bool.isRequired,
  showBookStipendTerm2: React.PropTypes.bool.isRequired,
  showBookStipendTerm3: React.PropTypes.bool.isRequired,

  tuitionFeesTerm1: React.PropTypes.string,
  tuitionFeesTerm2: React.PropTypes.string,
  tuitionFeesTerm3: React.PropTypes.string,
  tuitionFeesTotal: React.PropTypes.string,
  yrBenTerm1: React.PropTypes.string,
  yrBenTerm2: React.PropTypes.string,
  yrBenTerm3: React.PropTypes.string,
  yrBenTotal: React.PropTypes.string,
  yrBenTermVa1: React.PropTypes.string,
  yrBenTermVa2: React.PropTypes.string,
  yrBenTermVa3: React.PropTypes.string,
  yrBenVaTotal: React.PropTypes.string,
  housingAllowTerm1: React.PropTypes.string,
  housingAllowTerm2: React.PropTypes.string,
  housingAllowTerm3: React.PropTypes.string,
  housingAllowTotal: React.PropTypes.string,
  bookStipendTerm1: React.PropTypes.string,
  bookStipendTerm2: React.PropTypes.string,
  bookStipendTerm3: React.PropTypes.string,
  bookStipendTotal: React.PropTypes.string
};

ResultsTable.defaultProps = {
  showTerm1: true,
  showTerm2: true,
  showTerm3: true,
  showTerm4: true,
  showCalcTuitionFeesRow: true,
  showTuitionFeesTerm2: true,
  showTuitionFeesTerm3: true,
  showCalcYellowRibbonRow: true,
  showYrBenTerm2: true,
  showYrBenTerm3: true,
  showCalcYellowRibbonVaRow: true,
  showYrBenTermVa2: true,
  showYrBenTermVa3: true,
  showHousingAllowTerm2: true,
  showHousingAllowTerm3: true,
  showBookStipendTerm2: true,
  showBookStipendTerm3: true,
  tuitionFeesTerm1: '$default',
  tuitionFeesTerm2: '$default',
  tuitionFeesTerm3: '$default',
  tuitionFeesTotal: '$default',
  yrBenTerm1: '$default',
  yrBenTerm2: '$default',
  yrBenTerm3: '$default',
  yrBenTotal: '$default',
  yrBenTermVa1: '$default',
  yrBenTermVa2: '$default',
  yrBenTermVa3: '$default',
  yrBenVaTotal: '$default',
  housingAllowTerm1: '$default',
  housingAllowTerm2: '$default',
  housingAllowTerm3: '$default',
  housingAllowTotal: '$default',
  bookStipendTerm1: '$default',
  bookStipendTerm2: '$default',
  bookStipendTerm3: '$default',
  bookStipendTotal: '$default'
};

export default ResultsTable;
