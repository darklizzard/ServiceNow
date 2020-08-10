/**
 * Used with script_include_ServicePortalUtils, IsGrpMember
 * Used in Variable Set or Catalog client script
 */

function onLoad() {
  var ga = new GlideAjax('ServicePortalUtils');
  ga.addParam('sysparm_name', 'isGrpMember');
  ga.addParam('sysparm_userID', g_user.userID);
  ga.addParam('sysparm_groupName', 'Service Desk (DIT)');
  ga.getXML(hideField);

  // Callback function to process the response returned from the server
  function hideField(response) {
    var answer = response.responseXML.documentElement.getAttribute('answer');
    //alert(answer);
    if (answer == 'false') {
      g_form.setDisplay('auto_close', false);
    }
    if (answer == 'true') {
      g_form.setValue('dit_service_desk', 'Yes');
    }
  }
}
