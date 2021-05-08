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
    // 3 = Close Complete
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
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: Create 3002 ********************
  // Get values of fulfiller fields to make mandatory
  var getInitial3002 = g_form.getValue('initial_3002_attached');
  var getInitialDate = g_form.getValue('initial_3002_date_received');
  var getCustomerBails = g_form.getValue('customer_bails');
  if (getState != 3 && getShortDesc.indexOf('Create 3002') > -1) {
    return true;
  } else {
    if (getInitial3002 == 'false' || getInitialDate == '' || getCustomerBails == '') {
      g_form.setMandatory('initial_3002_attached', true);
      g_form.setMandatory('initial_3002_date_received', true);
      g_form.setMandatory('customer_bails', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: Verify Checklist ********************
  // Get values of fulfiller fields to make mandatory
  var getExtSubmit = g_form.getValue('ext_cust_submit_date');
  var getExtTrain = g_form.getValue('ext_cust_train_date');
  var getAdminVerify = g_form.getValue('ext_admin_verify_date');
  var getCustStateId = g_form.getValue('ext_cust_stateid_date');
  var getDatacenterDate = g_form.getValue('ext_cust_datacenter_date');
  if (getState != 3 && getShortDesc.indexOf('Verify Checklist') > -1) {
    return true;
  } else {
    if (getExtSubmit == '' || getExtTrain == '' || getAdminVerify == '' || getCustStateId == '' || getDatacenterDate == '') {
      g_form.setMandatory('ext_cust_submit_date', true);
      g_form.setMandatory('ext_cust_train_date', true);
      g_form.setMandatory('ext_admin_verify_date', true);
      g_form.setMandatory('ext_cust_stateid_date', true);
      g_form.setMandatory('ext_cust_datacenter_date', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: EDC - Request Rack ********************
  // Get values of fulfiller fields to make mandatory
  var getEdcRack = g_form.getValue('rack_location_edc');
  if (getState != 3 && getShortDesc.indexOf('EDC - Request Rack') > -1) {
    return true;
  } else {
    if (getEdcRack == '') {
      g_form.setMandatory('rack_location_edc', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: WDC - Request Rack ********************
  // Get values of fulfiller fields to make mandatory
  var getWdcRack = g_form.getValue('rack_location_wdc');
  if (getState != 3 && getShortDesc.indexOf('WDC - Request Rack') > -1) {
    return true;
  } else {
    if (getWdcRack == '') {
      g_form.setMandatory('rack_location_wdc', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: EDC - Provide Power ********************
  // Get values of fulfiller fields to make mandatory
  var getEdcElec = g_form.getValue('electrical_rec_edc');
  if (getState != 3 && getShortDesc.indexOf('EDC - Provide Power') > -1) {
    return true;
  } else {
    if (getEdcElec == '') {
      g_form.setMandatory('electrical_rec_edc', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: WDC - Provide Power ********************
  // Get values of fulfiller fields to make mandatory
  var getWdcElec = g_form.getValue('electrical_rec_wdc');
  if (getState != 3 && getShortDesc.indexOf('WDC - Provide Power') > -1) {
    return true;
  } else {
    if (getWdcElec == '') {
      g_form.setMandatory('electrical_rec_wdc', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: Send STS-01 ********************
  // Get values of fulfiller fields to make mandatory
  var getSts01Date = g_form.getValue('sts01_date_received');
  if (getState != 3 && getShortDesc.indexOf('Send STS-01') > -1) {
    return true;
  } else {
    if (getSts01Date == '') {
      g_form.setMandatory('sts01_date_received', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }

  // ******************** Name of Task: Send STS-06 ********************
  // Get values of fulfiller fields to make mandatory
  var getSts06Date = g_form.getValue('sts06_date_received');
  if (getState != 3 && getShortDesc.indexOf('Send STS-06') > -1) {
    return true;
  } else {
    if (getSts06Date == '') {
      g_form.setMandatory('sts06_date_received', true);
      alert('Please fill out field(s) under Variables tab before closing task.');
      return false;
    }
  }
}
