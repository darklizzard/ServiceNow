answer = true;

var grCatTask = new GlideRecord('sc_task');
grCatTask.addQuery('request_item', current.sys_id);
grCatTask.query();
while (grCatTask.next()) {
  if (grCatTask.state != 3) {
    // check if the state of TASK is not closed
    answer = false;
  }
}
