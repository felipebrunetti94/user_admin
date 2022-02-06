import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import usersApi from "./usersApi";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const users = await usersApi.get();
  return users;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (_, { getState }) => {
    const { users } = getState();
    const newUSer = await usersApi.create(users.current);
    return newUSer;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (_, { getState }) => {
    const { users } = getState();
    const editedUser = await usersApi.edit(users.current);
    return editedUser;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (_, { getState }) => {
    const { users } = getState();
    await usersApi.delete(users.current);
    return users.current.id;
  }
);

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: "idle",
  current: {},
  errors: {},
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cancel(state, _) {
      state.status = "idle";
      state.current = {};
    },

    create(state, _) {
      state.status = "create";
    },

    edit(state, action) {
      state.current = action.payload;
      state.status = "edit";
    },

    remove(state, action) {
      state.current = action.payload;
      state.status = "remove";
    },

    updateField(state, action) {
      const { fieldname, value } = action.payload;
      state.current[fieldname] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.errors = action.payload;
        state.status = "idle";
      })
      .addCase(createUser.pending, (state, _) => {
        state.status = "create_loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
        state.current = {};
        state.status = "idle";
      })
      .addCase(editUser.pending, (state, _) => {
        state.status = "edit_loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        usersAdapter.setOne(state, action.payload);
        state.status = "idle";
        state.current = {};
      })
      .addCase(deleteUser.pending, (state, _) => {
        state.status = "remove_loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload);
        state.status = "idle";
        state.current = {};
      });
  },
});

export const { remove, edit, create, cancel, updateField } = usersSlice.actions;

export default usersSlice.reducer;

export const { selectAll: selectUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
