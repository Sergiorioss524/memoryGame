import React from 'react';

interface CardProps {
    emoji: string;
    isFlipped: boolean;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ emoji, isFlipped, onClick }) => {
    return (
        <div className="w-24 h-24 m-2 perspective-1000" onClick={onClick}>
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full bg-gray-200 rounded-lg backface-hidden flex items-center justify-center text-2xl">
                    ❓
                </div>
                <div className="absolute w-full h-full bg-white rounded-lg backface-hidden transform rotate-y-180 flex items-center justify-center text-2xl">
                    {emoji}
                </div>
            </div>
        </div>
    );
};

export default Card;
