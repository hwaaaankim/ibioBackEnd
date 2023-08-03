import { ForbiddenException } from '../exception/ForbiddenException';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticatedUser } from '../../features/user/domain/AuthenticatedUser';

export function Role(roles: string[]): any {
  return (target: any, key: string, descriptor: any) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // Authorization code goes here
      const user = AuthenticatedUser.getInstance();
      console.log(user);
      const found = roles.find((role) => role.toUpperCase() === user.role);
      if (!found) {
        throw new ForbiddenException('Authorization Failed!');
      }
      // Call the original method
      const result = original.apply(this, args);
      // Return the result
      return result;
    };
    return descriptor;
  };
}
