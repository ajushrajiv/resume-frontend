"use client"

import WebSocketClient from '@/api/config/websocket-client';
import React, { useEffect, useState } from 'react';

const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || '';

const socket = new WebSocketClient(websocketUrl);

const TotalHitCounter: React.FC = () => {
    const [totalHits, setTotalHits] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("web socketUrl",websocketUrl);
        const handleTotalHitsUpdate = (data: any) => {
            if (data && data.totalHits) {
                setTotalHits(data.totalHits);
                setLoading(false);
            }
        };

        socket.on('totalHits', handleTotalHitsUpdate);

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            {loading ? '...' : `${totalHits}`}
        </div>
    );
};

export default TotalHitCounter;
