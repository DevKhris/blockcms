import Role from '../enums/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestUser } from 'src/interfaces/requestUser.interface';


const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest<RequestUser>();
      const user = req.user;

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
