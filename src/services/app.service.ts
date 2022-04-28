import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): string {
    return 'Welcome to BlockCMS!, refer to documentation for more details';
  }
}
