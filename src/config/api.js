let API_URL = 'https://stg.iyzipay.com/v1/iyziup/form';
if (process.env.REACT_APP_SANDBOX) {
  API_URL = 'https://sandbox-api.iyzipay.com/v1/iyziup/form';
}

if (process.env.REACT_APP_PROD) {
  API_URL = 'https://iyziup.iyzipay.com/v1/iyziup/form';
}

export default {
  retriveFormContent: `${API_URL}/content/retrieve`,
  checkConsumer: `${API_URL}/consumer/check`,
  verifyConsumer: `${API_URL}/consumer/verify`,
  retrive: `${API_URL}/installment/retrieve`,
  placeZenOrder: `${API_URL}/order/place`,
  place3ds: `${API_URL}/order/place3ds`
};
