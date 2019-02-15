import { User } from '../../../auth/models/';

export interface UsersData {
    noOfUsers: number;
    users: User[];
}
