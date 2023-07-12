export interface ILoginInputs {
  email: string;
  password: string;
}

export interface IRegisterInputs extends ILoginInputs {
  userName: string;
  prefix: string;
  phone: number;
}

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}
