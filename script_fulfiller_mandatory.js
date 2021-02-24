function onSubmit() {
  // This script allows the fulfillers to re-assign the task and have mandatory fields before submit.

  // Get variable for Task Form fields
  var getState = g_form.getValue('state');
  var getAssigned = g_form.getValue('assigned_to');
  var getShortDesc = g_form.getValue('short_description');

  // Get variables for Hold Kickoff Meeting fields
  var getMeeting = g_form.getValue('meeting_date');
  var getAttend = g_form.getValue('meeting_attendance');
  var getProjected = g_form.getValue('projected_delivery_date');
  var getFulfilAnswer = g_form.getValue('sts01_needed');
  var getElectricEdc = g_form.getValue('electrical_needed_edc');
  var getElectricWdc = g_form.getValue('electrical_needed_wdc');
  var getWanAnswer = g_form.getValue('wan_needed');
  var getDataAnswer1 = g_form.getValue('data_center_edc');
  var getDataAnswer2 = g_form.getValue('data_center_edc');

  // Get variables for Create 3002 task fields
  var getInitial3002 = g_form.getValue('initial_3002_attached');
  var getInitialDate = g_form.getValue('initial_3002_date_received');
  var getCustomerBails = g_form.getValue('customer_bails');

  // Get variables for Verify Checklist task fields
  var getExtSubmit = g_form.getValue('ext_cust_submit_date');
  var getExtTrain = g_form.getValue('ext_cust_train_date');
  var getAdminVerify = g_form.getValue('ext_admin_verify_date');
  var getCustStateId = g_form.getValue('ext_cust_stateid_date');
  var getDatacenterDate = g_form.getValue('ext_cust_datacenter_date');

  // Get variables for Request Rack Location
  var getEdcRack = g_form.getValue('rack_location_edc');
  var getWdcRack = g_form.getValue('rack_location_wdc');

  // Get variables for Provide Electrical
  var getEdcElec = g_form.getValue('electrical_rec_edc');
  var getWdcElec = g_form.getValue('electrical_rec_wdc');

  // Hold Kickoff Meeting Task - Make Mandatory
  if (getShortDesc.indexOf('Hold Floor Hosting Kickoff Meeting') > -1) {
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('meeting_date', true);
      g_form.setMandatory('meeting_attendance', true);
      g_form.setMandatory('projected_delivery_date', true);
      g_form.setMandatory('data_center_edc', true);
    }
  }
  // Hold Kickoff Meeting Task - Stop closure of ticket until required fields is filled
  if (getState != 3 && getShortDesc.indexOf('Hold Floor Hosting Kickoff Meeting') > -1) {
    return true;
  } else {
    if (getShortDesc.indexOf('Hold Floor Hosting Kickoff Meeting') > -1) {
      if (getMeeting == '' || getAttend == '' || getProjected == '') {
        alert('Please fill out field(s) under Variables tab before closing task.');
        return false;
      }
    }
  }

  // Create 3002 Task - Make Mandatory
  if (getShortDesc.indexOf('Create 3002') > -1) {
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('initial_3002_attached', true);
      g_form.setMandatory('initial_3002_date_received', true);
      g_form.setMandatory('customer_bails', true);
    }
  }
  // Create 3002 - Stop closure of ticket until required fields is filled
  if (getState != 3 && getShortDesc.indexOf('Create 3002') > -1) {
    return true;
  } else {
    if (getShortDesc.indexOf('Create 3002') > -1) {
      if (getInitialDate == '' || getInitial3002 == 'false') {
        alert('Please fill out field(s) under Variables tab before closing task.');
        return false;
      }
    }
  }

  // Verify Checklist - Make Mandatory
  if (getShortDesc.indexOf('Verify Checklist') > -1) {
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('ext_cust_submit_date', true);
      g_form.setMandatory('ext_cust_train_date', true);
      g_form.setMandatory('ext_admin_verify_date', true);
      g_form.setMandatory('ext_cust_stateid_date', true);
      g_form.setMandatory('ext_cust_datacenter_date', true);
    }
  }
  // Verify Checklist - Stop closure of ticket until required fields is filled
  if (getState != 3 && getShortDesc.indexOf('Verify Checklist') > -1) {
    return true;
  } else {
    if (getShortDesc.indexOf('Verify Checklist') > -1) {
      if (getExtSubmit == '' || getExtTrain == '' || getAdminVerify == '' || getCustStateId == '' || getDatacenterDate == '') {
        alert('Please fill out field(s) under Variables tab before closing task.');
        return false;
      }
    }
  }

  // EDC - Rack Location - Make Mandatory
  if (getShortDesc.indexOf('EDC - Request Rack') > -1) {
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('rack_location_edc', true);
    }
  }
  // EDC - Rack Location - Stop closure of ticket until required fields is filled
  if (getState != 3 && getShortDesc.indexOf('EDC - Request Rack') > -1) {
    return true;
  } else {
    if (getShortDesc.indexOf('EDC - Request Rack') > -1) {
      if (getEdcRack == '') {
        alert('Please fill out field(s) under Variables tab before closing task.');
        return false;
      }
    }
  }

  // WDC - Rack Location - Make Mandatory
  if (getShortDesc.indexOf('WDC - Request Rack') > -1) {
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('rack_location_wdc', true);
    }
  }
  // WDC - Rack Location - Stop closure of ticket until required fields is filled
  if (getState != 3 && getShortDesc.indexOf('WDC - Request Rack') > -1) {
    return true;
  } else {
    if (getShortDesc.indexOf('WDC - Request Rack') > -1) {
      if (getWdcRack == '') {
        alert('Please fill out field(s) under Variables tab before closing task.');
        return false;
      }
    }
  }

  // EDC - Provide Electrical - Make Mandatory
  if (getShortDesc.indexOf('EDC - Provide Electrical') > -1) {
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('electrical_rec_edc', true);
    }
  }
  // EDC - Provide Electrical - Stop closure of ticket until required fields is filled
  if (getState != 3 && getShortDesc.indexOf('EDC - Provide Electrical') > -1) {
    return true;
  } else {
    if (getShortDesc.indexOf('EDC - Provide Electrical') > -1) {
      if (getEdcElec == '') {
        alert('Please fill out field(s) under Variables tab before closing task.');
        return false;
      }
    }
  }
  // WDC - Provide Electrical - Make Mandatory
  if (getShortDesc.indexOf('WDC - Provide Electrical') > -1) {
    if (getAssigned != '' && getState == 3) {
      g_form.setMandatory('electrical_rec_wdc', true);
    }
  }
  // WDC - Provide Electrical - Stop closure of ticket until required fields is filled
  if (getState != 3 && getShortDesc.indexOf('WDC - Provide Electrical') > -1) {
    return true;
  } else {
    if (getShortDesc.indexOf('WDC - Provide Electrical') > -1) {
      if (getWdcElec == '') {
        alert('Please fill out field(s) under Variables tab before closing task.');
        return false;
      }
    }
  }
}
