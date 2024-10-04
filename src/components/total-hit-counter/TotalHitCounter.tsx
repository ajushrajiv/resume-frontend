"use client"

import WebSocketClient from '@/api/config/websocket-client';
import React, { useEffect, useState } from 'react';

function TotalHitCounter(){
    const [totalHits, setTotalHits] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || '';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const socket = new WebSocketClient(websocketUrl);
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
        }
    }, [websocketUrl]);

    return (
        <div className='font-glegoo'>
            {loading ? '...' : `${totalHits}`}
        </div>
    );
};

export default TotalHitCounter;
