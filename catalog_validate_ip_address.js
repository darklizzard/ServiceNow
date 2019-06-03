/**
 * Catalog Client Script
 * This script is used to validate IP addresses. It will issue a warning
 * and then wipe out the data entered with message for user to enter
 * a valid IP address.
 * @UI_Type [All]                                                             *
 * @Application [Global]                                                      *
 * @Type [onChange]                                                           *
 * @Applies_Catalog_Item [True]                                               *
 * @Applies_Target_Record [False]
 */
 function onChange(control, oldValue, newValue, isLoading) {
 	if (isLoading || newValue == '') {
 		return;
 	}
 var validIpAddressRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
 	if(!validIpAddressRegex.test(newValue)){
 		alert ("Please enter a valid IP Address");
 		g_form.setValue('des_ni_ip_address', '');
 	}
 }
