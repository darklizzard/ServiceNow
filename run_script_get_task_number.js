// Run script from catalog workflow
//Get task number and store in scratchpad
var grNum = new GlideRecord('sc_task');
grNum.addQuery('request_item', current.sys_id);
grNum.query();
if (grNum.next()) {
  workflow.scratchpad.taskNumber = grNum.number;
}
