/**
 * This script is used for user criteria to validate the drop down
 * 
 */
var dwsAccess = gs.getUser().getRecord().getValue("u_dws_user_type");
if (dwsAccess == true)
{
  answer = true;
} else {
  answer = false;
}
