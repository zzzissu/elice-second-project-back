class Error {
	constructor(message) {
		this.message = message;
		this.name = "Error";

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		  } else {
			this.stack = new Error().stack;
		  }
	}
}

class BadRequestError extends Error {
	constructor(message) {
		super()
		this.message = message;
		this.statusCode = 400;
	}
}

class UnauthorizedError extends Error {
	constructor(message) {
		super()
		this.message = message;
		this.statusCode = 401;
	}
}

class PaymentRequiredError extends Error {
	constructor(message) {
		super()
		this.message = message;
		this.statusCode = 402;
	}
}

class ForbiddenError extends Error {
	constructor(message) {
		super()
		this.message = message;
		this.statusCode = 403;
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super()
		this.message = message;
		this.statusCode = 404;
	}
}

class ConflictError extends Error {
	constructor(message) {
		super()
		this.message = message;
		this.statusCode = 409;
	}
}

class InternalServerError extends Error {
	constructor(message) {
		super()
		this.message = message;
		this.statusCode = 500;
	}
}

export default {
	BadRequestError,
	UnauthorizedError,
	PaymentRequiredError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
	InternalServerError,
};