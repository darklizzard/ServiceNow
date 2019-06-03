/**
 * Name: NCDIT Copy Task Comments to RITM
 * Filter Conditions: Additional comments change
 */
(function executeRule(current, previous /*null when async*/) {
 	var gr= new GlideRecord("sc_req_item");
 	gr.get(current.getValue("request_item"));
 	gr.comments=current.comments.getJournalEntry(1);
 	gr.update();
 })(current, previous);
