/**********************************************************************************************************
 * This script allows the fulfillers to re-assign the task and have certain mandatory fields before submit.
 * It will stop submit of the closure of task until all required fields conditions are met.
 * There is a catalog UI policy that makes short description read only because script is dependant on identifying these tasks
 ***********************************************************************************************************/

function onSubmit() {
  // Get values for Task Form fields
  var getState = g_form.getValue('state');
  var getShortDesc = g_form.getValue('short_description');

  // ******************** Name of Task: Hold Kickoff Meeting Task ********************
  // Get values of fulfiller fields to make mandatory
  var getMeeting = g_form.getValue('meeting_date');
  var getAttend = g_form.getValue('meeting_attendance');
  var getProjected = g_form.getValue('projected_delivery_date');
  var getDataEdc = g_form.getValue('data_center_edc');
  var getDataWdc = g_form.getValue('data_center_wdc');
  var getWanAnswer = g_form.getValue('wan_needed');
  var getSts01Answer = g_form.getValue('sts01_needed');
  var getSts06Answer = g_form.getValue('sts06_needed');
  var getClientQuest = g_form.getValue('client_questionnaire_ritm');
  if (getState != 3 && getShortDesc.indexOf('Hold Floor Hosting Kickoff Meeting') > -1) {
    return true;
  } else {
    if (
      getMeeting == '' ||
      getAttend == '' ||
      getProjected == '' ||
      getDataEdc == '' ||
      getDataWdc == '' ||
      getWanAnswer == '' ||
      getSts01Answer == '' ||
      getSts06Answer == '' ||
      getClientQuest == ''
    ) {
      g_form.setMandatory('meeting_date', true);
      g_form.setMandatory('meeting_attendance', true);
      g_form.setMandatory('projected_delivery_date', true);
      g_form.setMandatory('data_center_edc', true);
      g_form.setMandatory('data_center_wdc', true);
      g_form.setMandatory('wan_needed', true);
      g_form.setMandatory('sts01_needed', true);
      g_form.setMandatory('sts06_needed', true);
      g_form.setMandatory('client_questionnaire_ritm', true);
      // alert('Please fill out field(s) under Variables tab before closing task.');
      //return false;
    } else {
      return true;
    }
  }
}
