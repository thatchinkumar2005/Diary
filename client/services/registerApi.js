export default function registerApi(axios) {
  return async (data) => {
    try {
      const resp = await axios.post("/auth/register", data);
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}
