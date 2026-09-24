"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const MOSAIC_COLORS = [
    'bg-[#ff3300]', // Brand Red
    'bg-[#e62e00]', // Darker red
    'bg-[#ff5522]', // Orange red
    'bg-[#cc2900]', // Deep red
    'bg-[#990033]', // Crimson/Purple
    'bg-[#660066]', // Purple
    'bg-[#4d004d]', // Dark Purple
    'bg-[#ff8844]', // Orange
    'bg-[#330033]', // Very dark purple
];

export default function MosaicReveal() {
    const columns = 16;
    const rows = 10;
    const totalTiles = columns * rows;

    // Store the initial random colors and visibility state
    const [tiles, setTiles] = useState<Array<{ color: string, visible: boolean }>>([]);
    const [revealedCount, setRevealedCount] = useState(0);

    useEffect(() => {
        // Initialize tiles on client side to avoid hydration mismatch
        const initialTiles = Array.from({ length: totalTiles }).map(() => ({
            color: MOSAIC_COLORS[Math.floor(Math.random() * MOSAIC_COLORS.length)],
            visible: true
        }));
        setTiles(initialTiles);
        setRevealedCount(0);
    }, [totalTiles]);

    const handleMouseEnter = (index: number) => {
        if (tiles[index].visible) {
            const newTiles = [...tiles];
            newTiles[index].visible = false;
            setTiles(newTiles);
            setRevealedCount(prev => prev + 1);
        }
    };

    const handleReset = () => {
        const resetTiles = tiles.map(t => ({ ...t, visible: true }));
        setTiles(resetTiles);
        setRevealedCount(0);
    };

    const revealPercentage = totalTiles > 0 ? Math.round((revealedCount / totalTiles) * 100) : 0;

    return (
        <div className="w-full flex flex-col items-end">
            <div className="relative w-full aspect-[747/567] bg-black overflow-hidden border-2 border-neutral-800">
                {/* The Base Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/pathway_mosaic.svg"
                        alt="Pathway mosaic graphic"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* The Interactive Grid Overlay */}
                <div
                    className="absolute inset-0 z-10 grid"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
                    }}
                >
                    {tiles.map((tile, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => handleMouseEnter(i)}
                            // For touch devices:
                            onTouchStart={() => handleMouseEnter(i)}
                            className={`w-full h-full transition-opacity duration-300 ${tile.color} ${tile.visible ? 'opacity-100' : 'opacity-0'} border border-black/20`}
                        />
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className="w-full flex justify-between items-center mt-2 font-pixel text-xs tracking-widest uppercase text-gray-500">
                <div className="flex gap-4">
                    <span>Keep Wandering →</span>
                    <button onClick={handleReset} className="hover:text-white border-b border-dashed border-gray-600 pb-0.5">
                        Reset Mosaic
                    </button>
                </div>
                <span className={revealPercentage === 100 ? 'text-brand font-bold' : ''}>
                    {revealPercentage}% Revealed
                </span>
            </div>
        </div>
    );
}
