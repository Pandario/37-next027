import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ReversedPostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReversedPostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchReversedPosts = createAsyncThunk('reversedPosts/fetchReversedPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  return data.reverse();
});

const reversedPostsSlice = createSlice({
  name: 'reversedPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReversedPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReversedPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchReversedPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default reversedPostsSlice.reducer;