const BASE_URL =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";
export const initialUser = {
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};
export const makeUser = (userInfo) => ({ ...initialUser, ...userInfo });

const userApi = {
  get() {
    return fetch(BASE_URL)
      .then((response) => response.json())
      .then((users) => users.map(makeUser));
  },

  delete(user) {
    return fetch(`${BASE_URL}/${user.id}`, {
      method: "DELETE",
    });
  },

  edit(editedUser) {
    return fetch(`${BASE_URL}/${editedUser.id}`, {
      method: "PUT",
      body: JSON.stringify(editedUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
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
      .then((response) => response.json())
      .then((id) => makeUser({ ...userInfo, ...id }));
  },
};

export default userApi;
