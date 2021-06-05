export const validateMobile = (number = '') => {
  var regex = /^([6-9]{1})([0-9]{9})$/;
  return regex.test(number);
};
export const validateEmail = (email = '') => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isEmpty = (text = '') => {
  let returnVal = false;
  if (typeof text === 'string') {
    returnVal = text.length === 0;
  } else if (Array.isArray(text)) {
    returnVal = text.length === 0;
  } else {
    returnVal = !text;
  }
  return returnVal;
};

export const validateStringWithSpace = (testString = '') => {
  var regex = /^(?![\s.]+$)[a-zA-Z\s.]*$/; //^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, \.])*$/
  return regex.test(testString);
};
