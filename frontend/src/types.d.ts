export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Item {
  _id: string;
  image: string | null;
  title: string;
  price: number;
}

export interface FullItem extends Item{
  description: string;
  category: {
    _id: string;
    title: string;
  };
  user: {
    displayName: string;
    phoneNumber: string
  };
}

export interface ItemMutation {
  title: string;
  description: string;
  category: string;
  price: string;
  image: File | null;
}

export interface ItemsWithCategoryName {
  items: IItem[],
  categoryName: string;
}