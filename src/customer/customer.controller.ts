import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('CustomerController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  @ApiOperation({ summary: 'Create a customer.' })
  @ApiResponse({ status: 201, description: 'Created a customer successfully, returns "customer created"'})
  @ApiResponse({ status: 401, description: 'When the user is not found, returns 401'})
  @ApiResponse({ status: 400, description: 'When the customer with same email or phone number is existing, returns 400'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createHistoryDto: CreateCustomerDto, @Req() req) {
    return this.customerService.create(createHistoryDto, req.user);
  }

  @Post('multiple')
  @ApiBody({ type: [CreateCustomerDto] })
  @ApiOperation({ summary: 'Create customers from imported data.' })
  @ApiResponse({ status: 201, description: 'Create customers successfully, returns "customers created" (when the customer with same email or phone number is existing, skip creation)'})
  @ApiResponse({ status: 401, description: 'When the user is not found, returns 401'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createMultiple(@Body() createHistoryDtos: CreateCustomerDto[], @Req() req) {
    return this.customerService.createMultiple(createHistoryDtos, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get customers of the current user.' })
  @ApiResponse({ status: 200, description: 'return customers with latest sms and email history' })
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.customerService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by id.' })
  @ApiResponse({ status: 200, description: 'return a customer with sms and email history' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Put('avatar/:id')
  @ApiOperation({ summary: 'Update avatar of a customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no customer with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  updateAvatar(@Param('id') id: string, @Body('avatar') avatar: string, @Req() req) {
    return this.customerService.updateAvatar(+id, avatar, req.user);
  }

  @Put('status/:id')
  @ApiOperation({ summary: 'Update status of a customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no customer with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Req() req) {
    return this.customerService.updateStatus(+id, status, req.user);
  }

  @Put('department/:id')
  @ApiOperation({ summary: 'Update department of a customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no customer with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  updateDepartment(@Param('id') id: string, @Body('department') department: string, @Req() req) {
    return this.customerService.updateDepartment(+id, department, req.user);
  }

  @Put('priority/:id')
  @ApiOperation({ summary: 'Update priority of a customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no customer with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  updatePriority(@Param('id') id: string, @Body('priority') priority: string, @Req() req) {
    return this.customerService.updatePriority(+id, priority, req.user);
  }

  @Put('agent/:id')
  @ApiOperation({ summary: 'Update agent of a customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no customer with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  updateAgent(@Param('id') id: string, @Body('agent') priority: string, @Req() req) {
    return this.customerService.updateAgent(+id, priority, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 400, description: 'If there is no customer with id, returns 400'})
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @Req() req) {
    return this.customerService.update(+id, updateCustomerDto, req.user);
  }

  @Put('email/:id')
  @ApiOperation({ summary: 'Update email of customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 400, description: 'If there is no customer with id, returns 400'})
  @UseGuards(JwtAuthGuard)
  updateEmail(@Param('id') id: string, @Body('email') email: string, @Req() req) {
    return this.customerService.updateEmail(+id, email, req.user);
  }

  @Put('number/:id')
  @ApiOperation({ summary: 'Update number of customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 400, description: 'If there is no customer with id, returns 400'})
  @UseGuards(JwtAuthGuard)
  updateNumber(@Param('id') id: string, @Body('number') number: string, @Req() req) {
    return this.customerService.updateNumber(+id, number, req.user);
  }

  @Put('name/:id')
  @ApiOperation({ summary: 'Update number of customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 400, description: 'If there is no customer with id, returns 400'})
  @UseGuards(JwtAuthGuard)
  updateName(@Param('id') id: string, @Body('name') name: string, @Req() req) {
    return this.customerService.updateName(+id, name, req.user);
  }

  @Put('city/:id')
  @ApiOperation({ summary: 'Update city and state of customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 400, description: 'If there is no customer with id, returns 400'})
  @UseGuards(JwtAuthGuard)
  updateCityState(@Param('id') id: string, @Body('name') name: string, @Req() req) {
    return this.customerService.updateCityState(+id, name, req.user);
  }

  @Put('street/:id')
  @ApiOperation({ summary: 'Update street of customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 400, description: 'If there is no customer with id, returns 400'})
  @UseGuards(JwtAuthGuard)
  updateStreet(@Param('id') id: string, @Body('name') name: string, @Req() req) {
    return this.customerService.updateStreet(+id, name, req.user);
  }

  @Put('facebook/:id')
  @ApiOperation({ summary: 'Update facebook messenger id of customer.' })
  @ApiResponse({ status: 200, description: 'If a customer is updated successfully, returns 200'})
  @ApiResponse({ status: 400, description: 'If there is no customer with id, returns 400'})
  @UseGuards(JwtAuthGuard)
  updateFacebookMessengerId(@Param('id') id: string, @Body('name') name: string, @Req() req) {
    return this.customerService.updateFacebookMessengerId(+id, name, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer.' })
  @ApiResponse({ status: 200, description: 'If the customer is deleted successfully, returns 200'})
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Post('delete-multiple')
  @ApiOperation({ summary: 'Delete customers by ids. Body => { ids: [1,2,3] }' })
  @ApiResponse({ status: 200, description: 'If customers are deleted successfully, returns 201'})
  @UseGuards(JwtAuthGuard)
  removeByIds(@Body('ids') ids: number[]) {
    return this.customerService.removeByIds(ids);
  }

  @Post('merge-customer-for-facebook')
  @ApiOperation({ summary: 'Merge customer1 to customer2' })
  @ApiResponse({ status: 200, description: 'If customers are merged successfully, returns 201'})
  @UseGuards(JwtAuthGuard)
  mergeCustomerForFacebook(@Body('customerId1') customerId1: number, @Body('customerId2') customerId2: number) {
    return this.customerService.mergeCustomerForFacebook(customerId1, customerId2);
  }

  @Post('import-hd')
  @ApiOperation({ summary: 'import customers from hd' })
  @ApiResponse({ status: 201, description: 'If customers are imported successfully, returns 201'})
  @UseGuards(JwtAuthGuard)
  importFromHD(@Req() req) {
    return this.customerService.importFromHD(req.user);
  }

  @Post('import-hd-transaction')
  @ApiOperation({ summary: 'import transactions from hd' })
  @ApiResponse({ status: 201, description: 'If transactions are imported successfully, returns 201'})
  @UseGuards(JwtAuthGuard)
  importTransactionsFromHD(@Req() req) {
    return this.customerService.importTransactionsFromHD(req.user);
  }

  @Get('transactions/:id')
  @ApiOperation({ summary: 'get transactions of a customer' })
  @ApiResponse({ status: 201, description: 'returns transactions'})
  @UseGuards(JwtAuthGuard)
  getTransactions(@Param('id') id: number) {
    return this.customerService.getTransactions(id);
  }

  @Post('import-orders/:id')
  @ApiOperation({ summary: 'Import orders from HD' })
  @ApiResponse({ status: 201, description: 'returns orders'})
  @UseGuards(JwtAuthGuard)
  importOrdersFromHD(@Req() req, @Param('id') id: number) {
    return this.customerService.importOrdersFromHD(id, req.user);
  }

  @Get('webhooks/:id')
  @ApiOperation({ summary: 'get webhooks' })
  @ApiResponse({ status: 201, description: 'returns webhooks'})
  @UseGuards(JwtAuthGuard)
  getWebhooks(@Req() req, @Param('id') id: number) {
    return this.customerService.getWebhooks(id, req.user);
  }
}
