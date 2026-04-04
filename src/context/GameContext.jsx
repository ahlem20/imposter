import React, { createContext, useState, useContext, useEffect } from 'react';
import { categories, avatars, translations } from '../data/mockData';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
    const [players, setPlayers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Food");
    const [impostersCount, setImpostersCount] = useState(1);
    const [word, setWord] = useState('');
    const [imposterIds, setImposterIds] = useState([]);
    const [turnIndex, setTurnIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [descriptions, setDescriptions] = useState({});
    const [gameResult, setGameResult] = useState(null);
    const [gamePhase, setGamePhase] = useState('setup'); // setup, reveal, game, voting, result

    const t = (key) => translations[lang][key] || key;

    useEffect(() => {
        document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);

    const addPlayer = (name) => {
        if (players.length >= 12) return false;
        const newPlayer = {
            id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name,
            avatar: avatars[players.length % avatars.length]
        };
        setPlayers([...players, newPlayer]);
        return true;
    };

    const removePlayer = (id) => {
        const newPlayers = players.filter(p => p.id !== id);
        setPlayers(newPlayers);
        // Adjust imposter count if it exceeds max allowed for new player count
        const maxImposters = Math.max(1, Math.floor(newPlayers.length / 3));
        if (impostersCount > maxImposters) {
            setImpostersCount(maxImposters);
        }
    };

    const startGame = () => {
        if (players.length < 3) return false;

        // Choose random word from selected category and current language
        const categoryWords = categories[selectedCategory][lang];
        const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
        setWord(randomWord);

        // Choose multiple random imposters
        const shuffled = [...players].sort(() => 0.5 - Math.random());
        const selectedImposterIds = shuffled.slice(0, impostersCount).map(p => p.id);
        setImposterIds(selectedImposterIds);

        setTurnIndex(0);
        setVotes({});
        setDescriptions({});
        setGameResult(null);
        setGamePhase('reveal');
        return true;
    };

    const nextPhase = () => {
        const phases = ['setup', 'reveal', 'game', 'voting', 'result'];
        const currentIndex = phases.indexOf(gamePhase);
        if (currentIndex < phases.length - 1) {
            setGamePhase(phases[currentIndex + 1]);
        }
    };

    const submitDescription = (desc) => {
        const currentPlayer = players[turnIndex];
        setDescriptions(prev => ({ ...prev, [currentPlayer.id]: desc }));

        if (turnIndex < players.length - 1) {
            setTurnIndex(prev => prev + 1);
        } else {
            setGamePhase('voting');
        }
    };

    const castVote = (voterId, suspectId) => {
        setVotes(prev => ({ ...prev, [voterId]: suspectId }));
    };

    const tallyVotes = () => {
        const counts = {};
        Object.values(votes).forEach(suspectId => {
            counts[suspectId] = (counts[suspectId] || 0) + 1;
        });

        let maxVotes = 0;
        let votedOutId = null;

        Object.entries(counts).forEach(([suspectId, count]) => {
            if (count > maxVotes) {
                maxVotes = count;
                votedOutId = suspectId;
            }
        });

        // Players win if the person voted out is one of the imposters
        if (imposterIds.includes(votedOutId)) {
            setGameResult('players_win');
        } else {
            setGameResult('imposter_wins');
        }
        setGamePhase('result');
    };

    const resetGame = () => {
        setWord('');
        setImposterIds([]);
        setTurnIndex(0);
        setVotes({});
        setDescriptions({});
        setGameResult(null);
        setGamePhase('setup');
    };

    const value = {
        lang,
        setLang,
        t,
        players,
        selectedCategory,
        setSelectedCategory,
        impostersCount,
        setImpostersCount,
        word,
        imposterIds,
        turnIndex,
        votes,
        descriptions,
        gameResult,
        gamePhase,
        addPlayer,
        removePlayer,
        startGame,
        nextPhase,
        submitDescription,
        castVote,
        tallyVotes,
        resetGame,
        setPlayers
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
