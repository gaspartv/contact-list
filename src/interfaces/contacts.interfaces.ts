export interface IContacts {
  id: number;
  name: string;
  age: number;
  phone: IPhones[];
}

export interface IcontactCreate {
  name: string;
  age: number;
}

export interface IPhones {
  id: number;
  num: string;
  contactId: number;
}

export interface IPhonesCreate {
  num: string;
}
