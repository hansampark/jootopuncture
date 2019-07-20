export class ApiError extends Error {
  constructor(props) {
    super(props.message);
    console.log('[props]', props);
    this.name = 'ApiError';
    this.status = props.statusCode || 500;
    this.errorCode = props.errorCode;
    this.responseBody = props.responseBody;
    this.endpoint = props.endpoint;
    this.stack = props.stack || new Error().stack;
  }

  toJSON(): string {
    return JSON.stringify({
      message: this.message,
      errorCode: this.errorCode,
      status: this.status,
      endpoint: this.endpoint,
      stack: this.stack
    });
  }
}
