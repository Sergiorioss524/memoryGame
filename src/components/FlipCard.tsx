'use client';

import React from 'react';
import Image from 'next/image';

interface FlipCardProps {
    frontImage: string;
    backImage: string;
    isFlipped: boolean;
    onClick: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontImage, backImage, isFlipped, onClick }) => {
    return (
        <div onClick={onClick} style={{ perspective: '1000px', width: '190px', height: '254px', margin: '10px' }}>
            <div
                className="relative w-full h-full"
                style={{
                    transition: 'transform 0.7s',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'none'
                }}
            >
                <div className="absolute flex justify-center items-center w-full h-full rounded-3xl" style={{ backfaceVisibility: 'hidden' }}>
                    <Image src={frontImage} alt="Front of card" layout="fill" objectFit="cover" className='rounded-3xl'/>
                </div>
                <div className="absolute flex justify-center items-center w-full h-full rounded-3xl" style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                }}>
                    <Image src={backImage} alt="Back of card" layout="fill" objectFit="cover" className='rounded-3xl' />
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
