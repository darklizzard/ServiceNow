// Fix script
var gr = new GlideRecord('asmt_metric_result');
//var gr = new GlideRecord('asmt_metric_instance');
//gr.addEncodedQuery('metric_type=6c838d6ddb88e300f861e3f3ca9619f4^u_company=NULL'); //DIT Survey and Company is empty
//gr.addEncodedQuery('metric_type=f10ca7dfdb6363007ea9d2e3ca961983^u_company=NULL'); //NC Fast Incident Survey and Company is empty
//gr.addEncodedQuery('metric.metric_type=6c838d6ddb88e300f861e3f3ca9619f4^u_company=NULL');
gr.addEncodedQuery(
  'u_companyISEMPTY^metric.metric_type=f10ca7dfdb6363007ea9d2e3ca961983'
);
//gr.setLimit(10000);
gr.query();
//gs.log('Rows returned: ' + gr.getRowCount());
while (gr.next()) {
  //gr.u_company = '7957d510db806300f861e3f3ca9619bb'; //sysid of DIT
  gr.u_company = '8f479510db806300f861e3f3ca9619d2'; //sysid of NC FAST
  gr.setWorkflow(false); // do not trigger business rules/workflows
  gr.autoSysFields(false); // do not update system fields
  gr.update();
}
