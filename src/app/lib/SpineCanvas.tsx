// components/SpinePlayer.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import '@esotericsoftware/spine-player/dist/spine-player.css';
import { SpinePlayer, SpinePlayerConfig } from '@esotericsoftware/spine-player';

type Props = {
    jsonUrl: string;
    atlasUrl: string;
    animation: string;
    backgroundColor?: string;
    width?: number;
    height?: number;
};

interface CustomSpinePlayerConfig extends SpinePlayerConfig {
    autoplay?: boolean;
    fit?: "contain" | "cover" | "fill" | "none";
}

interface SpinePlayerInstance {
    setAnimation: (animationName: string, loop: boolean) => void;
  }

export default function SpinePlayerComponent({
    jsonUrl,
    atlasUrl,
    animation,
    width = 348,
    height = 270,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<SpinePlayerInstance | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const config: CustomSpinePlayerConfig = {
            jsonUrl,
            atlasUrl,
            animation,
            backgroundColor: '#00000000',
            preserveDrawingBuffer: true,
            viewport: {
                x: -(width / 2),
                y: -((height / 2) - 220),
                width: width,
                height: height,
                padLeft: 0,
                padRight: 0,
                padTop: 0,
                padBottom: 0,
            },
            showControls: false,
            alpha: true,
            scale: 0.9,
            fit: "contain",
            premultipliedAlpha: true,
            defaultMix: 1,
            success: () => setLoaded(true),
        };

        const player = new SpinePlayer(containerRef.current, config);
        playerRef.current = player;
        return () => {
            player.dispose();
        };
    }, []);

    useEffect(() => {
        if (loaded && playerRef.current) {
            playerRef.current.setAnimation(animation, true);
        }
    }, [animation, loaded]);

    return <div ref={containerRef} className="spine-player-container"
        style={{ width: 'auto', maxWidth: width, aspectRatio: '16 / 9', background: 'transparent' }} />;
}
