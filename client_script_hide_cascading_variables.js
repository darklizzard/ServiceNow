/**
 * Name: Hide Cascading Variable
 * Applies to: A Variable Set (order Guide specifically)
 * UI Type: All
 * Application: Global
 * Type: OnLoad
 * Variable Set: DIT Employee Boarding
 * Applies on Catalog Item view: True
 */
function onLoad() {
  /*in strict mode ("Isolate script" is true) we don't have access to the window object so it will return null for Service Portal/Mobile and desktop
   * instead we use a try/catch block to test if we have access to g_service_catalog which is only available in Service Portal/Mobile
   */

  /*Service Portal/Mobile code
	____________________________________________________________________________________________________*/
  try {
    //check if we are in an order guide using the g_service_catalog api for Service Portal and Mobile
    var isOrderGuide = g_service_catalog.isOrderGuide();

    if (isOrderGuide) {
      //call function to hide the fields on the catalog items if this is an order guide.
      hideVariables();
    }
  } catch (e) {
    /*Desktop code
	____________________________________________________________________________________________________*/
    /* test that error message relates to g_service_catalog then execute desktop only code.
     */
    if (/g_service_catalog is not defined/.test(e.message)) {
      var item = g_form.getControl('current_item'); //sys_id of the current item
      var guide = g_form.getControl('sysparm_guide'); //sys_id of the order guide

      //check if both HTML elements were returned.
      if (item == null && guide == null) {
        return; //return as we are not in a order guide
      }

      //test that both HTML elements were returned and whether they are equal to each other.
      if (item != null && guide != null && item.value == guide.value) {
        return; //return as we are on the "Describe Needs" section of the order guide
      }
      hideVariables(); //hide the variables if the above conditions weren't met.
    }
  }

  function hideVariables() {
    //variables to be hidden need to be not mandatory before setting display to false.
    //g_form.setMandatory("<your_variable_here>",false);
    g_form.setDisplay('cont_requestor_start', false);
    g_form.setDisplay('cont_employee_start', false);
    g_form.setDisplay('cont_location_start', false);
  }
}
