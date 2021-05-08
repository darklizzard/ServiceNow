// Use this in System Definition > Relationships
// Name: Approvals (RITM)
// Applies to table: Catalog Task [sc_task]
// Queries from table: Approval [sysapproval_approver]

// Query with
(function refineQuery(current, parent) {
  // Add your code here, such as current.addQuery(field, value);
  current.addQuery('sysapproval', parent.request_item);
})(current, parent);
