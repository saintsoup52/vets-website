---
layout: page-breadcrumbs.html
title: Discharge Upgrade
template: 1-topic-landing
---
Do you know your options around your discharge?

<!-- Maintenance Page Start -->

<div class="main" role="main">
  <div class="section main-menu">
    <div class="row">
      <div class="small-12 columns">
        <div class="form-panel">
          <fieldset>
            <div class="input-section"> 
              <div>
              <label for="StarterQuestion">Which of the following categories describes your reason for wanting to change your discharge paperwork?</label>
              <select name="StarterQuestion" id="StarterQuestion">
                <option value="option0">Choose One</option>
                <option value="option1">I suffered from PTSD/TBI in the service, which contributed to the conduct that led to my discharge</option>
                <option value="option2">I was discharged for reasons related to my sexual orientation (Don’t Ask Don’t Tell, or preceding policies)</option>
                <option value="option3">I was the victim of sexual assault in the service, and was discharged for reasons related to this incident</option>
                <option value="option3">I am transgender, and my discharge is incorrect or unjust for reasons related to my gender identity</option>
                <option value="option3">My discharge is incorrect due to a misdiagnosed or undiagnosed personality disorder</option>
                <option value="option3">There is an error on my discharge paperwork for other reasons</option>
                <option value="option3">My discharge is unjust/unfair/overly punitive for other reasons</option>
                <option value="option3">Other</option>
              </select>
              </div>
              <div id="option1">
              <label for="nme">Which of the following categories describes your reason for wanting to change your discharge paperwork? #1</label>
              <select name="nme" id="nme">
                <option value="option1">Choose One</option>
                <option value="option1">I suffered from PTSD/TBI in the service, which contributed to the conduct that led to my discharge</option>
                <option value="option2">I was discharged for reasons related to my sexual orientation (Don’t Ask Don’t Tell, or preceding policies)</option>
                <option value="option3">I was the victim of sexual assault in the service, and was discharged for reasons related to this incident</option>
                <option value="option3">I am transgender, and my discharge is incorrect or unjust for reasons related to my gender identity</option>
                <option value="option3">My discharge is incorrect due to a misdiagnosed or undiagnosed personality disorder</option>
                <option value="option3">There is an error on my discharge paperwork for other reasons</option>
                <option value="option3">My discharge is unjust/unfair/overly punitive for other reasons</option>
                <option value="option3">Other</option>
              </select>
              </div>
              <div class="option2" style="display:none;">
              <label for="nme">Which of the following categories describes your reason for wanting to change your discharge paperwork? #2</label>
              <select name="nme" id="nme">
                <option value="option1">Choose One</option>
                <option value="option1">I suffered from PTSD/TBI in the service, which contributed to the conduct that led to my discharge</option>
                <option value="option2">I was discharged for reasons related to my sexual orientation (Don’t Ask Don’t Tell, or preceding policies)</option>
                <option value="option3">I was the victim of sexual assault in the service, and was discharged for reasons related to this incident</option>
                <option value="option3">I am transgender, and my discharge is incorrect or unjust for reasons related to my gender identity</option>
                <option value="option3">My discharge is incorrect due to a misdiagnosed or undiagnosed personality disorder</option>
                <option value="option3">There is an error on my discharge paperwork for other reasons</option>
                <option value="option3">My discharge is unjust/unfair/overly punitive for other reasons</option>
                <option value="option3">Other</option>
              </select>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Maintenance Page End -->

<script type="text/javascript">

var el = document.getElementById('StarterQuestion');

el.addEventListener('change', function() {
  var name = el.value;
  console.log(name === document.getElementById(name));
});

</script>






 

