'use client';

import { useEffect, useRef } from 'react';
import { SpinePlayer } from '@esotericsoftware/spine-player';
import '@esotericsoftware/spine-player/dist/spine-player.css';

interface Props {
    json: string;
    atlas: string;
    png: string;
    animation?: string;
    width?: number;
    height?: number;
}

export default function SpinePlayerComponent({
                                                 json,
                                                 atlas,
                                                 png,
                                                 animation = 'idle',
                                                 width = 600,
                                                 height = 600,
                                             }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const player = new SpinePlayer(containerRef.current, {
            jsonUrl: json,
            atlasUrl: atlas,
            animation,
            backgroundColor: '#00000000',
            showControls: false,
            alpha: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: true,
            viewport: {
                x: 0,
                y: 0,
                width,
                height,
                padLeft: 0,
                padRight: 0,
                padTop: 0,
                padBottom: 0,
            },
        });

        return () => {
            player.dispose();
        };
    }, [json, atlas, png, animation, width, height]);

    return <div ref={containerRef} style={{ width, height }} />;
}
