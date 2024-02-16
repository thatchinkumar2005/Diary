export default function loginApi(axios) {
  return async ({ email, pswd }) => {
    try {
      const resp = await axios.post("/auth/login", { email, pswd });

      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}
