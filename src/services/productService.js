import Product from '../models/product.js';
import { NotFoundError, BadRequestError } from '../class/errorClass.js';

const productService = {
    /*
    // 상품 리스트 조회
    getProductList: async () => {
        const products = await Product.find({ deletedAt: null, soldOut: false }).sort({ createdAt: -1 });
        if (!products) {
            throw new NotFoundError('상품 리스트 조회에 실패했습니다.');
        }
        return products;
    }, 
    */
    
    // 전체 상품 리스트 조회
    getProductList: async (currentPage, limit, sort, categoryName) => {
        // 기본 정렬 조건
        let sortCondition = { createdAt: -1 }; // 최신순
        if (sort === 'oldest') {
            sortCondition = { createdAt: 1 }; // 오래된 순
        }
    
        // 기본 필터 조건
        const filterCondition = { deletedAt: null, soldOut: false };
        if (categoryName) {
            filterCondition.categoryName = categoryName; // 카테고리 필터 추가
        }

        // 로그 추가: filterCondition 확인
        console.log('Filter Condition:', filterCondition);
    
        // currentPage와 limit을 기반으로 offset 계산
        const offset = (currentPage - 1) * limit;
    
        // 데이터 조회
        const products = await Product.find(filterCondition)
            .sort(sortCondition)
            .skip(offset)
            .limit(limit);
    
        // 상품이 없으면 에러 던지기
        if (!products || products.length === 0) {
            throw new NotFoundError('상품 리스트 조회에 실패했습니다.');
        }
    
        // 전체 개수
        const totalProducts = await Product.countDocuments(filterCondition);
    
        // 총 페이지 수 계산
        const totalPages = Math.ceil(totalProducts / limit);
    
        return {
            products,
            totalProducts,
            totalPages, // totalPages 추가
        };
    },

    // 상품 등록
    uploadProduct: async (req, productData) => {
        const { name, image, price, description, categoryName } = productData;

        if (!name || !image || !price || !description || !categoryName) {
            throw new BadRequestError('상품 등록에 실패했습니다. 필수 정보가 누락되었습니다.');
        }
        
        const newProduct = new Product({
            name,
            image,
            price,
            description,
            sellerId: req.user._id,
            categoryName,
        });

        await newProduct.save();

        // 상품을 저장한 후, sellerId로 유저 정보(nickname 포함)를 populate
        const populatedProduct = await Product.findById(newProduct._id).populate('sellerId', 'nickname');

        return { message: '상품이 성공적으로 등록되었습니다.', product: populatedProduct };
    },

    /*
    // 서비스: 내가 올린 상품 조회
    getMyProducts: async (userId) => {
        console.log('User ID:', userId); // userId 확인을 위한 로그

        // 이미 userId가 선언된 경우 재선언하지 않음
        const myProducts = await Product.find({ sellerId: userId, deletedAt: null })
            .populate('sellerId', 'nickname');

        if (myProducts.length === 0) {
            throw new NotFoundError('등록된 상품이 없습니다.'); // NotFoundError 대신 일반 Error 사용
        }

        return myProducts;
    },
    */

    // 서비스: 내가 올린 상품 조회
    getMyProducts: async (userId, currentPage = 1, limit = 6) => {
        console.log('User ID:', userId); // userId 확인을 위한 로그
        const skip = (currentPage - 1) * limit;

        // 전체 상품 수 조회
        const totalCount = await Product.countDocuments({ sellerId: userId, deletedAt: null });
        const totalPages = Math.ceil(totalCount / limit); // 전체 페이지 수 계산

        // 상품 조회
        const myProducts = await Product.find({ sellerId: userId, deletedAt: null })
            .skip(skip)
            .limit(limit)
            .populate('sellerId', 'nickname');

        if (myProducts.length === 0) {
            throw new NotFoundError('등록된 상품이 없습니다.');
        }
        return { myProducts, currentPage, totalPages }; //반환
    },

    // 특정 상품 하나만 조회
    getProduct: async (productId) => {
        const product = await Product.findOne({ _id: productId, deletedAt: null, soldOut: false })
            .populate('sellerId', 'nickname');  // sellerId로 유저의 nickname을 가져옵니다.

        if (!product) {
            throw new NotFoundError('해당 상품을 찾을 수 없습니다.');
        }
        return product;
    },

    // 상품 수정
    updateProduct: async (productId, updateData) => {
        const { name, image, price, description, categoryName } = updateData;
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId, deletedAt: null, soldOut: false },
            { name, image, price, description, categoryName, updatedAt: Date.now() },
            { new: true } // 수정된 데이터를 반환
        );
        if (!updatedProduct) {
            throw new NotFoundError('상품을 찾을 수 없습니다.');
        }
        return { message: '상품이 성공적으로 수정되었습니다.', product: updatedProduct };
    },

    // 상품 삭제
    deleteProduct: async (productId) => {
        const deletedProduct = await Product.findOneAndUpdate(
            { _id: productId, deletedAt: null },
            { deletedAt: Date.now() },
            { new: true } // 삭제된 데이터를 반환
        );
        if (!deletedProduct) {
            throw new NotFoundError('상품을 찾을 수 없습니다.');
        }
        return { message: '상품이 성공적으로 삭제되었습니다.', product: deletedProduct };
    },
};

export default productService;