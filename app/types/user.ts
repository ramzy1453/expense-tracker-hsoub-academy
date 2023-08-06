interface IUser {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuth {
  user: IUser;
  token: string;
}
