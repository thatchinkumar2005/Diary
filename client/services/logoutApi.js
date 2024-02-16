export default async function logout(axiosPrivate) {
  try {
    const resp = await axiosPrivate.get("/auth/logout");
    return resp;
  } catch (error) {
    throw new Error(error.response.status);
  }
}
