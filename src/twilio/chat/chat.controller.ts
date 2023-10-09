import { Body, Controller, forwardRef, Get, Inject, Param, Post, Put, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import ChatHistory from "src/entity/chat-history.entity";
import SMSHistory from "src/entity/sms-history.entity";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { MessagingRequest } from "src/types/request";
import { NotificationGateway } from "../notifications/notification.gateway";
// import { SendSMSDto } from "./dto/send-sms.dto";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@ApiTags('ChatController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  @Get('/users')
  @ApiOperation({ summary: 'Get users except current user.' })
  @ApiResponse({ status: 200, description: 'returns users except current user'})
  @ApiResponse({ status: 500, description: 'When the user with id is not existing, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getUsersForHistory(@Req() req) {
    return this.chatService.getUsersForHistory(req.user);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Generate a chat history of user' })
  @ApiResponse({ status: 200, description: 'returns chat history'})
  @ApiResponse({ status: 500, description: 'When the user with id is not existing, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getChatHistory(@Param('userId') userId: number, @Req() req) {
    return this.chatService.getChatHistory(userId, req.user);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Set chat history as read' })
  @ApiResponse({ status: 200, description: 'returns twilio token'})
  @ApiResponse({ status: 500, description: 'When the user with id is not existing, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  setAsRead(@Param('userId') userId: number, @Req() req) {
    return this.chatService.setAsRead(userId, req.user);
  }

  @Put(':userId/:chatHistoryId')
  @ApiOperation({ summary: 'Set chat history as read' })
  @ApiResponse({ status: 200, description: 'returns twilio token'})
  @ApiResponse({ status: 500, description: 'When the user with id is not existing, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  setChatHistoryAsRead(@Param('userId') userId: number, @Param('chatHistoryId') chatHistoryId: number, @Req() req) {
    return this.chatService.setChatHistoryAsRead(userId, chatHistoryId, req.user);
  }

  @Post('')
  @ApiOperation({ summary: 'Send an internal chat to other user.' })
  @ApiResponse({ status: 200, description: 'returns 200 when it was sent successfully.'})
  @ApiResponse({ status: 500, description: 'When the user with id is not existing, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async sendChat(@Body() createChatDto: CreateChatDto, @Req() req) {
    const chatHistory: ChatHistory = await this.chatService.sendChat(createChatDto, req.user);
    if (chatHistory) {
      this.notificationGateway.emitNewChat({ userId: chatHistory.toUser.id, chatHistory });
    }
    return chatHistory;
  }
}
