// pages/index.tsx
import React from 'react';
import Game from "~/components/Game";


const HomePage: React.FC = () => {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
          <h1 className='text-center font-extrabold text-6xl'> Memory Game </h1>
          <Game />
      </main>
  );
}

export default HomePage;
