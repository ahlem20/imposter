import React from 'react';
import { useGame } from './context/GameContext';
import { Home as HomeIcon } from 'lucide-react';

// Pages
import { Home } from './pages/Home';
import { RoleReveal } from './pages/RoleReveal';
import { GamePhase } from './pages/GamePhase';
import { Voting } from './pages/Voting';
import { Result } from './pages/Result';

const App = () => {
  const { gamePhase, resetGame } = useGame();

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
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-[100px] -z-10 pointer-events-none" />

      {/* Global Home Button */}
      {gamePhase !== 'setup' && (
        <button
          onClick={resetGame}
          className="fixed top-6 right-6 p-4 bg-gray-800/80 hover:bg-gray-700 text-white rounded-2xl border border-gray-700 shadow-xl transition-all hover:scale-110 z-50 group"
        >
          <HomeIcon size={24} />
          <span className="absolute top-full right-0 mt-2 bg-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
            Exit to Home
          </span>
        </button>
      )}

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
