export interface IUser {
  username: string;
  password: string;
  token: string;
  displayName: string;
  phoneNumber: string;
}

export interface IItem {
  _id: string;
  image: string | null;
  title: string;
  price: number;
  category: {
    _id: string;
    title: string;
  }
}
