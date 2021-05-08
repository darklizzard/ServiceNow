function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue == '') {
    return;
  }
  var attachmentButton = top.document.getElementsByTagName('sp-attachment-button');
  if (newValue == 'No') {
    attachmentButton[0].parentNode.hidden = false;
  } else {
    attachmentButton[0].parentNode.hidden = true;
  }
}
