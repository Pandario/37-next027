'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { increment, decrement } from '../lib/features/counter/counterSlice';
import StoreProvider from './StoreProvider';

function HomeContent() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  );
}