function onLoad() {
  var item = g_form.getControl('current_item');
  var guide = g_form.getControl('sysparm_guide');

  if (item == null && guide == null) return;

  if (item != null && guide != null && item.value == guide.value) return;

  g_form.setDisplay('requested_for'), false;
  g_form.setDisplay('ref_billing_code'), false;
  g_form.setDisplay('employee_type'), false;
  g_form.setDisplay('name_first'), false;
  g_form.setDisplay('name_middle'), false;
  g_form.setDisplay('name_last'), false;
  g_form.setDisplay('start_date'), false;
  g_form.setDisplay('job_title'), false;
  g_form.setDisplay('ref_agency'), false;
  g_form.setDisplay('ref_division'), false;
  g_form.setDisplay('ref_section'), false;
  g_form.setDisplay('ref_unit'), false;
  g_form.setDisplay('physical_cube'), false;
  g_form.setDisplay('physical_address'), false;
}
