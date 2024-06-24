export default class Response<T> {
    data?: T;
    isSuccessful: boolean;
    code: number;
    message: string;

    constructor(data: T, isSuccessful: boolean, code: number, message: string) {
        this.data = data;
        this.isSuccessful = isSuccessful;
        this.code = code;
        this.message = message;
    }
}