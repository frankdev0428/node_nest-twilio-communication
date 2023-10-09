import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebchatService } from './webchat.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CreateWebchatDto } from './dto/create-webchat.dto';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateCustomerFromLiveChatDto } from './dto/create-customer.dto';

@ApiTags('WebchatController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('webchat')
export class WebchatController {
  constructor(private readonly webchatService: WebchatService) {
  }

  @Get(':userId/:customerId')
  @ApiOperation({ summary: 'Get webchat history for customer.' })
  @ApiResponse({ status: 200, description: 'If create a webchat history successfully, send history' })
  @UsePipes(ValidationPipe)
  getWebchat(@Param('userId') userId: number, @Param('customerId') customerId: number) {
    return this.webchatService.getWebchat(userId, customerId);
  }

  @Post('receive')
  @ApiOperation({ summary: 'Receive a webchat from widget.' })
  @ApiResponse({ status: 201, description: 'If create a webchat history successfully, send 201' })
  @UsePipes(ValidationPipe)
  receiveWebchat(@Body() createWebchatDto: CreateWebchatDto) {
    return this.webchatService.receiveWebchat(createWebchatDto);
  }

  @Post('send')
  @ApiOperation({ summary: 'Send a webchat to widget.' })
  @ApiResponse({ status: 201, description: 'If create a webchat history successfully, send 201' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  sendWebchat(@Body() createWebchatDto: CreateWebchatDto) {
    return this.webchatService.sendWebchat(createWebchatDto);
  }

  @Post(':userId/search')
  @ApiOperation({ summary: 'returns customers for first name and last name.' })
  @ApiResponse({ status: 200, description: 'returns customers for first name and last name.' })
  @UsePipes(ValidationPipe)
  getPossibleCustomer(@Body() searchCustomerDto: SearchCustomerDto, @Param('userId') userId: number) {
    return this.webchatService.getPossibleCustomer(userId, searchCustomerDto);
  }

  // @Post(':userId/create')
  // @ApiOperation({ summary: 'create a customer from livechat.' })
  // @ApiResponse({ status: 200, description: 'create a customer from livechat.' })
  // @UsePipes(ValidationPipe)
  // createCustomerFromLiveChat(@Body() createCustomerFromLiveChatDto: CreateCustomerFromLiveChatDto, @Param('userId') userId: number) {
  //   return this.webchatService.createCustomerFromLiveChat(userId, createCustomerFromLiveChatDto);
  // }
}
