/**
 * @author S0AndS0
 * @copyright AGPL-3.0
 * @description Makes use of Browser_Storage.js class
 */



const storage = new Browser_Storage();
if (storage.storage_available != true) throw new Error('We may never have any memory of this...');


function restore_settings() {
  let privacy_notice_read = storage.getItem('checkbox__privacy_notice');
  if (privacy_notice_read != 'true' && privacy_notice_read != true) return false;

  document.getElementById('trigger__privacy_notice').checked = true;
  return true;
}


function store_settings() {
  let privacy_notice_read = storage.getItem('checkbox__privacy_notice');
  if (privacy_notice_read != true) return false;
  if (document.getElementById('trigger__privacy_notice').checked != true) return false;

  storage.setItem('checkbox__privacy_notice', true, 365);
  return true;
}


function toggle_privacy_notice(input_element) {
  if (input_element.checked == true) {
    storage.setItem('checkbox__privacy_notice', input_element.checked, 365);
    return true;
  }
  storage.removeItem('checkbox__privacy_notice');
  storage.clear();
  return false;
}


function input_text_setItem(element_id_key, element_id_value) {
  const key = document.getElementById(element_id_key).value;
  const value = document.getElementById(element_id_value).value;
  return storage.setItem(key, value, 3);
}


function input_text_get(text_element_id, element_id_output, encoded = true) {
  const key = document.getElementById(text_element_id).value;
  const output_element = document.getElementById(element_id_output);

  let gotten_value = storage.getItem(key);
  if (encoded) {
    gotten_value = encodeURIComponent(gotten_value);
  }
  // output_element.setAttribute('data-after', gotten_value);
  output_element.textContent = gotten_value;
  return gotten_value;
}
