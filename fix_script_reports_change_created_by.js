// Fix Script in ServiceNow
// You must elevate to Security Admin to update created_by_user field
var gr = new GlideRecord('sys_report');
// Modify query in a list and copy query and modify
gr.addEncodedQuery('sys_created_by=mljordan1');

// Sets the amount of records to modify
gr.setLimit(50);
gr.query();
while (gr.next()) {
  // Change to userid of person for created by
  gr.sys_created_by = 'mbquinn';

  // Change to sys id of user record for the above user so that they match.
  gr.created_by_user = '24a5a42edb4863c065fbf482ba961996';
  gr.setWorkflow(false); // do not trigger business rules/workflows
  gr.autoSysFields(false); // do not update system fields
  gr.update();
}
