import Config from 'react-native-config';

const config = {
  apiBaseUrl: Config.API_BASE_URL,
  uriLogin: Config.API_LOGIN_URI,
  uriAgenda: Config.API_AGENDA_URI,
  timeout: Number(Config.API_TIMEOUT),
};

export default config;
