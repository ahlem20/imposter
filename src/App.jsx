import React from 'react';
import { useGame } from './context/GameContext';

// Pages
import { Home } from './pages/Home';
import { RoleReveal } from './pages/RoleReveal';
import { GamePhase } from './pages/GamePhase';
import { Voting } from './pages/Voting';
import { Result } from './pages/Result';

const App = () => {
  const { gamePhase } = useGame();

  const renderPhase = () => {
    switch (gamePhase) {
      case 'setup':
        return <Home />;
      case 'reveal':
        return <RoleReveal />;
      case 'game':
        return <GamePhase />;
      case 'voting':
        return <Voting />;
      case 'result':
        return <Result />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 selection:bg-indigo-500/30 font-sans">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900 to-gray-900 -z-10" />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 -z-10 pointer-events-none" />

      <main className="container mx-auto max-w-6xl p-4 min-h-screen flex flex-col justify-center items-center overflow-x-hidden">
        {renderPhase()}
      </main>
    </div>
  );
};

const RootApp = () => {
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
};

// Re-wrap context properly for direct use in same file if needed or export
import { GameProvider } from './context/GameContext';
export default RootApp;
