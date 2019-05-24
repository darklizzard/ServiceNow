/******************************************************************************
 * Catalog Client Script                                                      *
 * This script is used to validate phone number variables. It will issue a    *
 * warning and then wipe out the data entered with message for user to enter  *
 * a valid number.                                                            *
 * @UI_Type [All]                                                             *
 * @Application [Global]                                                      *
 * @Type [onChange]                                                           *
 * @Applies_Catalog_Item [True]                                               *
 * @Applies_Target_Record [False]                                             *
 ******************************************************************************/
 function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}

	// Allows formats of (999) 999-9999, 999-999-9999, and 9999999999
	var pattern = /^[(]?(\d{3})[)]?[-|\s]?(\d{3})[-|\s]?(\d{4})$/;
		if(!pattern.test(newValue)){
			alert('Enter a valid phone number');
			g_form.setValue('phone_number', '');
		}
	}
