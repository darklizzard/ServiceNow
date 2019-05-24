/**
 * This run script is the first to run in workflow after start
 * It will set the Request ticket: short description with date, employee name
 * It will also set the manager from the request_for field.
 */

 var reqParent = current.request.getRefRecord();
 var firstName=current.variables.dit_ob_first_name;
 var lastName=current.variables.dit_ob_last_name;
 var updatedManager=current.variables.requested_for.getDisplayValue();
 var targetDate=current.variables.dit_ob_start_date;

// Change short description to reflect name of catalog item
var shortDescription = " DIT Employee On-Boarding";

// Change current short description
current.short_description = "<" + firstName + " " + lastName + ">" + " " + "<" + targetDate + ">" + shortDescription;
current.variables.dit_ob_manager_name=updatedManager;

//Set Parent Request Short Description
reqParent.short_description = current.short_description;
reqParent.autoSysFields(false);
reqParent.update();
