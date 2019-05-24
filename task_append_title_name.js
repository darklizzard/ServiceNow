/************************************************************************
 * Catalog Task - Advance Task Script                                   *
 * This adds employee name, target date, and pulls name of catalog task *
 * to Short Description of the task created                             *
 ************************************************************************/
var firstName = current.variables.dit_ob_first_name;
var lastName = current.variables.dit_ob_last_name;
var targetDate = current.variables.dit_ob_end_date;
var subjectName = "Offboarding--";
var shortDescription = subjectName + activity.name;
task.short_description = "<" + firstName + " " + lastName + ">" + " " + "<" + targetDate + "> " + shortDescription;
