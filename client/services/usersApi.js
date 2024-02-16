export function getUserInfo(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate.get("/userprofile");
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}

export function changeName(axiosPrivate) {
  return async ({ fname, lname }) => {
    try {
      const resp = await axiosPrivate.post("/userprofile", { fname, lname });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("Unauthorized");
      }
    }
  };
}

export function changeEmail(axiosPrivate) {
  return async ({ email, pswd }) => {
    try {
      const resp = await axiosPrivate.post("/userprofile/editEmail", {
        email,
        pswd,
      });
      return resp.data;
    } catch (e) {
      if (e.response.status == 401) {
        throw new Error("Invalid Credentials");
      } else if (e.response.status == 400) {
        throw new Error("Enter a different Email Address");
      } else if (e.response.status == 409) {
        throw new Error("Email address already exits");
      } else {
        throw new Error("Server Error");
      }
    }
  };
}

export function changePswd(axiosPrivate) {
  return async ({ oldPswd, newPswd }) => {
    try {
      const resp = await axiosPrivate.post("/userprofile/changePswd", {
        oldPswd,
        newPswd,
      });
      return resp.data;
    } catch (error) {
      if (error.response.status == 401) {
        throw new Error("Invalid Credentials");
      } else {
        throw new Error("Server Error");
      }
    }
  };
}
