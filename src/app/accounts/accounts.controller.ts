import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Account } from "./account.entity";
import { AccountsService } from "./accounts.service";
import { AccountDto } from "./account.dto";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller({ path: "/accounts", version: "1" })
@UseGuards(JwtAuthGuard)
export class AccountsController {

  constructor(
    private accountService: AccountsService
  ) {
  }

  @Post()
  addAccount(@Body() accountDto: AccountDto): Promise<Account> {
    return this.accountService.create(accountDto);
  }

  @Get("/")
  findAllAccounts(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get("/:id")
  findById(@Param("id") id: string): Promise<Account> {
    return this.accountService.findById(parseInt(id, 10));
  }

  @Put()
  update(@Body() accountDto: AccountDto): Promise<Account> {
    return this.accountService.update(accountDto);
  }
}
