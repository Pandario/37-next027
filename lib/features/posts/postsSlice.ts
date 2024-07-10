import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/*import { deepEqual } from '../../utils';*/

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { getState }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  const state = getState() as { posts: PostsState };

  // Return the existing data to avoid updating the state
  /*if (deepEqual(state.posts.posts, data)) {
    return state.posts.posts;
  }*/

  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // Only update state if the new data is different that was part for fetching data in real-time
        /*if (!deepEqual(state.posts, action.payload)) {
          state.status = 'succeeded';
          state.posts = action.payload;
        } else {
          state.status = 'idle';
        }*/
          state.status = 'succeeded';
          state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postsSlice.reducer;