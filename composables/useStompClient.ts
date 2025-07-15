import { Client, IMessage } from '@stomp/stompjs';

export function useStompClient() {
  let client: Client;

  const connect = ({
    url,
    topic,
    token,
    onMessage,
  }: {
    url: string;
    topic: string;
    token: string;
    onMessage: (msg: IMessage) => void;
  }) => {
    client = new Client({
      brokerURL: url,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log(`[STOMP DEBUG] ${str}`),
    });

    client.onConnect = () => {
      console.log('✅ STOMP connected');
      client.subscribe(topic, onMessage);
    };

    client.onStompError = (frame) => {
      console.error('❌ Broker reported error:', frame.headers['message']);
      console.error('ℹ️ Additional details:', frame.body);
    };

    client.activate();
  };

  const disconnect = () => {
    if (client?.active) {
      client.deactivate();
    }
  };

  return { connect, disconnect };
}
