(function executeRule(current, previous /*null when async*/) {
  // Add your code here
  var prb = new GlideRecord('problem');
  prb.addEncodedQuery('parent=' + current.sys_id);
  prb.query();
  if (!prb.next()) {
    gs.addInfoMessage('Please link a Problem Record at the bottom Probem Tab');
    action.setRedirectURL(current);
    current.setAbortAction(true);
  }
})(current, previous);
