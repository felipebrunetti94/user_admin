import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import usersApi from "./usersApi"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await usersApi.get()
  return users
})

export const createUser = createAsyncThunk('users/createUser', async userInfo => {
  const newUSer = await usersApi.create(userInfo)
  return newUSer
})

export const editUser = createAsyncThunk('users/editUser', async user => {
  const editedUser = await usersApi.create(user)
  return editedUser
})

export const deleteUser = createAsyncThunk('users/deleteUser', async user => {
  await usersApi.create(user)
  return user.id
})

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  current: null
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    cancel(state, _) {
      state.status = 'idle'
      state.current = null
    },
    create(state, _) {
      state.status = 'create'
    },
    edit(state, action) {
      state.current = action.payload
      state.status = 'edit'
    },
    remove(state, action) {
      state.current = action.payload
      state.status = 'remove'
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state, _) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(action.payload)
        state.status = 'idle'
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.errors = action.payload
        state.fetching = false
      })
      .addCase(createUser.pending, (state, _) => {
        state.status = 'create_loading'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload)
        state.status = 'idle'
      })
      .addCase(editUser.pending, (state, _) => {
        state.status = 'edit_loading'
      })
      .addCase(editUser.fulfilled, (state, action) => {
        usersAdapter.setOne(state, action.payload)
        state.status = 'idle'
        state.current = null
      })
      .addCase(deleteUser.pending, (state, _) => {
        state.status = 'remove_loading'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload)
        state.status = 'idle'
        state.current = null
      })
  }
})

export const { remove, edit, create, cancel } = usersSlice.actions

export default usersSlice.reducer

export const { selectAll: selectUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(state => state.users)