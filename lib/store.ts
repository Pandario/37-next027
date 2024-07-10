import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';
import reversedPostsReducer from './features/posts/reversedPostsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      reversedPosts: reversedPostsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];