import React from 'react';
import BenefitCalculatorForm from './BenefitCalculatorForm';
import BenefitCalculatorResults from './BenefitCalculatorResults';

class BenefitCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.updateInputState = this.updateInputState.bind(this);
    this.calculate = this.calculate.bind(this);

    const yesNoBool = (yesNoStr) => {
      return yesNoStr.toLowerCase() === 'yes';
    };

    // initialize state derived from passed-in props
    this.state = {
      institutionType: this.props.institution.institutionType.name,
      militaryStatus: this.props.militaryStatus,
      spouseActiveDuty: yesNoBool(this.props.spouseActiveDuty),
      giBillChapter: Number(this.props.giBillChapter),
      eligForPostGiBill: yesNoBool(this.props.eligForPostGiBill),
      serviceDischarge: (this.props.cumulativeService === 'service discharge'),
      consecutiveService: Number(this.props.consecutiveService),
      enlistmentService: this.props.enlistmentService,
      online: yesNoBool(this.props.online),
    };
    if (!this.state.serviceDischarge) {
      this.state.cumulativeService = parseFloat(this.props.cumulativeService);
    } else {
      this.state.cumulativeService = 1.0;
    }
    this.state.calcOldGiBill = [30, 35, 1606, 1607].includes(this.state.giBillChapter);
  }

  initializeInputState() {
    const t = this.formatCurrency(this.props.institution.tuitionInState);
    const b = this.formatCurrency(this.props.institution.books);
    this.updateInputState('inStateTuitionFees', t);
    this.updateInputState('tuitionFees', t);
    this.updateInputState('books', b);

    if (this.props.institution.calendar) {
      this.updateInputState('calendar', this.props.institution.calendar.toLowerCase());
    } else {
      this.updateInputState('calendar', 'semesters');
    }
    this.updateInputState('yellowBen', '$0');
    this.updateInputState('rop', '1.0');
    this.updateInputState('ropOld', 'full');
    this.updateInputState('ojtWorking', '30');
    this.updateInputState('numberNontradTerms', '3');
    this.updateInputState('lengthNontradTerms', '3');
    this.updateInputState('kicker', '$200');
    this.updateInputState('buyUp', '600');
    this.updateInputState('scholar', '$0');
    this.updateInputState('tuitionAssist', '$0');
  }

  // Formats positive and negative currency values in USD
  formatCurrency(num) {
    const str = Math.round(Number(num)).toString();
    // Match a digit if it's followed by 3 other digits,
    // appending a comma to each match.
    const regex = /\d(?=(\d{3})+$)/g;
    return ['$', str.replace(regex, '$&,')].join('').replace('$-', '-$');
  }

  // Coerces currency strings back into numbers
  getCurrency(currency) {
    const regex = /[^0-9\.]+/g;
    if (currency === undefined) {
      currency = '$0';
    }
    return Number(currency.replace(regex, ''));
  }

  updateInputState(key, rawValue) {
    const inputTypes = {
      inState: 'yesNoBoolean',
      yellowRibbon: 'yesNoBoolean',
      kickerElig: 'yesNoBoolean',
      buyUpElig: 'yesNoBoolean',
      tuitionFees: 'currency',
      inStateTuitionFees: 'currency',
      books: 'currency',
      yellowBen: 'currency',
      scholar: 'currency',
      tuitionAssist: 'currency',
      numberNontradTerms: 'number',
      rop: 'simple',
      ropOld: 'simple',
      calendar: 'simple',
      ojtWorking: 'simple',
      lengthNontradTerms: 'simple',
      kicker: 'simple',
      buyUp: 'simple'
    };
    switch (inputTypes[key]) {
      case 'simple':
        this.setState({ [key]: rawValue });
        break;
      case 'yesNoBoolean':
        this.setState({ [key]: rawValue.toLowerCase() === 'yes' });
        break;
      case 'currency':
        const getCurrency = (v) => {
          const regex = /[^0-9\.]+/g;
          return Number(v.replace(regex, ''));
        };
        this.setState({ [key]: getCurrency(rawValue) });
        break;
      case 'number':
        this.setState({ [key]: Number(rawValue) });
        break;
      default:
        console.warn({ key });
        throw 'updateInputState Type Error';
    }
  }

  render() {
    return (
      <div id="benefit-calculator">
        <h4>Calculate Your Detailed Benefits</h4>
        <BenefitCalculatorForm
            institution={this.props.institution}
            setInputState={this.updateInputState}
            toggleModalDisplay={this.props.toggleModalDisplay}
            calculatorState={Object.assign({}, this.state)}/>
        <BenefitCalculatorResults
            calculatorState={Object.assign({}, this.state)}/>
      </div>
    );
  }

  calculate() {
    console.log('calculate() executed');

    const school = this.props.institution;

    // Calculate if eligible for VR&E and Post-9/11 Benefits - getVreOnly
    this.state.calcVreOnly = (this.state.giBillChapter === 31 && !this.state.eligForPostGiBill);

    // Calculate if monthly benefit can only be spent on tuition/fees - getOnlyTuitionFees
    if (this.state.militaryStatus === 'active duty' &&
        (this.state.giBillChapter === 30 || this.state.giBillChapter === 1607)) {
      this.state.calcOnlyTuitionFees = true;
    } else if ((this.state.institutionType === 'correspondence' ||
        this.state.institutionType === 'flight') && this.state.calcOldGiBill === true) {
      this.state.calcOnlyTuitionFees = true;
    } else if ((this.state.ropOld === 'less than half' || this.state.ropOld === 'quarter') &&
        (this.state.giBillChapter === 30 || this.state.giBillChapter === 1607 || this.state.giBillChapter === 35)) {
      this.state.calcOnlyTuitionFees = true;
    } else {
      this.state.calcOnlyTuitionFees = false;
    }

    // Calculate the monthly benefit rate for non-chapter 33 benefits - getMonthlyRate
    this.state.calcMonthlyRate = 0;
    if (this.state.giBillChapter === 30 && this.state.enlistmentService === 3 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.MGIB3YRRATE * 0.75;
    } else if (this.state.giBillChapter === 30 && this.state.enlistmentService === 3) {
      this.state.calcMonthlyRate = this.props.constants.MGIB3YRRATE;
    } else if (this.state.giBillChapter === 30 && this.state.enlistmentService === 2 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.MGIB2YRRATE * 0.75;
    } else if (this.state.giBillChapter === 30 && this.state.enlistmentService === 2) {
      this.state.calcMonthlyRate = this.props.constants.MGIB2YRRATE;
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.MGIB3YRRATE * this.state.consecutiveService * 0.75;
    } else if (this.state.giBillChapter === 1607) {
      this.state.calcMonthlyRate = this.props.constants.MGIB3YRRATE * this.state.consecutiveService;
    } else if (this.state.giBillChapter === 1606 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.SRRATE * 0.75;
    } else if (this.state.giBillChapter === 1606) {
      this.state.calcMonthlyRate = this.props.constants.SRRATE;
    } else if (this.state.giBillChapter === 35 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.DEARATEOJT;
    } else if (this.state.giBillChapter === 35 && this.state.institutionType === 'flight') {
      this.state.calcMonthlyRate = 0;
    } else if (this.state.giBillChapter === 35) {
      this.state.calcMonthlyRate = this.props.constants.DEARATE;
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend === 0 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.VRE0DEPRATEOJT;
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend === 0) {
      this.state.calcMonthlyRate = this.props.constants.VRE0DEPRATE;
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend === 1 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.VRE1DEPRATEOJT;
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend === 1) {
      this.state.calcMonthlyRate = this.props.constants.VRE1DEPRATE;
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend === 2 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.VRE2DEPRATEOJT;
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend === 2) {
      this.state.calcMonthlyRate = this.props.constants.VRE2DEPRATE;
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend > 2 && this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRate = this.props.constants.VRE2DEPRATEOJT + ((this.state.numberOfDepend - 2) * this.props.constants.REINCRATEOJT);
    } else if (this.state.giBillChapter === 31 && this.state.numberOfDepend > 2) {
      this.state.calcMonthlyRate = this.props.constants.VRE2DEPRATE + ((this.state.numberOfDepend - 2) * this.props.constants.VREINCRATE);
    }

    // getTier
    if (this.state.giBillChapter === 31 && this.state.post911Elig === true) {
      this.state.calcTier = 1;
    } else {
      this.state.calcTier = parseFloat(this.state.cumulativeService);
    }

    // Calculate the prepopulated value out-of-state tuiton rates - getTuitionOutOfState
    this.state.calcTuitionOutOfState = school.tuitionOutOfState;

    // Calculate the total number of academic terms - getNumberOfTerms
    if (this.state.institutionType === 'ojt') {
      this.state.calcNumberOfTerms = 3;
    } else if (this.state.calendar === 'semesters') {
      this.state.calcNumberOfTerms = 2;
    } else if (this.state.calendar === 'quarters') {
      this.state.calcNumberOfTerms = 3;
    } else if (this.state.calendar === 'nontraditional') {
      this.state.calcNumberOfTerms = this.state.numberNontradTerms;
    }

    // Set the net price (Payer of Last Resort) - getTuitionNetPrice
    this.state.calcTuitionNetPrice = Math.max(0, Math.min(
      this.state.tuitionFees - this.state.scholar - this.state.tuitionAssist
    ));

    // Set the proper tuition/fees cap - getTuitionFeesCap
    if (this.state.institutionType === 'flight') {
      this.state.calcTuitionFeesCap = this.props.constants.FLTTFCAP;
    } else if (this.state.institutionType === 'correspondence') {
      this.state.calcTuitionFeesCap = this.props.constants.CORRESPONDTFCAP;
    } else if (this.state.institutionType === 'public' &&
          school.country.toLowerCase() === 'usa' && this.state.inState) {
      this.state.calcTuitionFeesCap = this.state.tuitionFees;
    } else if (this.state.institutionType === 'public' &&
          school.country.toLowerCase() === 'usa' && !this.state.inState) {
      this.state.calcTuitionFeesCap = this.state.inStateTuitionFees;
    } else if (this.state.institutionType === 'private' || this.state.institutionType === 'foreign') {
      this.state.calcTuitionFeesCap = this.props.constants.TFCAP;
    }

    // Calculate the tuition/fees per term - getTuitionFeesPerTerm
    this.state.calcTuitionFeesPerTerm = this.getCurrency(this.state.tuitionFees) / this.state.calcNumberOfTerms;
    console.log('this.state.calcTuitionFeesPerTerm', this.state.calcTuitionFeesPerTerm);

    // Calculate the length of each term - getTermLength
    if (this.state.calendar === 'semesters') {
      this.state.calcTermLength = 4.5;
    } else if (this.state.calendar === 'quarters') {
      this.state.calcTermLength = 3;
    } else if (this.state.calendar === 'nontraditional') {
      this.state.calcTermLength = this.state.lengthNontradTerms;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcTermLength = 6;
    }

    // Calculate the length of the academic year - getAcadYearLength
    if (this.state.calendar === 'nontraditional') {
      this.state.calcAcadYearLength = this.state.numberNontradTerms * this.state.lengthNontradTerms;
    } else {
      this.state.calcAcadYearLength = 9;
    }

    // Calculate the rate of pursuit for Book Stipend - getRopBook
    if (this.state.rop === 1) {
      this.state.calcRopBook = 1;
    } else if (this.state.rop === 0.8) {
      this.state.calcRopBook = 0.75;
    } else if (this.state.rop === 0.6) {
      this.state.calcRopBook = 0.50;
    } else if (this.state.rop === 0) {
      this.state.calcRopBook = 0.25;
    }

    // Calculate the rate of pursuit for Old GI Bill - getCalcRopOld
    if (this.state.institutionType === 'ojt') {
      this.state.calcRopOld = this.state.ojtWorking / 30;
    } else if (this.state.ropOld === 'full') {
      this.state.calcRopOld = 1;
    } else if (this.state.ropOld === 'three quarter') {
      this.state.calcRopOld = 0.75;
    } else if (this.state.ropOld === 'half') {
      this.state.calcRopOld = 0.50;
    } else if (this.state.ropOld === 'less than half') {
      this.state.calcRopOld = 0.50;
    } else if (this.state.ropOld === 'quarter') {
      this.state.calcRopOld = 0.25;
    }

    // Calculate the rate of pursuit for OJT - getRopOjt
    this.state.calcRopOjt = this.state.ojtWorking / 30;

    // Determine yellow ribbon eligibility - getYellowRibbonEligibility
    if (this.state.calcTier < 1 || !school.yr || !this.state.yellowRibbon || this.state.militaryStatus === 'active duty') {
      this.state.calcYellowRibbonElig = false;
    } else if (this.state.institutionType === 'ojt' || this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence') {
      this.state.calcYellowRibbonElig = false;
    } else {
      this.state.calcYellowRibbonElig = true;
    }

    // Determine kicker benefit level - getKickerBenefit
    if (!this.state.kickerElig) {
      this.state.calcKickerBenefit = 0;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcKickerBenefit = this.state.kicker * this.state.calcRopOjt;
    } else if (this.state.calcOldGiBill === true || this.state.calcVreOnly === true) {
      this.state.calcKickerBenefit = this.state.kicker * this.state.calcRopOld;
    } else {
      this.state.calcKickerBenefit = this.state.kicker * this.state.rop;
    }

    // Determine buy up rates - getBuyUpRate
    if (!this.state.buyUpElig) {
      this.state.calcBuyUpRate = 0;
    } else if (this.state.giBillChapter !== 30) {
      this.state.calcBuyUpRate = 0;
    } else {
      this.state.calcBuyUpRate = (this.state.buyUp / 4);
    }

    // Calculate Housing Allowance Rate Final - getMonthlyRateFinal
    this.state.calcMonthlyRateFinal = this.state.calcRopOld *
      ((this.state.calcMonthlyRate + this.state.calcBuyUpRate) + this.state.calcKickerBenefit);

    // Calculate the names of Terms 1-3
    if (this.state.institutionType === 'ojt') {
      this.state.calcTerm1 = 'Months 1-6';
      this.state.calcTerm2 = 'Months 7-12';
      this.state.calcTerm3 = 'Months 13-18';
    } else if (this.state.calendar === 'semesters') {
      this.state.calcTerm1 = 'Fall';
      this.state.calcTerm2 = 'Spring';
      this.state.calcTerm3 = '';
    } else if (this.state.calendar === 'quarters') {
      this.state.calcTerm1 = 'Fall';
      this.state.calcTerm2 = 'Winter';
      this.state.calcTerm3 = 'Spring';
    } else if (this.state.calendar === 'nontraditional') {
      this.state.calcTerm1 = 'Term 1';
      this.state.calcTerm2 = 'Term 2';
      this.state.calcTerm3 = 'Term 3';
    }

    // Calculate the name of Term 4
    if (this.state.institutionType === 'ojt') {
      this.state.calcTerm4 = 'Months 19-24';
    } else {
      this.state.calcTerm4 = 'Total (/Yr)';
    }

    // Calculate Tuition Fees for Term #1 - getTuitionFeesTerm1
    if (this.state.institutionType === 'ojt') {
      this.state.calcTuitionFeesTerm1 = 0;
    } else if (this.state.calcOldGiBill === true) {
      this.state.calcTuitionFeesTerm1 = 0;
    } else if (this.state.giBillChapter === 31 &&
        (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence')) {
      this.state.calcTuitionFeesTerm1 = 0;
    } else if (this.state.giBillChapter === 31) {
      this.state.calcTuitionFeesTerm1 = this.state.calcTuitionFeesPerTerm;
    } else {
      this.state.calcTuitionFeesTerm1 =
      Math.max(0, Math.min(
        this.state.calcTier * this.state.calcTuitionFeesPerTerm,
        this.state.calcTier * this.state.calcTuitionFeesCap,
        this.state.calcTier * this.state.calcTuitionNetPrice
      ));
    }

    // getTuitionFeesTerm2
    if (this.state.institutionType === 'ojt') {
      this.state.calcTuitionFeesTerm2 = 0;
    } else if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms === 1) {
      this.state.calcTuitionFeesTerm2 = 0;
    } else if (this.state.calcOldGiBill === true) {
      this.state.calcTuitionFeesTerm2 = 0;
    } else if (this.state.giBillChapter === 31 &&
        (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence')) {
      this.state.calcTuitionFeesTerm2 = 0;
    } else if (this.state.giBillChapter === 31) {
      this.state.calcTuitionFeesTerm2 = this.state.calcTuitionFeesPerTerm;
    } else {
      this.state.calcTuitionFeesTerm2 =
      Math.max(0, Math.min(
        this.state.calcTier * this.state.calcTuitionFeesPerTerm,
        this.state.calcTier * this.state.calcTuitionFeesCap - this.state.calcTuitionFeesTerm1,
        this.state.calcTier * this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm1
      ));
    }

    // getTuitionFeesTerm3
    if (this.state.institutionType === 'ojt') {
      this.state.calcTuitionFeesTerm3 = 0;
    } else if (this.state.calendar === 'semesters' ||
        (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms < 3)) {
      this.state.calcTuitionFeesTerm3 = 0;
    } else if (this.state.calcOldGiBill === true) {
      this.state.calcTuitionFeesTerm3 = 0;
    } else if (this.state.giBillChapter === 31 &&
        (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence')) {
      this.state.calcTuitionFeesTerm3 = 0;
    } else if (this.state.giBillChapter === 31) {
      this.state.calcTuitionFeesTerm3 = this.state.calcTuitionFeesPerTerm;
    } else {
      this.state.calcTuitionFeesTerm3 =
      Math.max(0, Math.min(
        this.state.calcTier * this.state.calcTuitionFeesPerTerm,
        this.state.calcTier * this.state.calcTuitionFeesCap - this.state.calcTuitionFeesTerm1 - this.state.calcTuitionFeesTerm2,
        this.state.calcTier * this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm1 - this.state.calcTuitionFeesTerm2
      ));
    }

    console.warn('TRACING-1', this.state.calcTuitionFeesPerTerm, this.state.calcTuitionFeesCap, this.state.calcTuitionFeesTerm2);


    // Calculate the name of Tuition Fees Total - getTuitionFeesTotal
    this.state.calcTuitionFeesTotal = this.state.calcTuitionFeesTerm1 +
        this.state.calcTuitionFeesTerm2 + this.state.calcTuitionFeesTerm3;


    // Calculate Yellow Ribbon for Term #1 - getYrBenTerm1
    if (!this.state.calcYellowRibbonElig || this.state.yellowBen === 0) {
      this.state.calcYrBenTerm1 = 0;
    } else if (this.state.calcOldGiBill === true || this.state.giBillChapter === 31) {
      this.state.calcYrBenTerm1 = 0;
    } else if (this.state.calcTuitionFeesPerTerm === this.state.calcTuitionFeesTerm1) {
      this.state.calcYrBenTerm1 = 0;
    } else {
      this.state.calcYrBenTerm1 = Math.max(0, Math.min(
        this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm1,
        this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm1,
        this.state.yellowBen * 2
      ));
    }

    // getYrBenTerm2
    if (!this.state.calcYellowRibbonElig || this.state.yellowBen === 0) {
      this.state.calcYrBenTerm2 = 0;
    } else if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms === 1) {
      this.state.calcYrBenTerm2 = 0;
    } else if (this.state.calcOldGiBill === true || this.state.giBillChapter === 31) {
      this.state.calcYrBenTerm2 = 0;
    } else if (this.state.calcTuitionFeesPerTerm === this.state.calcTuitionFeesTerm2) {
      this.state.calcYrBenTerm2 = 0;
    } else {
      this.state.calcYrBenTerm2 = Math.max(0, Math.min(
        this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm2,
        this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm1 -
        this.state.calcTuitionFeesTerm2 - this.state.calcYrBenTerm1,
        this.state.yellowBen * 2 - this.state.calcYrBenTerm1
      ));
    }

    // getYrBenTerm3
    if (!this.state.calcYellowRibbonElig || this.state.yellowBen === 0) {
      this.state.calcYrBenTerm3 = 0;
    } else if (this.state.calendar === 'semesters' ||
        (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms < 3)) {
      this.state.calcYrBenTerm3 = 0;
    } else if (this.state.calcOldGiBill === true || this.state.giBillChapter === 31) {
      this.state.calcYrBenTerm3 = 0;
    } else if (this.state.calcTuitionFeesPerTerm === this.state.calcTuitionFeesTerm3) {
      this.state.calcYrBenTerm3 = 0;
    } else {
      this.state.calcYrBenTerm3 = Math.max(0, Math.min(
        this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm3,
        this.state.calcTuitionFeesPerTerm - this.state.calcTuitionFeesTerm1 -
        this.state.calcTuitionFeesTerm2 - this.state.calcTuitionFeesTerm3 -
        this.state.calcYrBenTerm1 - this.state.calcYrBenTerm2,
        this.state.yellowBen * 2 - this.state.calcYrBenTerm1 - this.state.calcYrBenTerm2
      ));
    }

    // Calculate Yellow Ribbon for the Year - getYrBenTotal
    if (!this.state.calcYellowRibbonElig || this.state.yellowBen === 0) {
      this.state.calcYrBenTotal = 0;
    } else {
      this.state.calcYrBenTotal = this.state.calcYrBenTerm1 + this.state.calcYrBenTerm2 +
        this.state.calcYrBenTerm3;
    }

    // Calculate Yellow Ribbon by school / VA contributions - getYrBreakdown
    this.state.calcYrBenSchoolTerm1 = this.state.calcYrBenTerm1 / 2;
    this.state.calcYrBenVaTerm1 = this.state.calcYrBenTerm1 / 2;
    this.state.calcYrBenSchoolTerm2 = this.state.calcYrBenTerm2 / 2;
    this.state.calcYrBenVaTerm2 = this.state.calcYrBenTerm2 / 2;
    this.state.calcYrBenSchoolTerm3 = this.state.calcYrBenTerm3 / 2;
    this.state.calcYrBenVaTerm3 = this.state.calcYrBenTerm3 / 2;
    this.state.calcYrBenSchoolTotal = this.state.calcYrBenTotal / 2;
    this.state.calcYrBenVaTotal = this.state.calcYrBenTotal / 2;

    // Calculate Total Paid to School - getTotalPaidToSchool
    this.state.calcTotalToSchool = this.state.calcTuitionFeesTotal + this.state.calcYrBenTotal;

    console.warn('TRACE', this.state.calcTuitionFeesTotal);

    // Calculate Total Scholarships and Tuition Assistance - getTotalScholarships
    this.state.calcTotalScholarshipTa = this.state.scholar + this.state.tuitionAssist;

    // Calculate Total Left to Pay - getTotalLeftToPay
    this.state.calcTotalLeftToPay = Math.max(0, this.state.tuitionFees -
      this.state.calcTotalToSchool - this.state.scholar - this.state.tuitionAssist);

    console.warn('TRACE', this.state.tuitionFees, this.state.calcTotalToSchool, this.state.scholar, this.state.tuitionAssist);


    // Calculate Housing Allowance for Term #1 - getHousingAllowTerm1
    if (this.state.militaryStatus === 'active duty' && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm1 = 0;
    } else if (this.state.giBillChapter === 33 & this.state.militaryStatus === 'spouse' &&
        this.state.spouseActiveDuty && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm1 = 0;
    } else if (this.state.giBillChapter === 35 && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm1 = this.state.calcMonthlyRateFinal;
    } else if (this.state.calcOldGiBill === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm1 = this.state.calcMonthlyRateFinal;
    } else if (this.state.calcVreOnly === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm1 = this.state.calcMonthlyRateFinal;
    } else if (this.state.giBillChapter === 31 && (this.state.institutionType === 'flight' ||
        this.state.institutionType === 'correspondence')) {
      this.state.calcTuitionAllowTerm1 = 0;
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'flight') {
      this.state.calcHousingAllowTerm1 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.55)
        ));
    } else if (this.state.giBillChapter === 1606 && this.state.institutionType === 'flight') {
      this.state.calcHousingAllowTerm1 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * 0.55
        ));
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm1 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.6)
        ));
    } else if (this.state.giBillChapter === 1606 && this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm1 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.6)
        ));
    } else if (this.state.calcOnlyTuitionFees) {
      this.state.calcHousingAllowTerm1 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm
        ));
    } else if (this.state.calcOldGiBill === true || this.state.calcVreOnly === true) {
      this.state.calcHousingAllowTerm1 = this.state.calcMonthlyRateFinal * this.state.calcTermLength;
    } else if (this.state.militaryStatus === 'active duty') {
      this.state.calcHousingAllowTerm1 = (0 + this.state.calcKickerBenefit) * this.state.calcTermLength;
    } else if (this.state.militaryStatus === 'spouse' && this.state.spouseActiveDuty) {
      this.state.calcHousingAllowTerm1 = (0 + this.state.calcKickerBenefit) * this.state.calcTermLength;
    } else if (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm1 = 0;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm1 = this.state.calcRopOjt *
        (this.state.calcTier * school.bah + this.state.calcKickerBenefit);
    } else if (this.state.online) {
      this.state.calcHousingAllowTerm1 = this.state.calcTermLength * this.state.rop *
        (this.state.calcTier * this.props.constants.AVGBAH / 2 + this.state.calcKickerBenefit);
    } else if (school.country.toLowerCase() !== 'usa') {
      this.state.calcHousingAllowTerm1 = this.state.calcTermLength * this.state.rop *
        ((this.state.calcTier * this.props.constants.AVGBAH) + this.state.calcKickerBenefit);
    } else {
      this.state.calcHousingAllowTerm1 = this.state.calcTermLength * this.state.rop *
        ((this.state.calcTier * school.bah) + this.state.calcKickerBenefit);
    }

    // getHousingAllowTerm2
    if (this.state.militaryStatus === 'active duty' && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm2 = 0;
    } else if (this.state.giBillChapter === 33 &&
        this.state.militaryStatus === 'spouse' && this.state.spouseActiveDuty &&
        this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm2 = 0;
    } else if (this.state.giBillChapter === 35 && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm2 = 0.75 * this.state.calcMonthlyRateFinal;
    } else if (this.state.calcOldGiBill === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm2 = (6.6 / 9) * this.state.calcMonthlyRateFinal;
    } else if (this.state.calcVreOnly === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm2 = this.state.calcMonthlyRateFinal;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm2 = 0.8 * this.state.calcRopOjt *
        (this.state.calcTier * school.bah + this.state.calcKickerBenefit);
    } else if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms === 1) {
      this.state.calcHousingAllowTerm2 = 0;
    } else if (this.state.giBillChapter === 31 &&
        (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence')) {
      this.state.calcTuitionAllowTerm2 = 0;
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'flight') {
      this.state.calcHousingAllowTerm2 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.55)
        ));
    } else if (this.state.giBillChapter === 1606 && this.state.institutionType === 'flight') {
      this.state.calcHousingAllowTerm2 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * 0.55
        ));
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm2 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.6)
        ));
    } else if (this.state.giBillChapter === 1606 && this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm2 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.6)
        ));
    } else if (this.state.calcOnlyTuitionFees) {
      this.state.calcHousingAllowTerm2 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm
        ));
    } else if (this.state.calcOldGiBill === true || this.state.calcVreOnly === true) {
      this.state.calcHousingAllowTerm2 = this.state.calcMonthlyRateFinal * this.state.calcTermLength;
    } else if (this.state.militaryStatus === 'active duty') {
      this.state.calcHousingAllowTerm2 = (0 + this.state.calcKickerBenefit) * this.state.calcTermLength;
    } else if (this.state.militaryStatus === 'spouse' && this.state.spouseActiveDuty) {
      this.state.calcHousingAllowTerm2 = (0 + this.state.calcKickerBenefit) * this.state.calcTermLength;
    } else if (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm2 = 0;
    } else if (this.state.online) {
      this.state.calcHousingAllowTerm2 = this.state.calcTermLength * this.state.rop *
        (this.state.calcTier * this.props.constants.AVGBAH / 2 + this.state.calcKickerBenefit);
    } else if (school.country.toLowerCase() !== 'usa') {
      this.state.calcHousingAllowTerm2 = this.state.calcTermLength * this.state.rop *
        (this.state.calcTier * this.props.constants.AVGBAH + this.state.calcKickerBenefit);
    } else {
      this.state.calcHousingAllowTerm2 = this.state.calcTermLength * this.state.rop *
        (this.state.calcTier * school.bah + this.state.calcKickerBenefit);
    }

    // getHousingAllowTerm3
    if (this.state.militaryStatus === 'active duty' && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm3 = 0;
    } else if (this.state.giBillChapter === 33 && this.state.militaryStatus === 'spouse' &&
        this.state.spouseActiveDuty && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm3 = 0;
    } else if (this.state.giBillChapter === 35 && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm3 = 0.494 * this.state.calcMonthlyRateFinal;
    } else if (this.state.calcOldGiBill === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm3 = (7 / 15) * this.state.calcMonthlyRateFinal;
    } else if (this.state.calcVreOnly === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm3 = this.state.calcMonthlyRateFinal;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm3 = 0.6 * this.state.calcRopOjt *
        (this.state.calcTier * school.bah + this.state.calcKickerBenefit);
    } else if (this.state.calendar === 'semesters') {
      this.state.calcHousingAllowTerm3 = 0;
    } else if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms < 3) {
      this.state.calcHousingAllowTerm3 = 0;
    } else if (this.state.giBillChapter === 31 &&
        (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence')) {
      this.state.calcTuitionAllowTerm3 = 0;
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'flight') {
      this.state.calcHousingAllowTerm3 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.55)
        ));
    } else if (this.state.giBillChapter === 1606 && this.state.institutionType === 'flight') {
      this.state.calcHousingAllowTerm3 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * 0.55
        ));
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm3 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.6)
        ));
    } else if (this.state.giBillChapter === 1607 && this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm3 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm * (this.state.consecutiveService * 0.6)
        ));
    } else if (this.state.calcOnlyTuitionFees) {
      this.state.calcHousingAllowTerm3 = Math.max(0,
        Math.min(this.state.calcMonthlyRateFinal * this.state.calcTermLength,
          this.state.calcTuitionFeesPerTerm
        ));
    } else if (this.state.calcOldGiBill === true || this.state.calcVreOnly === true) {
      this.state.calcHousingAllowTerm3 = this.state.calcMonthlyRateFinal * this.state.calcTermLength;
    } else if (this.state.militaryStatus === 'spouse' && this.state.spouseActiveDuty) {
      this.state.calcHousingAllowTerm3 = (0 + this.state.calcKickerBenefit) * this.state.calcTermLength;
    } else if (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence') {
      this.state.calcHousingAllowTerm3 = 0;
    } else if (this.state.militaryStatus === 'active duty') {
      this.state.calcHousingAllowTerm3 = (0 + this.state.calcKickerBenefit) * this.state.calcTermLength;
    } else if (this.state.online) {
      this.state.calcHousingAllowTerm3 = this.state.calcTermLength * this.state.rop *
        (this.state.calcTier * this.props.constants.AVGBAH / 2 + this.state.calcKickerBenefit);
    } else if (school.country.toLowerCase() !== 'usa') {
      this.state.calcHousingAllowTerm3 = this.state.calcTermLength * this.state.rop *
        (this.state.calcTier * this.props.constants.AVGBAH + this.state.calcKickerBenefit);
    } else {
      this.state.calcHousingAllowTerm3 = this.state.calcTermLength * this.state.rop *
        (this.state.calcTier * school.bah + this.state.calcKickerBenefit);
    }

    // Calculate Housing Allowance Total for year - getHousingAllowTotal
    if (this.state.militaryStatus === 'active duty' && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTerm3 = 0;
    } else if (this.state.giBillChapter === 35 && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTotal = 0.25 * this.state.calcMonthlyRateFinal;
    } else if (this.state.calcOldGiBill === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTotal = (7 / 15) * this.state.calcMonthlyRateFinal;
    } else if (this.state.calcVreOnly === true && this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTotal = this.state.calcMonthlyRateFinal;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcHousingAllowTotal = 0.4 * this.state.calcRopOjt *
        (this.state.calcTier * school.bah + this.state.calcKickerBenefit);
    } else if (this.state.calcOnlyTuitionFees) {
      this.state.calcHousingAllowTotal = Math.max(0,
          Math.min(this.state.calcMonthlyRateFinal * this.state.calcAcadYearLength, this.state.tuitionFees)
        );
    } else {
      this.state.calcHousingAllowTotal = this.state.calcHousingAllowTerm1 +
        this.state.calcHousingAllowTerm2 + this.state.calcHousingAllowTerm3;
    }

    // Calculate Book Stipend for Term #1 - getBookStipendTerm1
    if (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence') {
      this.state.calcBookStipendTerm1 = 0;
    } else if (this.state.calcOldGiBill === true) {
      this.state.calcBookStipendTerm1 = 0;
    } else if (this.state.calcGiBillChapter === 31) {
      this.state.calcBookStipendTerm1 = this.state.books / this.state.calcNumberOfTerms;
    } else if (this.state.institutionType === 'ojt' && this.state.giBillChapter === 33) {
      this.state.calcBookStipendTerm1 = this.props.constants.BSOJTMONTH;
    } else {
      this.state.calcBookStipendTerm1 = this.state.calcRopBook *
        this.props.constants.BSCAP / this.state.calcNumberOfTerms * this.state.calcTier;
    }

    // getBookStipendTerm2
    if (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence') {
      this.state.calcBookStipendTerm2 = 0;
    } else if (this.state.institutionType === 'ojt' && this.state.giBillChapter === 33) {
      this.state.calcBookStipendTerm2 = this.props.constants.BSOJTMONTH;
    } else if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms === 1) {
      this.state.calcBookStipendTerm2 = 0;
    } else if (this.state.calcOldGiBill === true) {
      this.state.calcBookStipendTerm2 = 0;
    } else if (this.state.giBillChapter === 31) {
      this.state.calcBookStipendTerm2 = this.state.books / this.state.calcNumberOfTerms;
    } else {
      this.state.calcBookStipendTerm2 = this.state.calcRopBook *
        this.props.constants.BSCAP / this.state.calcNumberOfTerms * this.state.calcTier;
    }

    // getBookStipendTerm3
    if (this.state.institutionType === 'flight' || this.state.institutionType === 'correspondence') {
      this.state.calcBookStipendTerm3 = 0;
    } else if (this.state.institutionType === 'ojt' && this.state.giBillChapter === 33) {
      this.state.calcBookStipendTerm3 = this.props.constants.BSOJTMONTH;
    } else if (this.state.calendar === 'semesters') {
      this.state.calcBookStipendTerm3 = 0;
    } else if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms < 3) {
      this.state.calcBookStipendTerm3 = 0;
    } else if (this.state.calcOldGiBill === true) {
      this.state.calcBookStipendTerm3 = 0;
    } else if (this.state.giBillChapter === 31) {
      this.state.calcBookStipendTerm3 = this.state.books / this.state.calcNumberOfTerms;
    } else {
      this.state.calcBookStipendTerm3 = this.state.calcRopBook *
        this.props.constants.BSCAP / this.state.calcNumberOfTerms * this.state.calcTier;
    }

    // Calculate Book Stipend for Year - getBookStipendYear
    if (this.state.institutionType === 'ojt' && this.state.giBillChapter === 33) {
      this.state.calcBookStipendTotal = this.props.constants.BSOJTMONTH;
    } else {
      this.state.calcBookStipendTotal = this.state.calcBookStipendTerm1 +
        this.state.calcBookStipendTerm2 + this.state.calcBookStipendTerm3;
    }

    // Calculate Total Payments to You - getTotalPaidToYou
    this.state.calcTotalToYou = this.state.calcHousingAllowTotal + this.state.calcBookStipendTotal;

    // Calculate Total Benefits for Term 1 - getTotalTerm1
    if (this.state.institutionType === 'ojt') {
      this.state.calcTotalTerm1 = 0;
    } else {
      this.state.calcTotalTerm1 = this.state.calcTuitionFeesTerm1 +
        this.state.calcYrBenTerm1 + this.state.calcHousingAllowTerm1 +
        this.state.calcBookStipendTerm1;
    }

    // getTotalTerm2
    if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms === 1) {
      this.state.calcBookStipendTerm2 = 0;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcTotalTerm2 = 0;
    } else {
      this.state.calcTotalTerm2 = this.state.calcTuitionFeesTerm2 +
        this.state.calcYrBenTerm2 + this.state.calcHousingAllowTerm2 +
        this.state.calcBookStipendTerm2;
    }

    // getTotalTerm3
    if (this.state.calendar === 'semesters') {
      this.state.calcTotalTerm3 = 0;
    } else if (this.state.calendar === 'nontraditional' && this.state.calcNumberOfTerms < 3) {
      this.state.calcTotalTerm3 = 0;
    } else if (this.state.institutionType === 'ojt') {
      this.state.calcTotalTerm3 = 0;
    } else {
      this.state.calcTotalTerm3 = this.state.calcTuitionFeesTerm3 +
        this.state.calcYrBenTerm3 + this.state.calcHousingAllowTerm3 +
        this.state.calcBookStipendTerm3;
    }

    // Calculate Text for Total Benefits Row - getTotalText
    if (this.state.giBillChapter === 33) {
      this.state.calcGiBillTotalText = 'Total Post-9/11 GI Bill Benefits';
    } else if (this.state.giBillChapter === 30) {
      this.state.calcGiBillTotalText = 'Total Montgomery GI Bill Benefits';
    } else if (this.state.giBillChapter === 1606) {
      this.state.calcGiBillTotalText = 'Total Select Reserve GI Bill Benefits';
    } else if (this.state.giBillChapter === 1607) {
      this.state.calcGiBillTotalText = 'Total REAP GI Bill Benefits';
    } else if (this.state.giBillChapter === 35) {
      this.state.calcGiBillTotalText = 'Total DEA GI Bill Benefits';
    } else if (this.state.giBillChapter === 31) {
      this.state.calcGiBillTotalText = 'Total Voc Rehab Benefits';
    }

    // Calculate Total Benefits for Year - getTotalYear
    if (this.state.institutionType === 'ojt') {
      this.state.calcTotalYear = 0;
    } else {
      this.state.calcTotalYear = this.state.calcTuitionFeesTotal +
        this.state.calcYrBenTotal + this.state.calcHousingAllowTotal +
          this.state.calcBookStipendTotal;
    }

    // Calculate Monthly Rate for Display - getMonthlyRateDisplay
    if (this.state.institutionType === 'ojt') {
      this.state.calcMonthlyRateDisplay = this.state.calcHousingAllowTerm1;
    } else {
      this.state.calcMonthlyRateDisplay = this.state.calcHousingAllowTerm1 / this.state.calcTermLength;
    }
  } // end of calculate()

  setOutputs() {
    this.state.housingAllowRate = [this.formatCurrency(this.state.calcMonthlyRateDisplay), 'month'].join(' / ');
    this.state.totalLeftToPay = this.formatCurrency(this.state.calcTotalLeftToPay);

    this.state.totalPaidToSchool = this.formatCurrency(this.state.calcTotalToSchool);
    this.state.totalPaidToYou = this.formatCurrency(this.state.calcTotalToYou);
    this.state.totalYear = this.formatCurrency(this.state.calcTotalYear);

    this.state.totalTuitionFeesCharged = this.formatCurrency(this.state.tuitionFees);
    this.state.totalSchoolReceived = this.formatCurrency(this.state.calcTotalToSchool);
    this.state.totalTuitionFeesScholarships = this.formatCurrency(this.state.calcTotalScholarshipTa);

    this.state.term1 = this.state.calcTerm1;
    this.state.term2 = this.state.calcTerm2;
    this.state.term3 = this.state.calcTerm3;
    this.state.term4 = this.state.calcTerm4;

    this.state.tuitionFeesTerm1 = this.formatCurrency(this.state.calcTuitionFeesTerm1);
    this.state.tuitionFeesTerm2 = this.formatCurrency(this.state.calcTuitionFeesTerm2);
    this.state.tuitionFeesTerm3 = this.formatCurrency(this.state.calcTuitionFeesTerm3);
    this.state.tuitionFeesTotal = this.formatCurrency(this.state.calcTuitionFeesTotal);

    this.state.yrBenTerm1 = this.formatCurrency(this.state.calcYrBenSchoolTerm1);
    this.state.yrBenTerm2 = this.formatCurrency(this.state.calcYrBenSchoolTerm2);
    this.state.yrBenTerm3 = this.formatCurrency(this.state.calcYrBenSchoolTerm3);
    this.state.yrBenTotal = this.formatCurrency(this.state.calcYrBenSchoolTotal);

    this.state.yrBenTermVa1 = this.formatCurrency(this.state.calcYrBenVaTerm1);
    this.state.yrBenTermVa2 = this.formatCurrency(this.state.calcYrBenVaTerm2);
    this.state.yrBenTermVa3 = this.formatCurrency(this.state.calcYrBenVaTerm3);
    this.state.yrBenVaTotal = this.formatCurrency(this.state.calcYrBenVaTotal);

    this.state.housingAllowTerm1 = this.formatCurrency(this.state.calcHousingAllowTerm1);
    this.state.housingAllowTerm2 = this.formatCurrency(this.state.calcHousingAllowTerm2);
    this.state.housingAllowTerm3 = this.formatCurrency(this.state.calcHousingAllowTerm3);
    this.state.housingAllowTotal = this.formatCurrency(this.state.calcHousingAllowTotal);

    this.state.bookStipendTerm1 = this.formatCurrency(this.state.calcBookStipendTerm1);
    this.state.bookStipendTerm2 = this.formatCurrency(this.state.calcBookStipendTerm2);
    this.state.bookStipendTerm3 = this.formatCurrency(this.state.calcBookStipendTerm3);
    this.state.bookStipendTotal = this.formatCurrency(this.state.calcBookStipendTotal);

    if (this.state.institutionType === 'ojt') {
      this.state.housingAllowTerm1 += ' /month';
      this.state.housingAllowTerm2 += ' /month';
      this.state.housingAllowTerm3 += ' /month';
      this.state.housingAllowTotal += ' /month';
      this.state.bookStipendTerm1 += ' /month';
      this.state.bookStipendTerm2 += ' /month';
      this.state.bookStipendTerm3 += ' /month';
      this.state.bookStipendTotal += ' /month';
    }
  } // end of setOutputs()

  componentWillMount() {
    // initialize state derived from institution details
    // and sensible defaults
    this.initializeInputState();

    this.calculate();
    this.setOutputs();
  }

}

