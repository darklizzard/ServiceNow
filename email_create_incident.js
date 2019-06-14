/*******************************************************************************
 * @Name: Create Incident - NC DIT
 * @Location: System Policy > Email > Inbound Actions
 * @Author: Jeremy Perdue
 *******************************************************************************/

 var sendAutoReply = "true";
 var senderEmail = email.origemail;
 var senderUserID = '' + gs.getUserID();
 var guestAccount = 'a17beaaedb52ab007ea9d2e3ca96198f';
 var event = 'incident.inserted.email.bounce';
 var recipientArray = _getRecipient();

 /******************************************************************************
 * COM Division of Employment Security - QA
 *******************************************************************************/
 if(recipientArray.indexOf('des.qa@its.nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		_sendBounceBack('4f27d110db806300f861e3f3ca961945'); // _sendBounceBack(Company)
 		_cancelProcessing(); // Stop the insert and stop processing this script
 	}else{
 		_createIncident('4f27d110db806300f861e3f3ca961945' , 'f1554d0ddb98630065fbf482ba961906'); // _createIncident(Company , Assignment Group)
 	}
 }
 /******************************************************************************
 * COM Division of Workforce Solutions (DWS) - PROD
 *******************************************************************************/
 if(recipientArray.indexOf('dws.support@nccommerce.com') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		_sendBounceBack('3237d110db806300f861e3f3ca961949'); // _sendBounceBack(Company)
 		_cancelProcessing(); // Stop the insert and stop processing this script
 	}else{
 		_createIncident('3237d110db806300f861e3f3ca961949' , 'f5554d0ddb98630065fbf482ba96191a'); // _createIncident(Company , Assignment Group)
 	}
 }
 if(recipientArray.indexOf('dws.incidents@nccommerce.com') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		_sendBounceBack('3237d110db806300f861e3f3ca961949'); // _sendBounceBack(Company)
 		_cancelProcessing(); // Stop the insert and stop processing this script
 	}else{
 		_createIncident('3237d110db806300f861e3f3ca961949' , 'f5554d0ddb98630065fbf482ba96191a'); // _createIncident(Company , Assignment Group)
 	}
 }
 /******************************************************************************
 * DHHS ACTS Child Support - PROD TPT Email Account, ACTS Customer Support group, Allow Guest
 *******************************************************************************/
 if(recipientArray.indexOf('acts.tpt@dhhs.nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('b7379ddcdb406300f861e3f3ca961932-1'); // _sendBounceBack(Company)
 	}
 	_createIncident('b7379ddcdb406300f861e3f3ca961932' , '52a72295db46eb00767178fdaa9619b8'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DHHS ACTS Child Support - PROD Functional Email Account, ACTS Help Desk group, Allow Guest
 *******************************************************************************/
 if(recipientArray.indexOf('incidents.actsfunc.support@dhhs.nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('b7379ddcdb406300f861e3f3ca961932-2'); // _sendBounceBack(Company)
 	}
 	_createIncident('b7379ddcdb406300f861e3f3ca961932' , '0a554d0ddb98630065fbf482ba96192e'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DHHS Information Technology - DEV
 *******************************************************************************/
 if(recipientArray.indexOf('dhhs.qa@its.nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		_sendBounceBack('46479510db806300f861e3f3ca9619d0'); // _sendBounceBack(Company)
 		_cancelProcessing(); // Stop the insert and stop processing this script
 	}else{
 		_createIncident('46479510db806300f861e3f3ca9619d0' , 'ea558d0ddb98630065fbf482ba961972'); // _createIncident(Company , Assignment Group)
 	}
 }
 /******************************************************************************
 * DHHS NCFAST NC Families Accessing Services through Technology - DEV
 *******************************************************************************/
 if(recipientArray.indexOf('ncfast.qa@its.nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		_sendBounceBack('8f479510db806300f861e3f3ca9619d2'); // _sendBounceBack(Company)
 		_cancelProcessing(); // Stop the insert and stop processing this script
 	}else{
 		_createIncident('8f479510db806300f861e3f3ca9619d2' , '7e558d0ddb98630065fbf482ba9619d6'); // _createIncident(Company , Assignment Group)
 	}
 }
 /******************************************************************************
 * DIT Dept of Information Technology
 *******************************************************************************/
 if(recipientArray.indexOf('dit.sn.int@nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		_sendBounceBack('7957d510db806300f861e3f3ca9619bb-2'); // _sendBounceBack(Company)
 		_cancelProcessing(); // Stop the insert and stop processing this script
 	}else{
 		_createIncident('7957d510db806300f861e3f3ca9619bb' , '1355cd0ddb98630065fbf482ba9619b0'); // _createIncident(Company , Assignment Group)
 	}
 }
 /******************************************************************************
 * DIT GDAC Government Data Analytics Center - PROD - GDAC Support Account, Production Services group
 *******************************************************************************/
 if(recipientArray.indexOf('gdac.support@its.nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('8967d510db806300f861e3f3ca961931-1');
 	}
 	_createIncident('8967d510db806300f861e3f3ca961931' , '9f55014ddb98630065fbf482ba961915'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DIT GDAC Government Data Analytics Center - PROD - GDAC Help Account, Production Services group
 *******************************************************************************/
 if(recipientArray.indexOf('gdachelp@nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('8967d510db806300f861e3f3ca961931-2');
 	}
 	_createIncident('8967d510db806300f861e3f3ca961931' , '9f55014ddb98630065fbf482ba961915'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DIT GDAC Government Data Analytics Center - PROD - CJLEADS Help Account, Production Services group
 *******************************************************************************/
 if(recipientArray.indexOf('cjleadshelp@nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('8967d510db806300f861e3f3ca961931-3');
 	}
 	_createIncident('8967d510db806300f861e3f3ca961931' , '9f55014ddb98630065fbf482ba961915'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DIT GDAC Government Data Analytics Center - PROD - AWHS Help Account, AWHS group
 *******************************************************************************/
 if(recipientArray.indexOf('awhshelp@nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('8967d510db806300f861e3f3ca961931-4');
 	}
 	_createIncident('8967d510db806300f861e3f3ca961931' , '5b55014ddb98630065fbf482ba961906'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DIT GDAC Government Data Analytics Center - PROD - DACS Help Account, DACS group
 *******************************************************************************/
 if(recipientArray.indexOf('dacshelp@nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('8967d510db806300f861e3f3ca961931-5');
 	}
 	_createIncident('8967d510db806300f861e3f3ca961931' , '9355014ddb98630065fbf482ba96190d'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DIT GDAC Government Data Analytics Center - PROD - ECIDS Help Account, ECIDS group
 *******************************************************************************/
 if(recipientArray.indexOf('ncecidshelp@nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		current.u_guest_email = senderEmail;
 		_sendBounceBack('8967d510db806300f861e3f3ca961931-6');
 	}
 	_createIncident('8967d510db806300f861e3f3ca961931' , '1b55014ddb98630065fbf482ba961911'); // _createIncident(Company , Assignment Group)
 }
 /******************************************************************************
 * DPI Dept of Public Instruction - PROD
 *******************************************************************************/
 if(recipientArray.indexOf('dpi.support@dpi.nc.gov') >- 1){
 	if(senderUserID == guestAccount){ // If Sender's email address is not found, the Guest account is used
 		_sendBounceBack('8867d510db806300f861e3f3ca9619f7'); // _sendBounceBack(Company)
 		_cancelProcessing(); // Stop the insert and stop processing this script
 	}else{
 		_createIncident('8867d510db806300f861e3f3ca9619f7' , '2355014ddb98630065fbf482ba961934'); // _createIncident(Company , Assignment Group)
 	}
 }

 /******************************************************************************
 * Sent directly to ncgov@service-now.com
 *******************************************************************************/
 if(recipientArray.indexOf('ncgov@service-now.com') >- 1){
 	_sendBounceBack('ncgov@service-now.com'); // _sendBounceBack(Company)
 	_cancelProcessing(); // Stop the insert and stop processing this script
 }

 /******************************************************************************
 * Send DIT Auto Reply
 *******************************************************************************/
 //if(sendAutoReply == "true" && senderEmail.indexOf('@nc.gov') != -1){
 if(sendAutoReply == "true") {
 	gs.eventQueue("dit.auto.reply", null, gs.getUserID(), null);//Send the auto reply
 	event.state='stop_processing';//stop processing this script
 }

 /******************************************************************************
 * In the event there are multiple people in the TO field,
 * we push them all into an array, then check to see if the
 * array contains any of our addresses.
 *******************************************************************************/
 function _getRecipient(){
 	var recipientList = email.to.toString().split(',');
 	var recipientArr = [];
 	for(i=0;i<recipientList.length;i++){
 		recipientArr.push(recipientList[i].toLowerCase());
 	}
 	return recipientArr;
 }

 /******************************************************************************
 * Set the fields and commit the record
 * current.opened_by is set to the first UserID that matches the From: email address *OOB
 *******************************************************************************/
 function _createIncident(company, assignmentGroup){
 	current.assignment_group = assignmentGroup;
 	current.caller_id = gs.getUserID();
 	current.category = '';
 	current.comments = 'Received from: ' + email.origemail + '\n\n' + email.body_text;
 	current.company = company;
 	current.contact_type = 'email';
 	current.impact = 4;
 	current.incident_state = IncidentState.NEW;
 	current.location = gs.getUser().getLocation();
 	current.notify = 2;
 	current.short_description = email.subject;
 	current.urgency = 4;

 	current.insert();
 	sendAutoReply = "false";
 	event.state='stop_processing';
 }

 /******************************************************************************
 * Set the Guest Account in the custom field
 *******************************************************************************/
 function _setGuest(){
 	current.u_guest_email = email.origemail;
 }

 /******************************************************************************
 * Trigger Event
 * Params :
 * Event to call - incident.inserted.email.bounce
 * There is no current object, so we pass null
 * The sender's email address from email.origemail
 * The sys_id of the company to use in the mail script to determine which bounce
 * back template to use.
 *******************************************************************************/
 function _sendBounceBack(company){
 	sendAutoReply = "false";
 	gs.eventQueue(event, null, senderEmail, company);
 }

 /******************************************************************************
 * Abort insert & cancel processing of inbound action
 *******************************************************************************/
 function _cancelProcessing(){
 	sendAutoReply = "false";
 	current.setAbortAction(true);
 	event.state='stop_processing';
 }
