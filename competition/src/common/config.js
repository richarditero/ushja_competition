const dev = 'http://localhost:80/api';
const production =
  'https://postcompapi.ushja.org/api/';

const API_URI = process.env.REACT_APP_ENV === 'production' ? production : dev;

module.exports = {
  cognitoLoginPage:
    'https://ushja.auth.us-east-2.amazoncognito.com/login?client_id=4q5tsnc4bbhoooadja71j8a6ms&response_type=code&scope=aws.cognito.signin.user.admin+email+phone+openid+profile&redirect_uri=http://localhost:3000/auth/',
  api: API_URI
};
