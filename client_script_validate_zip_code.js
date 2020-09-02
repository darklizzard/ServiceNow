function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return;
  }

  g_form.clearMessages();
  var name = g_form.getValue('u_pin_code');
  if (name == '') return;
  var regex = /^[0-9-+()]*$/;
  if (!regex.test(name)) {
    g_form.showFieldMsg('u_pin_code', 'Please Enter valid number', 'error');
    g_form.clearValue('u_pin_code');
  }
}
