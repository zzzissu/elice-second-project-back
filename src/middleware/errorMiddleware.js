const errorMiddleware = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;  // statusCode가 없으면 500으로 설정
    const message = err.message || '서버에 문제가 발생했습니다.';
    
    res.status(statusCode).json({ message });
};

export default errorMiddleware;

