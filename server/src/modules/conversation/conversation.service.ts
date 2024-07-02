import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entity/conversation.entity';
import { User } from '../user/entity/user.entity';
import { ConversationParticipant } from '../conversation-participant/entity/conversation-participant.entity';
import { Message } from '../message/entity/message.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(ConversationParticipant)
    private participantRepository: Repository<ConversationParticipant>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createConversation(creator: User, name?: string): Promise<Conversation> {
    const conversation = new Conversation({
      name,
      user: creator,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastMessage: '',
    });
    await this.conversationRepository.save(conversation);

    await this.participantRepository.save(new ConversationParticipant({
      user: creator,
      conversation: conversation,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return conversation;
  }

  async getConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne({
      where: { id },
      relations: ['conversationParticipants', 'conversationParticipants.user', 'messages', 'messages.user'],
    });
  }

  async getConversationsForUser(userId: number): Promise<Conversation[]> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.conversationParticipants', 'participant')
      .leftJoinAndSelect('participant.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async addUserToConversation(conversationId: number, user: User): Promise<void> {
    const conversation = await this.getConversationById(conversationId);
    await this.participantRepository.save(new ConversationParticipant({
      user: user,
      conversation: conversation,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  async updateLastMessage(conversationId: number, lastMessage: string): Promise<void> {
    await this.conversationRepository.update(conversationId, {
      lastMessage,
      updatedAt: new Date(),
    });
  }

  async addMessage(user: User, conversationId: number, content: string): Promise<Message> {
    const conversation = await this.getConversationById(conversationId);
    const message = new Message({
      user,
      conversation,
      content,
      createdAt: new Date(),
    });
    await this.messageRepository.save(message);
    await this.updateLastMessage(conversationId, content);
    return message;
  }
}