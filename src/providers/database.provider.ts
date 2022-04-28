import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';

@Injectable()
export class DatabaseProvider {
  constructor() {
    return createConnection()
      .then((conn) => {
        console.log(
          `[Nest] 5432 - ${Date.now()} Database Connection Established: ${conn}}`,
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
}
