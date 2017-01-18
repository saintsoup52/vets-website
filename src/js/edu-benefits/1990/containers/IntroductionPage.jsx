import React from 'react';
import { focusElement } from '../../../common/utils/helpers';

class IntroductionPage extends React.Component {
  componentDidMount() {
    focusElement('.va-nav-breadcrumbs-list');
  }
  render() {
    return (
    <div>
    <h3>Application for Education Benefits</h3>

    <div className="small-12 columns" markdown="0">
    <ol className="process" markdown="0">
    <li className="step one" markdown="0">
    <div markdown="1">
    <h4>Prepare</h4>
    <div markdown="1">
    <h6>What you need to fill out this application</h6>
    <ul>
    <li>Social Security number (required)</li>
    <li>Military history (required)</li>
    <li>Bank account direct deposit information</li>
    <li>Education history</li>
    <li>Basic information about the school or training facility where you want to attend</li>
    </ul>
    <div className="usa-alert usa-alert-info"><div className="usa-alert-body"><span><strong>You won’t be able to save your work or come back to finish</strong>. So before you start, it’s a good idea to gather information about your military and education history, and the school you want to attend.</span>

</div></div>
<br/>
    </div>
    <h6>Understand your eligibility</h6>
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

    </li>
    <li className="step two" markdown="0">
    <div markdown="1">
    <h5>Apply</h5>
    </div>
    <div markdown="1">
      Complete this form.
    </div>
    </li>
    <li className="step three" markdown="0">
    <div markdown="1">
    <h5>VA Review</h5>
    <h6>How long does it take VA to make a decision?</h6>
    <ul>
    <li>We usually process new claims within 30 days.</li>
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
    <li>We usually process claims within 30 days.</li>
    <li>You’ll get a COE or Award Letter in the mail if your application was approved. Bring this to the VA certifying official at your school.</li>
    </ul>
    </div>
    </li>
    </ol>
    <br/>

            </div>
</div>
    );
  }
}

export default IntroductionPage;
