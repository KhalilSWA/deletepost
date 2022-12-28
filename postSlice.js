import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {

  posts: [],
  auth: false,
  errors: [],
  loading: false,
}

export const createPost = createAsyncThunk('posts/createPost', async (data, { rejectWithValue }) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem("token"),
    },
  }
  try {
    const res = await axios.post("/posts", data, config)
    window.location.reload()
    return res.data
    //console.log(res,"hello")
  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})

export const loadPosts = createAsyncThunk('posts/getPosts', async (data, { rejectWithValue }) => {
  // console.log(data,sessionStorage.getItem("token"))
  // sessionStorage.getItem("token")
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem("token"),
    },
  }
  // console.log(config)
  try {
    const res = await axios.get("/posts/allposts", data, config);
    return res.data
    // console.log(res,"hello")
  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})
export const myPosts = createAsyncThunk('posts/myPosts', async (arg, { rejectWithValue }) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem("token"),
    },
  }
  try {
    const res = await axios.get("/posts/myposts", config);
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})
export const updatePost = createAsyncThunk('post/updatePost', async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "put",
      url: `api/post/${data.postId}`,
      data: { message: data.message },
    })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})
export const deletePost = createAsyncThunk('posts/myposts/deletePost', async (postId, { rejectWithValue }) => {
  try {
    const res = await axios({ method: "delete", url: `posts/myposts/${postId}` })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(createPost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts = payload.post
        state.auth = true
        state.loading = false
        sessionStorage.setItem('token', payload.token)
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false
      })
      .addCase(deletePost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.auth = true
        state.loading = false
        state.posts = state.posts.filter(post => post._id !== payload._id)
        console.log()

      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false
      })
      .addCase(loadPosts.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loadPosts.fulfilled, (state, { payload }) => {
        state.posts = payload
        state.auth = true;
        state.loading = false
      })
      .addCase(loadPosts.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false
      })
      .addCase(myPosts.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(myPosts.fulfilled, (state, { payload }) => {
        // console.log(payload)
        state.posts = payload
        state.auth = true
        state.loading = false
      })
      .addCase(myPosts.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false
      })
      .addCase(updatePost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.auth = true
        state.loading = false
        state.posts.find(post => post._id === payload._id)
        state.message = payload.message
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false
      })
  }
})

export default postSlice.reducer