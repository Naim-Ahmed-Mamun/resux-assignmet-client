export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
  createdBy: string;
}
export type IAddBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  createdBy: string;
}


export type IUser = {
  _id: string;
  name: string;
  email: string;
}

export type IAddUser = {
  name: string;
  email: string;
  password: string;
}