BenefitCalculator.propTypes = {
  institution: React.PropTypes.object.isRequired,
  toggleModalDisplay: React.PropTypes.func.isRequired,

  militaryStatus: React.PropTypes.string.isRequired,
  spouseActiveDuty: React.PropTypes.string.isRequired,
  giBillChapter: React.PropTypes.string.isRequired,
  eligForPostGiBill: React.PropTypes.string.isRequired,
  cumulativeService: React.PropTypes.string.isRequired,
  consecutiveService: React.PropTypes.string.isRequired,
  enlistmentService: React.PropTypes.string.isRequired,
  online: React.PropTypes.string.isRequired,

  constants: React.PropTypes.object.isRequired
};

BenefitCalculator.defaultProps = {
  constants: {
    TFCAP: 21970.46,
    AVGBAH: 1611,
    BSCAP: 1000,
    BSOJTMONTH: 83,
    FLTTFCAP: 12554.54,
    CORRESPONDTFCAP: 10671.35,
    MGIB3YRRATE: 1789,
    MGIB2YRRATE: 1454,
    SRRATE: 368,
    DEARATE: 1021,
    DEARATEOJT: 745,
    VRE0DEPRATE: 605.44,
    VRE1DEPRATE: 751.00,
    VRE2DEPRATE: 885.00,
    VREINCRATE: 64.50,
    VRE0DEPRATEOJT: 529.36,
    VRE1DEPRATEOJT: 640.15,
    VRE2DEPRATEOJT: 737.77,
    VREINCRATEOJT: 47.99
  }
};

export default BenefitCalculator;
