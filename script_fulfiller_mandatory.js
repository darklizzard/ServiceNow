/**********************************************************************************************************
 * This script allows the fulfillers to re-assign the task and have certain mandatory fields before submit.
 * It will stop submit of the closure of task until all required fields conditions are met.
 * There is a catalog UI policy that makes short description read only because script is dependant on identifying these tasks
 ***********************************************************************************************************/

function onSubmit() {
  // Get variable for Task Form fields
  var getState = g_form.getValue('state');
  var getAssigned = g_form.getValue('assigned_to');
  var getShortDesc = g_form.getValue('short_description');

  // ****************************** Task Name: Hold Kickoff Meeting Task ******************************
  // Get values for variables
  var getMeeting = g_form.getValue('meeting_date');
  var getAttend = g_form.getValue('meeting_attendance');
  var getProjected = g_form.getValue('projected_delivery_date');
  var getSts01Answer = g_form.getValue('sts01_needed');
  var getSts06Answer = g_form.getValue('sts06_needed');
  var getElectricEdc = g_form.getValue('electrical_needed_edc');
  var getElectricWdc = g_form.getValue('electrical_needed_wdc');
  var getWanAnswer = g_form.getValue('wan_needed');
  var getDataEdc = g_form.getValue('data_center_edc');
  var getDataWdc = g_form.getValue('data_center_wdc');
  var getClientQuest = g_form.getValue('client_questionnaire_ritm');
  // Verify correct task
  if (getShortDesc.indexOf('Hold Floor Hosting Kickoff Meeting') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('meeting_date', true);
      g_form.setMandatory('meeting_attendance', true);
      g_form.setMandatory('projected_delivery_date', true);
      g_form.setMandatory('data_center_edc', true);
      g_form.setMandatory('data_center_wdc', true);
      g_form.setMandatory('wan_needed', true);
      g_form.setMandatory('sts01_needed', true);
      g_form.setMandatory('sts06_needed', true);
      g_form.setMandatory('client_questionnaire_ritm', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
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
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: Create 3002 ******************************
  // Get values for variables
  var getInitial3002 = g_form.getValue('initial_3002_attached');
  var getInitialDate = g_form.getValue('initial_3002_date_received');
  var getCustomerBails = g_form.getValue('customer_bails');
  // Verify correct task
  if (getShortDesc.indexOf('Create 3002') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('initial_3002_attached', true);
      g_form.setMandatory('initial_3002_date_received', true);
      g_form.setMandatory('customer_bails', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getInitialDate == '' ||
      getInitial3002 == 'false' ||
      getCustomerBails == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: Send STS-01 To Customer ******************************
  // Get values for variables
  var getSts01Date = g_form.getValue('sts01_date_received');
  // Verify correct task
  if (getShortDesc.indexOf('Send STS-01') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('sts01_date_received', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getSts01Date == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: Send STS-06 To Customer ******************************
  // Get values for variables
  var getSts06Date = g_form.getValue('sts06_date_received');
  // Verify correct task
  if (getShortDesc.indexOf('Send STS-06') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('sts06_date_received', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getSts06Date == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: Verify Checklist ******************************
  // Get values for variables
  var getExtSubmit = g_form.getValue('ext_cust_submit_date');
  var getExtTrain = g_form.getValue('ext_cust_train_date');
  var getAdminVerify = g_form.getValue('ext_admin_verify_date');
  var getCustStateId = g_form.getValue('ext_cust_stateid_date');
  var getDatacenterDate = g_form.getValue('ext_cust_datacenter_date');
  // Verify correct task
  if (getShortDesc.indexOf('Verify Checklist') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('ext_cust_submit_date', true);
      g_form.setMandatory('ext_cust_train_date', true);
      g_form.setMandatory('ext_admin_verify_date', true);
      g_form.setMandatory('ext_cust_stateid_date', true);
      g_form.setMandatory('ext_cust_datacenter_date', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getExtSubmit == '' ||
      getExtTrain == '' ||
      getAdminVerify == '' ||
      getCustStateId == '' ||
      getDatacenterDate == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: EDC - Request Rack ******************************
  // Get values for variables
  var getEdcRack = g_form.getValue('rack_location_edc');
  // Verify correct task
  if (getShortDesc.indexOf('EDC - Request Rack') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('rack_location_edc', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getEdcRack == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: WDC - Request Rack ******************************
  // Get values for variables
  var getWdcRack = g_form.getValue('rack_location_wdc');
  // Verify correct task
  if (getShortDesc.indexOf('WDC - Request Rack') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('rack_location_wdc', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getWdcRack == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: EDC - Provide Power ******************************
  // Get values for variables
  var getEdcElec = g_form.getValue('electrical_rec_edc');
  // Verify correct task
  if (getShortDesc.indexOf('EDC - Provide Power') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('electrical_rec_edc', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getEdcElec == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ****************************** Task Name: WDC - Provide Power ******************************
  // Get values for variables
  var getWdcElec = g_form.getValue('electrical_rec_wdc');
  // Verify correct task
  if (getShortDesc.indexOf('WDC - Provide Power') > -1) {
    // Checks if Task is assigned and the fulfillers is trying to close the task then makes fulfiller fields mandatory
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('electrical_rec_wdc', true);
    }
    // Allows the fulfiller to make changes to variables, reassign, and save the task if not trying to close ticket
    if (getState != 3) {
      return true;
    } else if (
      // If fulfiller mandatory fields are empty, stop closure and make fill in
      getWdcElec == ''
    ) {
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }
}
