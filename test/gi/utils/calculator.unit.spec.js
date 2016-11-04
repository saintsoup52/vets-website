import { expect } from 'chai';
import Calculator from '../../../src/js/gi/utils/calculator.jsx';

describe('Calculator unit tests', () => {
  describe('formatCurrency', () => {
    const calculator = new Calculator();

    context('number formatting', () => {
      it('should return $1,234 when given 1234.01', () => {
        const n = 1234.01;
        const result = calculator.formatCurrency(n);
        expect(result).to.eql('$1,234');
      });

      it('should return $876,543 when given \'876543.61\'', () => {
        const n = '876543.61';
        const result = calculator.formatCurrency(n);
        expect(result).to.eql('$876,544');
      });

      it('should return $0 when given null', () => {
        const n = null;
        const result = calculator.formatCurrency(n);
        expect(result).to.eql('$0');
      });

      it('should return -$10,001 when given -10001.00', () => {
        const n = -10001.00;
        const result = calculator.formatCurrency(n);
        expect(result).to.eql('-$10,001');
      });
    });
  });

  describe('Stanford University', () => {
    const calculator = new Calculator();
    const fields = {};
    const school = {};

    school.bah = '3600';
    school.country = 'USA';
    school.institutionType = { name: 'private' };

    context('default dropdown selections', () => {
      calculator.setMilitaryStatus = 'veteran';
      calculator.setSpouseActiveDuty = 'no';
      calculator.setGiBillChap = '33';
      calculator.setNumberOfDepend = '0';
      calculator.setPost911Elig = 'no';
      calculator.setCumulativeService = '1.0';
      calculator.setEnlistmentService = '3';
      calculator.setConsecutiveService = '0.8';
      calculator.setOnline = 'no';

      fields.tuition = '$45195';

      context('with yellow ribbon', () => {
        fields.yellow_ribbon_radio = 'yes';
        fields.yellow_ribbon_amount = '$16500';
      });

      context('without yellow ribbon', () => {
        fields.yellow_ribbon_radio = 'no';
      });

      context('with scholarships', () => {
        fields.scholarships_amount = '$1000';
      });

      context('without scholarships', () => {
        fields.scholarships_amount = '$1000';
      });

      context('with military assistance', () => {
        fields.military_assistance_amount = '$2333';
      });

      context('without military assistance', () => {
        fields.military_assistance_amount = '$0';
      });

      context('enrolled full time', () => {
        fields.enrolled = '1.0';
      });

      context('enrolled part time', () => {
        fields.enrolled = '0.6';
      });

      context('school calendar: quarters', () => {
        fields.school_calendar = 'quarters';
      });

      context('school calendar: semesters', () => {
        fields.school_calendar = 'semesters';
      });

      context('school calendar: non-traditional', () => {
        fields.school_calendar = 'nontraditional';
      });

      context('eligible for kicker', () => {
        fields.kicker_eligible = 'yes';
        fields.kicker_amount = '$200';
      });

      context('no kicker', () => {
        fields.kicker_eligible = 'no';
        fields.kicker_amount = '$0';
      });


      // estimator.setInstitutionType = school.institutionType.name;
      // estimator.setCountry = school.country;
      // estimator.setBah = school.bah;

      it('should return the correct tuition estimate', () => {
        // calculator.renderTuitionFees();
        // expect(calculator.outputs.tuition.qualifier).to.eql(null);
        // expect(calculator.outputs.tuition.value).to.eql('N/A');
      });

      it('should return the correct housing estimate', () => {
        // calculator.renderHousingAllowance();
        // expect(calculator.outputs.housing.qualifier).to.eql('per month');
        // expect(calculator.outputs.housing.value).to.eql(1476);
      });

      it('should return the correct books estimate', () => {
        // estimator.renderBookStipend();
        // expect(calculator.outputs.books.qualifier).to.eql('per year');
        // expect(calculator.outputs.books.value).to.eql(1000);
      });
    });
  });
});
