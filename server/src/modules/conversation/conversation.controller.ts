import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { GetUser } from '../user/decorator/user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Controller('conversations')
@UseGuards(AuthGuard)
export class ConversationController {
  constructor(private conversationService: ConversationService,
                private userService: UserService
  ) {}

  @Post()
  async createConversation(@Body('name') name: string, @GetUser() user: User) {
    return this.conversationService.createConversation(user, name);
  }

  @Get()
  async getUserConversations(@GetUser() user: User) {
    return this.conversationService.getConversationsForUser(user.id);
  }

  @Get(':id')
  async getConversation(@Param('id') id: string) {
    return this.conversationService.getConversationById(Number(id));
  }

  @Post(':id/addUser')
  async addUserToConversation(@Param('id') id: string, @Body('userId') userId: number) {
    const user = await this.userService.getUserById(userId);
    await this.conversationService.addUserToConversation(Number(id), user);
    return { success: true };
  }
}