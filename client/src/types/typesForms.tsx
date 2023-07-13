export interface ILoginInputs {
  email: string;
  password: string;
}

export interface IRegisterInputs extends ILoginInputs {
  userName: string;
  prefix: string;
  phone: number;
}

export interface IEditObject {
  name: string;
  phone: string;
  email: string;
}

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export type messageType = string;
