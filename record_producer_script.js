// Loops through variables in order that they are on the form and double spaces.
// Converts sysid to Display Name for Reported By
var displayName = producer.caller_id.getDisplayValue();

current.company = '7957d510db806300f861e3f3ca9619bb'; //DIT Dept of Information Technoloty
current.assignment_group = 'c355cd0ddb98630065fbf482ba96193d'; //DIT HR
current.caller_id = gs.getUserID(); // Pulls user and sets the incident as the logged in user.
current.u_requested_by = producer.caller_id; // Pulls user and sets Request By field in the incident.
current.contact_type = 'self-service'; // Sets contact type for self-service in the incident.
current.short_description = 'HR VIP (Valuing Individual Performance) Incident'; // Sets short description
current.business_service = '39c494391b69b3000b48524d0d4bcbc6'; //Applications

//Loop thru Record Producer variables and sort the order; leaves out null variables.
current.description = createDescription();
current.work_notes = createDescription();

function createDescription() {
  var description = '',
    rpVarIDs = [];
  for (var v in producer) {
    if (v.startsWith('IO')) {
      // Only Questions
      // Collect Sys IDs of Questions
      rpVarIDs.push(v.substring(2));
    }
  }
  var question = new GlideRecord('item_option_new');
  question.addEncodedQuery('sys_idIN' + rpVarIDs.join() + '^ORDERBYorder');
  question.query();
  while (question.next()) {
    var propName = 'IO' + question.sys_id.toString();
    if (producer[propName]) {
      description += question.question_text + ': ' + producer[propName].getDisplayValue() + '\n\n'; // Set key:value pair to variable
    }
  }
  return description;
}
