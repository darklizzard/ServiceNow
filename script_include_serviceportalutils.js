/*******************************************************************************
 * References:
 * https://www.servicenowguru.com/scripting/gliderecord-query-cheat-sheet/
 * https://community.servicenow.com/community?id=community_question&sys_id=81b1db6ddbdcdbc01dcaf3231f96190d
 * https://docs.servicenow.com/bundle/london-application-development/page/app-store/dev_portal/API_reference/JSON/concept/c_JSONAPI.html
 * https://docs.servicenow.com/bundle/london-application-development/page/app-store/dev_portal/API_reference/JSON/concept/c_JSONAPI.html#r_JSON-JSON
 ********************************************************************************/

var ServicePortalUtils = Class.create();
ServicePortalUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getUserInformation: function () {
    var thisUser = this.getParameter('sysparm_user'); // Get user passed in from Client Script
    var thisObject = {}; // Create object to hold our user information
    var gr = new GlideRecord('sys_user'); // Standard Glide Query to the Users table
    gr.get(thisUser); // Inline get statement. Returns the whole record without the need for an if or while

    thisObject.phone = '' + gr.phone; // Set object.phone to the user's phone. Use " '' + " to cast the object to a string
    thisObject.email = '' + gr.email; // Set object.email to the user's email. Use " '' + " to cast the object to a string
    thisObject.user_name = '' + gr.user_name; // Set object.user_phone to the user's ncid. Use " '' + " to cast the object to a string
    thisObject.location = '' + gr.location; // Set object.location to the user's location. Use " '' + " to cast the object to a string

    /*******************************************************************************
     * Provides methods to create JSON objects from a string,
     * and to turn JSON objects into strings.
     * See docs link above for more details
     ********************************************************************************/

    var parser = new JSON();
    var data = parser.encode(thisObject);
    return data; // Return the data as a JSON object
  },

  getUserInformation2: function () {
    var thisUser = this.getParameter('sysparm_user'); // Get user passed in from Client Script
    var thisObject = {}; // Create object to hold our user information
    var gr = new GlideRecord('sys_user'); // Standard Glide Query to the Users table
    gr.get(thisUser); // Inline get statement. Returns the whole record without the need for an if or while

    thisObject.phone = '' + gr.phone; // Set object.phone to the user's phone. Use " '' + " to cast the object to a string
    thisObject.ncid = '' + gr.user_name; // Set object.ncid to the user's user id. Use " '' + " to cast the object to a string
    thisObject.location = '' + gr.location; // Set object.ncid to the user's user id. Use " '' + " to cast the object to a string
    thisObject.agency = gr.u_agency.toString(); //GDK added
    thisObject.division = gr.u_division.toString(); //GDK added
    thisObject.email = '' + gr.email; //GDK added
    //thisObject.manager = '' + gr.getDisplayValue('manager');  //ACB added
    thisObject.manager = gr.manager.toString(); //RWM added

    /*******************************************************************************
     * Provides methods to create JSON objects from a string,
     * and to turn JSON objects into strings.
     * See docs link above for more details
     ********************************************************************************/
    var parser = new JSON();
    var data = parser.encode(thisObject);
    return data; // Return the data as a JSON object
  },

  /*******************************************************************************
   * Grabs the group membership to use for leverage in hiding variables.
   *
   *
   *
   *
   ********************************************************************************/

  isGrpMember: function () {
    var userID = this.getParameter('sysparm_userID');
    var groupName = this.getParameter('sysparm_groupName');
    var thisUser = gs.getUser().getUserByID(userID);
    if (thisUser.isMemberOf(groupName)) {
      return true;
    } else {
      return false;
    }
  },
  type: 'ServicePortalUtils',
});
