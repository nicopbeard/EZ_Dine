const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-2212771.okta.com',
  token: '00r4wsorl3-FjV2qvQxYbQga6J3ap7Uk_Vs2s93zjK'
});

module.exports = client;
