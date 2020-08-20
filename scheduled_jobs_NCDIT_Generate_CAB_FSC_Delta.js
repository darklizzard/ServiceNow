/**
 * Name: NCDIT Generate CAB FSC - Delta
 * Run: Weekly
 * Day(run_dayofweek): Tuesday
 * Time: 13:00
 */
//get change data
var chg_data = [];
var chg = new GlideRecord('change_request');
//"7957d510db806300f861e3f3ca9619bb" is the sys_id for DIT Dept of Information Technology
chg.addEncodedQuery(
  'typeINnormal,expedited^stateIN-3^company=7957d510db806300f861e3f3ca9619bb^start_dateBETWEENjavascript:gs.beginningOfLast7Days()@javascript:gs.endOfNextMonth()^sys_updated_onRELATIVEGE@minute@ago@2595^ORDERBYstart_date'
);
chg.query();

var count = chg.getRowCount();

while (chg.next()) {
  var chg_rec = {};
  //GDK Changes for day of the week
  var dt = new Date(chg.getDisplayValue('start_date'));
  var days = [', Sunday', ', Monday', ', Tuesday', ', Wednesday', ', Thursday', ', Friday', ', Saturday'];
  var dayName = days[dt.getDay()];
  //End Changes
  chg_rec.sys_id = chg.getValue('sys_id');
  chg_rec.number = chg.getValue('number');
  chg_rec.short_description = chg.getValue('short_description');
  chg_rec.description = chg.getValue('description');
  //chg_rec.start = chg.getDisplayValue("start_date");
  chg_rec.start = chg.getDisplayValue('start_date') + dayName; //GDK Change for Day of the week
  chg_rec.end = chg.getDisplayValue('end_date');
  chg_rec.created = chg.getDisplayValue('sys_created_on');
  chg_rec.updated = chg.getDisplayValue('sys_updated_on');
  chg_rec.impact = chg.getDisplayValue('impact');
  chg_rec.type = chg.getDisplayValue('type');
  chg_rec.state = chg.getDisplayValue('state');
  chg_rec.ci = chg.getDisplayValue('cmdb_ci');
  //chg_rec. = chg.getValue("");//Value for phase - state can be applied
  chg_rec.priority = chg.getDisplayValue('priority');
  chg_rec.urgency = chg.getDisplayValue('urgency');
  chg_rec.approval = chg.getDisplayValue('approval');
  //chg_rec. = chg.getValue(""); // no field for location on current form - may have to come from CI
  chg_rec.assignment_group = chg.getDisplayValue('assignment_group');
  chg_rec.assigned_to = chg.getDisplayValue('assigned_to');
  chg_rec.agencies_affected = chg.getDisplayValue('u_agencies_affected');
  //GDK - added the next line for RITM0164123
  chg_rec.u_all_agencies = chg.getValue('u_all_agencies');
  chg_rec.risk = chg.getDisplayValue('risk');
  chg_rec.risk_score = chg.getValue('u_risk_score');
  chg_rec.environments_impacted = chg.getDisplayValue('u_environments_impacted');
  chg_rec.justification = chg.getValue('justification');
  chg_rec.risk_impact_analysis = chg.getValue('risk_impact_analysis');
  chg_rec.backout_plan = chg.getValue('backout_plan');
  chg_rec.test_plan = chg.getValue('test_plan');
  chg_rec.implementation_plan = chg.getValue('implementation_plan');
  chg_data.push(chg_rec);
}

var data = JSON.stringify(chg_data);

//Get the date range from the retrieved records
var range_start = chg_data[0].start.substring(0, 11);
var range_end = chg_data[chg_data.length - 1].end.substring(0, 11);

//create new fsc record
var fsc = new GlideRecord('u_dit_cab_fsc');
fsc.initialize();
fsc.u_date_period = range_start + ' - ' + range_end;
fsc.u_type = 'FSC - Delta';
if (count > 0) {
  fsc.u_json_data = data;
} else {
  fsc.u_json_data = 'No data found for report';
}
fsc.insert();
