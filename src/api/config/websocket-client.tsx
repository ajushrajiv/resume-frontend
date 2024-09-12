"use client"

type WebSocketEvent = 'totalHits' | string; 

interface WebSocketMessage {
  event: WebSocketEvent;
  data: any;
}

class WebSocketClient {
    private socket: WebSocket | null = null;
    private url: string;
    private listeners: { [event: string]: ((data: any) => void)[] } = {};
    private reconnectInterval: number = 5000;

    constructor(url: string) {
        this.url = url;
        this.initialize();
    }

    private initialize() {
        if (!this.url) {
            throw new Error('WebSocket URL is not defined');
        }

        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        this.socket.onmessage = (event: MessageEvent) => {
            try {
                const message = JSON.parse(event.data);
                this.handleMessage(message);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.socket.onclose = (event: CloseEvent) => {
            console.log(`WebSocket connection closed: ${event.reason}`);
            console.log(`Close code: ${event.code}`);
            if (event.code !== 1000) {
                console.log(`Attempting to reconnect in ${this.reconnectInterval / 1000} seconds...`);
                setTimeout(() => this.initialize(), this.reconnectInterval);
            }
        };

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
        };
    }

    private handleMessage(message: WebSocketMessage) {
        const { event, data } = message;
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => listener(data));
        }
    }

    public sendMessage(event: string, data: any) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ event, data }));
        } else {
            console.error('WebSocket is not open');
        }
    }

    public on(event: string, listener: (data: any) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    public close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default WebSocketClient;
