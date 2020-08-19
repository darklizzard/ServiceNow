/**
 * Name: Create FSC Pdf
 * Table: DIT CAB FSC (u_dit_cab_fsc)
 * Applicaton: Global
 * Active: true
 * Advanced: true
 * Description:
 *
 *
 *
 */
(function executeRule(current, previous /*null when async*/ ) {
	var type = current.getValue("u_type");
	var json_data = current.getValue("u_json_data");
	var tempTable = 'u_general_document_template';
	var tempName = '';
	var sourceTable = '';
	if (type == "ACAB" && json_data != "No data found for report") {
		tempName = 'Change ACAB';
		sourceTable = "u_dit_cab_fsc";
		global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, "ACAB " + current.u_date_period);
		gs.eventQueue('send.cab.fsc.acab', current, gs.getUserID(), gs.getUserName());
	}
	if (type == "FSC" && json_data != "No data found for report") {
		tempName = "Change FSC";
		sourceTable = "u_dit_cab_fsc";
		global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, "CAB FSC " + current.u_date_period);
		gs.eventQueue('send.cab.fsc', current, gs.getUserID(), gs.getUserName());
	}
	if (type == "FSC - Delta" && json_data != "No data found for report") {
		tempName = "Change FSC - Delta";
		sourceTable = "u_dit_cab_fsc";
		global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, "CAB FSC - Delta " + current.u_date_period);
		// When is delta sent out.don't see this in the notificatons
		gs.eventQueue('send.cab.fsc', current, gs.getUserID(), gs.getUserName());
	}
	if (type == "PSO" && json_data != "No data found for report") {
		tempName = "Change PSO";
		sourceTable = "u_dit_cab_fsc";
		global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, "Change PSO " + current.u_date_period);
		gs.eventQueue('send.cab.pso', current, gs.getUserID(), gs.getUserName());
	}
})(current, previous);