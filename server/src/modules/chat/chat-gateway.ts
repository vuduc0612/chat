import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { connected } from 'process';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*', // Hoặc '*' nếu bạn muốn cho phép tất cả các origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log('New user connected:', client.id);
    this.server.emit('user joined', {
      message: `User joined the chat: ${client.id}`
    })
  }
  handleDisconnect(client: any) {
    console.log('User disconnected:', client.id)
    this.server.emit('user left', {
      message: `User left the chat: ${client.id}`
    })
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: any): void {
    console.log('message:', message);
    this.server.emit('message', message);
  }
}