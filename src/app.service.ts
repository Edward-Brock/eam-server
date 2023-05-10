import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '✔ EAM SERVER IS RUNNING';
  }
}
