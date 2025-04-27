import { useEffect } from 'react';
import { Client, IMessage } from '@stomp/stompjs';

export function useStompSubscribe(
    topic: string,
    onMessage: (payload: any) => void
) {
    useEffect(() => {

        const client = new Client({
            brokerURL: `ws://localhost:8080/ws-lamborghini`,
            reconnectDelay: 5000,
            heartbeatIncoming: 0,
            heartbeatOutgoing: 0,
        });

        client.onConnect = () => {
            client.subscribe(topic, (msg: IMessage) => {
                onMessage(JSON.parse(msg.body));
            });
        };

        client.onStompError = frame => {
            console.error('Broker error:', frame.headers['message'], frame.body);
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [topic, onMessage]);
}




