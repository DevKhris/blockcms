import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';

@Injectable()
export class DatabaseProvider {
  constructor() {
    return createConnection()
      .then(({ isConnected }) => {
        console.log(
          `[Nest] 5432  - ${Date()} LOG [DatabaseConnection] Connection Established: ${isConnected}`,
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
}
