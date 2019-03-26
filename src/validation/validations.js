export const required = value => !!value;

export const email = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const password = value => value && /^[\w\d]{6,12}$/i.test(value);

export const maxLength = max => value => value.length <= max;

export const minLength = min => value => value && value.length >= min;

export const expiryDate = (exMonth, exYear) => {
  if (exYear.length !== 2 || exMonth.length !== 2) {
    return false;
  }
  if (parseInt(exMonth - 1, 10) > 11) {
    return false;
  }
  const today = (new Date()).getTime();
  const someday = (new Date()).setFullYear(parseInt(`20${exYear}`, 10), parseInt(exMonth - 1, 10), 1);
  return today < someday;
};
export const cvc = value => value && /^[\d]{3,4}$/i.test(value);



