export interface IUser {
    _id: string;
    name: string;
    email: string;
    email_verified: boolean;
    picture: string;
    password: string
}

export interface IUserResponse {
  success: boolean;
  data: IUser[] | null;
  error: any;
  message: string
}

export interface ErrorResponse {
  success: boolean;
  data: null;
  error: any;
  message: string;
}

export interface IVerifyOptions {
  issuer: string,
  subject: string,
  audience: string,
  expiresIn: string,    // 30 days validity
  algorithm: string[],
}

export enum ErrorMessage {
  RESOURCE_FOUND = `Resource found.`,
  RESOURCE_NOTE_FOUND = `Resource not found.`,
  RESOURCE_FORBIDDEN = `Requested resource can't be found or it's forbidden for current user.`,
  RESOURCE_EXISTS = `Already exists.`,
  RESOURCE_CREATED = `Created successfully.`,
  RESOURCE_UPDATED = `Resource updated successfully`,
  RESOURCE_DELETED = `Resource deleted successfully`
}