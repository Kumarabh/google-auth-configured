import https from 'https';

export const baseUrl = 'https:/jsonplaceholder.typicode.com';
export const httpsOptions = {
  headers: {},
  params: {},
  httpsAgent: new https.Agent({rejectUnauthorized: false})
}