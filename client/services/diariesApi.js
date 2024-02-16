export function getAllJournals(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate.get("/diaries");
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}

export function getJournal(axiosPrivate) {
  return async ({ queryKey }) => {
    try {
      const [_, id] = queryKey;
      const resp = await axiosPrivate.get(`/diaries/${id}`);
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}

export function createJournal(axiosPrivate) {
  return async ({ title, content, created }) => {
    try {
      const resp = await axiosPrivate.post("/diaries", {
        title,
        content,
        created,
      });
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}

export function updateJournal(axiosPrivate) {
  return async ({ content, title, id, created }) => {
    try {
      const resp = await axiosPrivate.put("/diaries", {
        id,
        content,
        title,
        created,
      });
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}

export function deleteJournal(axiosPrivate) {
  return async (id) => {
    try {
      const resp = await axiosPrivate.delete("/diaries", {
        data: {
          id,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}
