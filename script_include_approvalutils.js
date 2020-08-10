// script include
// Name: Approvalutils
// Client Callable: No
// Description: Pulls the approver name and reject comments.
// Accessible from: All applications scopes
var ApprovalUtils = Class.create();
ApprovalUtils.prototype = {
  initialize: function () {},

  getRejComments: function (recID) {
    var approv = new GlideRecord('sysapproval_approver');
    approv.addQuery('document_id', recID);
    approv.addQuery('state', 'rejected');
    approv.query();
    var appArray = [];
    while (approv.next()) {
      appArray.push(approv.comments.getJournalEntry(1));
    }
    return appArray.sort();
  },

  type: 'ApprovalUtils',
};
