import { Injectable } from "@nestjs/common";
import { Account } from "./account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountDto } from "./account.dto";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {
  }

  create(accountDto: AccountDto): Promise<Account> {
    const account = new Account();

    account.name = accountDto.name;
    account.type = accountDto.type;
    account.monthStart = accountDto.monthStart;
    account.isActive = accountDto.isActive;

    return this.accountRepository.save(account);
  }

  findById(id: number): Promise<Account> {
    return this.accountRepository.findOne(id);
  }

  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async update(accountDto: AccountDto): Promise<Account> {
    const account = await this.findById(accountDto.id);
    return this.accountRepository.save(this.accountRepository.merge(account, accountDto));
  }
}
