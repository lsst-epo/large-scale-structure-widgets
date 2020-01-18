import axios from 'axios';

const getBaseUrl = function(env) {
  const envs = {
    development: '/',
    staging: '/',
    production: 'https://lsst-epo.github.io/large-scale-structure-widgets/',
  };

  return envs[env] || '/';
};

export default axios.create({
  baseURL: getBaseUrl(process.env.NODE_ENV),
});
