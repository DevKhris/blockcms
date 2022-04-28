import { Request } from 'express';
import { User } from 'src/entities/user.entity';

interface RequestUser extends Request {
  user: User;
}

export { 
  RequestUser
};
