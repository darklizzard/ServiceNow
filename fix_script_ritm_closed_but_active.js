// Fix Script
var gr = new GlideRecord('sc_req_item');
gr.addEncodedQuery('active=true^state=3');

gr.setLimit(5301);
gr.query();
//gs.log('Rows returned: ' + gr.getRowCount());
while (gr.next()) {
  gr.active = 'false';
  gr.setWorkflow(false); // do not trigger business rules/workflows
  gr.autoSysFields(false); // do not update system fields
  gr.update();
}
