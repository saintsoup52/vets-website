import React from 'react';
import { focusElement } from '../../../common/utils/helpers';

class IntroductionPage extends React.Component {
  componentDidMount() {
    focusElement('.va-nav-breadcrumbs-list');
  }
  render() {
    return (
    <div>
    <h2>What are the steps?</h2>
    <div className="small-12 columns" markdown="0">
    <ol className="process" markdown="0">
    <li className="step one" markdown="0">
    <div markdown="1">
    <h3>Prepare</h3>
    </div>
    <div markdown="1">
    <h4>Check your eligibility</h4>
    <p>You may be eligible for more than one benefit, based on your service. When you apply, you have to pick which one you want to use:</p>
    <ul>
    <li><a href="/education/gi-bill/post-9-11/">Post- 9/11 GI Bill</a> (Chapter 33)</li>
    <li><a href="/education/gi-bill/montgomery-active-duty/">Montgomery GI Bill</a> (MGIB-AD, Chapter 30)</li>
    <li><a href="/education/gi-bill/montgomery-selected-reserve/">Montgomery GI Bill Selected Reserve</a> (MGIB-SR, Chapter 1606)</li>
    <li><a href="/education/other-educational-assistance-programs/veap/">Post-Vietnam Era Veterans’ Educational Assistance Program</a> (VEAP, Chapter 32)</li>
    <li><a href="/education/gi-bill/survivors-dependent-assistance/fry-scholarship/">Post-9/11 GI Bill Marine Gunnery Sergeant John David Fry Scholarship</a> (Fry Scholarship or Chapter 33) <strong>Dependents only</strong></li>
    <li><a href="/education/gi-bill/survivors-dependent-assistance/dependents-education/">Survivors’ and Dependents’ Educational Assistance program</a> (DEA or Chapter 35) <strong>Dependents only</strong></li>
    </ul>
    <p><a href="http://www.va.gov/ogc/apps/accreditation/index.asp">An accredited representative</a> with a Veterans Service Organization (VSO) can help you pick the right program.</p>
    <h6>Learn about educational programs</h6>
    <ul>
    <li>See estimated benefits at the school you want to attend using the <a href="/gi-bill-comparison-tool/">GI Bill Comparison Tool</a>.</li>
    </ul>
    </div>
    <p><a className="usa-button-primary usa-button-outline" href="/gi-bill-comparison-tool/">GI Bill Comparison Tool</a></p>
    <div markdown="1">
    <h6>What you need to fill out this application</h6>
    <ul>
    <li>Social Security number</li>
    <li>Bank account direct deposit information</li>
    <li>Education and military history</li>
    <li>Basic information about the school or training facility where you want to attend</li>
    </ul>
    </div>
    </li>
    <li className="step two" markdown="0">
    <div markdown="1">
    <h5>Apply or Manage</h5>
    </div>
    <p>
    <a href="/education/apply-for-education-benefits/application/1990" className="usa-button-primary va-button-primary button-inline">Begin Application</a><a href="/education/apply-for-education-benefits/application/1990" className="usa-button-primary usa-button-outline button-inline">Manage Benefit</a>
    </p>
    <div markdown="1">
    <h6>Manage Benefit if…</h6>
    <ul>
    <li>You’re changing schools.</li>
    <li>You’re changing your educational, professional, vocational goal.</li>
    <li>You left your program (for any reason) and you’re now reentering the same program.</li>
    <li>You were receiving VA Education Benefits as a Veteran and now wish to receive benefits while on active military duty.</li>
    </ul>
    <h6>Other Ways to Apply</h6>
    <ul>
    <li>Go to a <a href="/facilities">VA regional office</a> and have a VA employee assist you.</li>
    <li>Work with your school’s VA certifying official. This person is usually in the Registrar or Financial Aid office at the school of your choice.</li>
    <li>Call 888-442-4551 (888-GI-BILL-1) from 8:00 a.m. - 7:00 p.m. ET Mon - Fri, to have the application mailed to you. Fill it out and mail it to your <a href="http://www.benefits.va.gov/gibill/regional_processing.asp">VA regional claims processing office</a>.</li>
    </ul>
    </div>
    </li>
    <li className="step three" markdown="0">
    <div markdown="1">
    <h5>VA Review</h5>
    <h6>How long does it take VA to make a decision?</h6>
    <ul>
    <li>We usually process new claims within 14–30 days.</li>
    </ul>
    <h6>What should I do while I wait?</h6>
    <ul>
    <li>The transition from military to civilian life can be challenging. VA offers <a href="/education/tools-programs/education-career-counseling/">tools and counseling programs</a> to help you make the most of your educational options.</li>
    </ul>
    <h6>What if VA needs more information?</h6>
    <ul>
    <li>We will contact you if we need more information.</li>
    </ul>
    </div>
    </li>
    <li className="step four last" markdown="0">
    <div markdown="1">
    <h5>Decision</h5>
    <ul>
    <li>We usually process claims within 14–30 days.</li>
    <li>You’ll get a COE or Award Letter in the mail if your application was approved. Bring this to the VA certifying official at your school.</li>
    </ul>
    </div>
    </li>
    </ol>
    <div className="feature usa-content" markdown="1">
    <h5>Checking in on the status of your application?</h5>
    <ul>
    <li>We usually process claims within 14–30 days.</li>
    <li>If we’ve asked for documents, please upload them through the <a href="https://gibill.custhelp.com/app/home">GI Bill site</a>.</li>
    <li>You can’t make changes to your application.</li>
    <li>For questions about Education Benefits please call 1-888-442-4551 (1-888-GI-BILL-1) from 8:00 a.m. - 7:00 p.m. ET Mon - Fri.</li>
    </ul>
    </div>
    <br/>

            </div>
</div>
    );
  }
}

export default IntroductionPage;
