import { Module } from '@nestjs/common';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entity/user.entity';
import { Conversation } from '@modules/conversation/entity/conversation.entity';
import { Message } from '@modules/message/entity/message.entity';
import { ConversationParticipant } from '@modules/conversation-participant/entity/conversation-participant.entity';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, Message, ConversationParticipant]),
    JwtModule.register({}),
    CacheModule.register(),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
