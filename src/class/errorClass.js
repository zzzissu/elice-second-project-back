class CustomError extends Error {
	constructor(message) {
			super(message); // 부모 클래스의 생성자에 메시지를 전달
			this.name = this.constructor.name; // 클래스 이름을 사용
			if (Error.captureStackTrace) {
					Error.captureStackTrace(this, this.constructor);
			} else {
					this.stack = new Error().stack;
			}
	}
}

class BadRequestError extends CustomError {
	constructor(message) {
			super();
			this.message = message;
			this.statusCode = 400;
	}
}

class UnauthorizedError extends CustomError {
	constructor(message) {
			super();
			this.message = message;
			this.statusCode = 401;
	}
}

class PaymentRequiredError extends CustomError {
	constructor(message) {
			super();
			this.message = message;
			this.statusCode = 402;
	}
}

class ForbiddenError extends CustomError {
	constructor(message) {
			super();
			this.message = message;
			this.statusCode = 403;
	}
}

class NotFoundError extends CustomError {
	constructor(message) {
			super();
			this.message = message;
			this.statusCode = 404;
	}
}

class ConflictError extends CustomError {
	constructor(message) {
			super();
			this.message = message;
			this.statusCode = 409;
	}
}

class InternalServerError extends CustomError {
	constructor(message) {
			super();
			this.message = message;
			this.statusCode = 500;
	}
}

export {
	BadRequestError,
	UnauthorizedError,
	PaymentRequiredError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
	InternalServerError,
};