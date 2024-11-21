import productService from '../services/productService.js';
import asyncHandler from '../utils/asyncHandler.js';

const productController = {
    // 상품 목록 조회
    getProductList: asyncHandler(async (req, res) => {
        const products = await productService.getProductList();
        res.status(200).json(products);
    }),

    // 상품 등록
    uploadProduct: asyncHandler(async (req, res) => {
        const productData = req.body; // 요청 본문에서 상품 데이터 가져오기
        const result = await productService.uploadProduct(req, productData);
        res.status(201).json(result);
    }),

    // 특정 상품 조회
    getProduct: asyncHandler(async (req, res) => {
        const { productId } = req.params; // URL에서 상품 ID 추출
        const product = await productService.getProduct(productId);
        res.status(200).json(product); // 성공 응답
    }),

    // 상품 수정
    updateProduct: asyncHandler(async (req, res) => {
        const { productId, updateData } = req.body; // 요청 본문에서 상품 ID와 수정할 데이터 가져오기
        const result = await productService.updateProduct(productId, updateData);
        res.status(204).json(result); // 상품 수정 성공
    }),

    // 상품 삭제
    deleteProduct: asyncHandler(async (req, res) => {
        const { productId } = req.body; // 요청 본문에서 상품 ID 가져오기
        const result = await productService.deleteProduct(productId);
        res.status(204).json(result);
    }),
};

export default productController;
