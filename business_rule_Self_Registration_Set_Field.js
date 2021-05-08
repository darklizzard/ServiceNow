/**
 * Name: Self Registration Set Field
 * Table: User Registration Request [user_registration-request]
 */
(function executeRule(current, previous /*null when async*/) {
  if (current.u_view == 'contact_tracing') {
    current.u_agency = '29fc833fdbffdb8065fbf482ba961905'; // Private Business - PVB
    current.u_division = '2a9af4fc1bb6d4100091db1ee54bcbca'; // Contact Tracing
  }
  if (current.u_view == 'ess') {
    current.u_agency = '29fc833fdbffdb8065fbf482ba961905'; // Private Business - PVB
    current.u_division = '5540b62edbbd90507ea9d2e3ca961992'; // Contact Tracing
  }
})(current, previous);
