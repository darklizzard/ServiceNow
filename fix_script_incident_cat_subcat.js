var gr = new GlideRecord('incident');
gr.addEncodedQuery('company.nameLIKEncfast^category=ncfast_adoption^subcategoryLIKEStarting');

gr.setLimit(1);
gr.query();
gs.log('Rows returned: ' + gr.getRowCount());
while (gr.next()) {
  gr.category = 'ncfast_adoption';
  gr.subcategory = 'ncfast_pre_post_adoption_case';
  gr.setWorkflow(false); // do not trigger business rules/workflows
  gr.autoSysFields(false); // do not update system fields
  gr.update();
}
