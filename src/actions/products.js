/**
 * Set current department
 * @param data {object} - request parameters
 * @returns {function(*, *)}
 */
export function setCurrentDepartment(data) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_PROMO_PRODUCTS',
      payload: axios.get("http://localhost:3000/assets/mails.json")
    });
  };
}