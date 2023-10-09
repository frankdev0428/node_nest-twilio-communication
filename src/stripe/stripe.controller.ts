import { Body, Controller, forwardRef, Get, Inject, Param, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { StripeService } from "./stripe.service";

@ApiTags('StripeController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    // private readonly notificationGateway: NotificationGateway
  ) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Generate a checkout session' })
  @ApiResponse({ status: 200, description: 'return checkout url'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  generateToken() {
    return this.stripeService.createSubscriptionSession();
  }
  
  @Get('subscriptions')
  @ApiOperation({ summary: 'Get subscriptions' })
  @ApiResponse({ status: 200, description: 'return subscriptions'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  listSubscription() {
    return this.stripeService.listSubscriptions();
  }
  
  @Get('customers')
  @ApiOperation({ summary: 'Get customers' })
  @ApiResponse({ status: 200, description: 'return customers'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  listCustomers(@Query('email') email: string) {
    return this.stripeService.listCustomers(email);
  }
  
  @Post('invoice')
  @ApiOperation({ summary: 'Send an invoice' })
  @ApiResponse({ status: 200, description: 'Send an invoice'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  sendInvoice(@Req() req) {
    return this.stripeService.sendInvoice(req.user);
  }
  
  @Post('enable-invoice')
  @ApiOperation({ summary: 'enable an invoice' })
  @ApiResponse({ status: 200, description: 'enable an invoice'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  enableInvoiceHistory(@Req() req) {
    return this.stripeService.enableInvoiceHistory(req.user);
  }
  
  @Post('create-customer-portal-session')
  @ApiOperation({ summary: 'Create a customer portal session' })
  @ApiResponse({ status: 200, description: 'returns a url'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createCustomerPortalSession(@Req() req) {
    return this.stripeService.createCustomerPortalSession(req.user);
  }
}
