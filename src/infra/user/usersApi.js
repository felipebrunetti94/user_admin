import { makeUser } from "./makeUser";

const BASE_URL =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";

function errorHandler(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const userApi = {
  get() {
    return fetch(BASE_URL)
      .then(errorHandler)
      .then((response) => response.json())
      .then((users) => users.map(makeUser));
  },

  delete(user) {
    return fetch(`${BASE_URL}/${user.id}`, {
      method: "DELETE",
    }).then(errorHandler);
  },

  edit(editedUser) {
    return fetch(`${BASE_URL}/${editedUser.id}`, {
      method: "PUT",
      body: JSON.stringify(editedUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(errorHandler)
      .then((response) => response.json())
      .then(() => makeUser(editedUser));
  },

  create(userInfo) {
    return fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(errorHandler)
      .then((response) => response.json())
      .then((id) => makeUser({ ...userInfo, ...id }));
  },
};

export default userApi;
