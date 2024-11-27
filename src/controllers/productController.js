import productService from '../services/productService.js';
import asyncHandler from '../utils/asyncHandler.js';

const productController = {
    /*
    // 상품 목록 조회
    getProductList: asyncHandler(async (req, res) => {
        const products = await productService.getProductList();
        res.status(200).json(products);
    }),

    },
    */

    getProductList: asyncHandler(async (req, res, next) => {
        const { currentPage = 1, limit = 12, sort = 'latest', categoryName } = req.query;
        // 상품 리스트 조회 서비스 호출
        const result = await productService.getProductList(Number(currentPage), Number(limit), sort, categoryName);
        // 정상 처리된 결과를 반환
        res.status(200).json(result);
    }),

    // 상품 등록
    uploadProduct: asyncHandler(async (req, res, next) => {
        const productData = req.body; // 요청 본문에서 상품 데이터 가져오기
        const result = await productService.uploadProduct(req, productData);
        res.status(201).json(result);
    }),

    /*
    // 내가 올린 상품만 조회
    getMyProducts: async (req, res, next) => {
       // 로그인된 사용자가 올린 상품 목록 가져오기
       const userId = req.user._id;
       console.log('User ID from Controller:', userId); // userId 확인을 위한 로그
       const myProducts = await productService.getMyProducts(userId);
       res.status(200).json(myProducts);
    },
    */

    // 자신이 등록한 상품목록 조회
    getMyProducts: asyncHandler(async (req, res, next) => {
        const userId = req.user._id;
        const currentPage = parseInt(req.query.currentPage) || 1; // currentPage 파라미터 받기 (기본값: 1)
        const limit = parseInt(req.query.limit) || 6; // 페이지 크기 (기본값: 6)
        console.log('User ID from Controller:', userId); // userId 확인을 위한 로그
        const { myProducts, totalPages } = await productService.getMyProducts(userId, currentPage, limit);
        res.status(200).json({
            message:
                myProducts.length > 0 ? '판매중인 상품 목록을 성공적으로 조회했습니다.' : '등록된 상품이 없습니다.',
            myProducts, // 상품 배열
            currentPage, // 현재 페이지
            totalPages, // 전체 페이지 수
        });
    }),

    // 특정 상품 하나만 조회
    getProduct: asyncHandler(async (req, res, next) => {
        const { productId } = req.params; // URL에서 상품 ID 추출
        const product = await productService.getProduct(productId);
        res.status(200).json(product); // 성공 응답
    }),

    // 상품 수정
    updateProduct: asyncHandler(async (req, res, next) => {
        const { productId } = req.params;
        const { updateData } = req.body; // 요청 본문에서 상품 ID와 수정할 데이터 가져오기
        const userId = req.user._id; // 로그인한 사용자 ID
        const result = await productService.updateProduct(productId, updateData, userId);
        res.status(200).json(result); // 상품 수정 성공
    }),

    // 상품 삭제
    deleteProduct: asyncHandler(async (req, res, next) => {
        const { productId } = req.params; // 요청 본문에서 상품 ID 가져오기
        const userId = req.user._id; // 로그인한 사용자 ID
        const result = await productService.deleteProduct(productId, userId);
        res.status(200).json(result);
    }),
};

export default productController;
