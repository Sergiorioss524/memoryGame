/* eslint-disable */
'use client'
import React, { useState, useEffect } from 'react';
import FlipCard from './FlipCard';
import { type CardType } from '~/types/types';

const backImages = [
    '/bear.jpg',
    '/cat.jpg',
    '/tiger.jpg',
    '/dog.jpg'
];
const frontImage = '/card2.jpg';
const doubleBackImages = [...backImages, ...backImages];

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Game: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [firstCard, setFirstCard] = useState<CardType | null>(null);
    const [secondCard, setSecondCard] = useState<CardType | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [matchCount, setMatchCount] = useState(0);

    const initializeGame = () => {
        setCards(shuffleArray(doubleBackImages.map((image, index) => ({
            id: index,
            emoji: image,
            isFlipped: false,
            isMatched: false
        }))));
        setFirstCard(null);
        setSecondCard(null);
        setIsChecking(false);
        setTimer(0);
        setIsRunning(false);
        setMatchCount(0);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        } else if (!isRunning && timer !== 0) {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        if (firstCard && secondCard) {
            setIsChecking(true);
            setTimeout(() => {
                if (firstCard.emoji === secondCard.emoji) {
                    setCards(prevCards => prevCards.map(card => {
                        if (card.id === firstCard.id || card.id === secondCard.id) {
                            return { ...card, isMatched: true };
                        }
                        return card;
                    }));
                    setMatchCount(prevCount => prevCount + 1); // Increment match counter
                } else {
                    setCards(prevCards => prevCards.map(card => {
                        if (card.id === firstCard.id || card.id === secondCard.id) {
                            return { ...card, isFlipped: false };
                        }
                        return card;
                    }));
                }
                setFirstCard(null);
                setSecondCard(null);
                setIsChecking(false);
            }, 1000);
        }
    }, [firstCard, secondCard]);

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.isMatched)) {
            setIsRunning(false);
        }
    }, [cards]);

    const handleCardClick = (id: number) => {
        if (isChecking) return;
        if (!isRunning) setIsRunning(true);
        setCards(prevCards => prevCards.map(card => {
            if (card.id === id && !card.isFlipped && !card.isMatched) {
                const newCard = { ...card, isFlipped: true };
                if (!firstCard) {
                    setFirstCard(newCard);
                } else {
                    setSecondCard(newCard);
                }
                return newCard;
            }
            return card;
        }));
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 text-2xl mt-7">Timer: {timer} seconds</div>
            <div className="mb-4 text-2xl">Matches: {matchCount}</div>
            <button
                onClick={initializeGame}
                className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-900 transition duration-300 mt-2"
            >
                Restart
            </button>
            <div className="flex flex-wrap justify-center">
                {cards.map(card => (
                    <FlipCard
                        key={card.id}
                        frontImage={frontImage}
                        backImage={card.emoji}
                        isFlipped={card.isFlipped || card.isMatched}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Game;
