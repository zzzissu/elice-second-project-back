// errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500; // 기본 상태 코드는 500
    let message = err.message || 'Internal Server Error';

    switch (statusCode) {
        case 400: // Bad Request
            message = message || '잘못된 요청입니다.';
            break;
        case 401: // Unauthorized
            message = message || '인증이 필요합니다.';
            break;
        case 402: // Payment Required
            message = message || '결제가 필요합니다.';
            break;
        case 403: // Forbidden
            message = message || '접근 권한이 없습니다.';
            break;
        case 404: // Not Found
            message = message || '요청한 리소스를 찾을 수 없습니다.';
            break;
        case 500: // Internal Server Error
        default:
            message = message || '서버에 오류가 발생했습니다.';
            break;
    }

    res.status(statusCode).json({
        error: {
            status: statusCode,
            message,
        },
    });
};

export default errorMiddleware;
