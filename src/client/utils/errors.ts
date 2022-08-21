export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    Object.defineProperty(this, "name", { value: "NetworkError" });
  }
}
