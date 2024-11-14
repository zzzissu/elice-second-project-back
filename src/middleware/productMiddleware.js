const setProductMiddleware = (productSchema) => {
    // 상품 저장 시 createdAt과 updatedAt 설정 (비동기 처리)
    productSchema.pre('save', async function (next) {
        try {
            if (this.isNew) {
                // 새 상품이라면 createdAt을 현재 시간으로 설정
                this.createdAt = Date.now();
            }
            // 상품 저장 시 업데이트 시 updatedAt을 현재 시간으로 설정
            this.updatedAt = Date.now();
            next();
        } catch (e) {
            next(e);
        }
    });

    // 상품 업데이트 시 updatedAt을 갱신하도록 설정
    productSchema.pre('findOneAndUpdate', async function (next) {
        try {
            // 비동기적으로 처리할 필요가 없으므로 await가 필요 없습니다.
            this.set({ updatedAt: Date.now() });
            next();
        } catch (e) {
            next(e);
        }
    });
};

export default setProductMiddleware;
