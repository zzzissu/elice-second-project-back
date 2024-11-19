import productService from '../services/productService.js';

const productController = {
    // 상품 목록 조회
    getProductList: async (req, res, next) => {
        try {
            const products = await productService.getProductList();
            res.status(200).json(products);
        } catch (e) {
            next(e);
        }
    },
    // 상품 등록
    uploadProduct: async (req, res, next) => {
        try {
            const productData = req.body; // 요청 본문에서 상품 데이터 가져오기
            const result = await productService.uploadProduct(req, productData);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    },
    // 상품 수정
    updateProduct: async (req, res, next) => {
        try {
            const { productId, updateData } = req.body; // 요청 본문에서 상품 ID와 수정할 데이터 가져오기
            //const result = await productService.updateProduct(productId, updateData);
            res.status(204).json({ message: '상품 수정이 완료 되었습니다.' });
        } catch (e) {
            next(e);
        }
    },
    // 상품 삭제
    deleteProduct: async (req, res, next) => {
        try {
            const { productId } = req.body; // 요청 본문에서 상품 ID 가져오기
            const result = await productService.deleteProduct(productId);
            res.status(204).json(result);
        } catch (e) {
            next(e);
        }
    },
};

export default productController;
