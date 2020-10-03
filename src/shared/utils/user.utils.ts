import { User } from 'firebase';
import { UserData } from '../types/user';

export class UserUtils {
  static parseUserData = (authUser: User): UserData => {
    return {
      id: authUser.uid,
      name: authUser.displayName || '',
      email: authUser.email || '',
    };
  };
}
