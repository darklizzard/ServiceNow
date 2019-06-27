//Loop thru Record Producer variables and sort the order; leaves out null variables.
current.description = createDescription();

function createDescription() {
    var description = '',
        rpVarIDs = [];
    for (var v in producer) {
        if (v.startsWith("IO")) { // Only Questions
            // Collect Sys IDs of Questions
            rpVarIDs.push(v.substring(2));
        }
    }
    var question = new GlideRecord('item_option_new');
    question.addEncodedQuery('sys_idIN' + rpVarIDs.join() + '^ORDERBYorder');
    question.query();
    while (question.next()) {
        var propName = "IO" + question.sys_id.toString();
        if (producer[propName]) {
            description += question.question_text + ": " + producer[propName].getDisplayValue() + "\n"; // Set key:value pair to variable
        }
    }
    return description;
}
