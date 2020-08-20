/**
 * Name: Create FSC Pdf
 * Table: DIT CAB FSC (u_dit_cab_fsc)
 * Applicaton: Global
 * Active: true
 * Advanced: true
 * Description:
 * A scheculed job runs which inserts the record into the u_dit_cab_fsc. A business rules runs on insert (DIT Create FSC PDF)
 * that generates and attaches the pdf to the table record. Notificiation runs on event queued (send.fsc.pdf).
 */
(function executeRule(current, previous /*null when async*/) {
  var type = current.getValue('u_type');
  var json_data = current.getValue('u_json_data');
  var tempTable = 'u_general_document_template';
  var tempName = '';
  var sourceTable = '';
  if (type == 'ACAB' && json_data != 'No data found for report') {
    tempName = 'Change ACAB';
    sourceTable = 'u_dit_cab_fsc';
    global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, 'ACAB ' + current.u_date_period);
    sendPdfDelayed();
  }
  if (type == 'FSC' && json_data != 'No data found for report') {
    tempName = 'Change FSC';
    sourceTable = 'u_dit_cab_fsc';
    global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, 'CAB FSC ' + current.u_date_period);
    sendPdfDelayed();
  }
  if (type == 'FSC - Delta' && json_data != 'No data found for report') {
    tempName = 'Change FSC - Delta';
    sourceTable = 'u_dit_cab_fsc';
    global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, 'CAB FSC - Delta ' + current.u_date_period);
    sendPdfDelayed();
  }
  if (type == 'PSO' && json_data != 'No data found for report') {
    tempName = 'Change PSO';
    sourceTable = 'u_dit_cab_fsc';
    global.GeneralDocForm.generate(current.sys_id, sourceTable, tempTable, tempName, 'Change PSO ' + current.u_date_period);
    sendPdfDelayed();
  }

  function sendPdfDelayed() {
    var gdt = new GlideDateTime();
    gdt.addSeconds(180); // adds 3 minutes to the date/time as an example
    gs.eventQueueScheduled('send.fsc.pdf', current, gs.getUserID(), gs.getUserName(), gdt);
  }
})(current, previous);
