export default function verifyApi(axios) {
  return async (mailToken) => {
    try {
      const resp = await axios.get(`auth/verify/${mailToken}`);
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}
