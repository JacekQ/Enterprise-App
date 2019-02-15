export class User {
  id: number;
  email: string;
  image: string;
  firstName: string;
  lastName: string;
  role: any;
  token?: string;
  username: string;
}

export interface Authenticate {
  username: string;
  password: string;
}

export interface AuthenticateData {
  access_token: string;
  userId: number;
}

export interface UserPermission {
  name: string;
  customValue: string;
}

export interface UserRole {
  name: string;
  userPermissions: UserPermission[];
}

