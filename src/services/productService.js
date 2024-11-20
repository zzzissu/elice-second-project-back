import Product from '../models/product.js';
import { NotFoundError, BadRequestError } from '../class/errorClass.js'

const productService = {
    // 상품 리스트 조회
    getProductList: async () => {
        try {
            // 삭제되지 않은 상품만 조회
            const products = await Product.find({ deletedAt: null, soldOut: false }).sort({ createdAt: -1 });
            return products;
        } catch (e) {
            throw new NotFoundError('상품 리스트 조회에 실패했습니다.');
        }
    },

    // 상품 등록
    uploadProduct: async (req, productData) => {
        try {
            const { name, image, price, description, categoryName } = productData;

            // 새 상품 생성
            const newProduct = new Product({
                name,
                image,
                price,
                description,
                sellerId: req.user._id,
                categoryName,
            });

            // 상품 저장
            await newProduct.save();
            return { message: '상품이 성공적으로 등록되었습니다.', product: newProduct };
        } catch (e) {
            console.log(e);
            throw new BadRequestError('상품 등록에 실패했습니다.');
        }
    },

    // 특정 상품 조회
    getProduct: async (productId) => {
        try {
            // 특정 상품 조회 (삭제되지 않은 상품만)
            const product = await Product.findOne({ _id: productId, deletedAt: null, soldOut: false });

            if (!product) {
                throw new NotFoundError('해당 상품을 찾을 수 없습니다.');
            }

            return product;
        } catch (e) {
            throw new Error(`상품 조회에 실패했습니다: ${e.message}`);
        }
    },

    // 상품 수정
    updateProduct: async (productId, updateData) => {
        try {
            const { name, image, price, description, categoryName } = updateData;

            // 상품 업데이트
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: productId, deletedAt: null, soldOut: false },
                { name, image, price, description, categoryName, updatedAt: Date.now() },
                { new: true } // 수정된 데이터를 반환
            );
            if (!updatedProduct) {
                throw new NotFoundError('상품을 찾을 수 없습니다.');
            }

            return { message: '상품이 성공적으로 수정되었습니다.', product: updatedProduct };
        } catch (e) {
            console.log(e);
            throw new BadRequestError('상품 수정에 실패했습니다.');
        }
    },

    // 상품 삭제
    deleteProduct: async (productId) => {
        try {
            // 논리 삭제 처리 (deletedAt 필드에 현재 시간을 추가)
            const deletedProduct = await Product.findOneAndUpdate(
                { _id: productId, deletedAt: null },
                { deletedAt: Date.now() },
                { new: true } // 삭제된 데이터를 반환
            );

            if (!deletedProduct) {
                throw new NotFoundError('상품을 찾을 수 없습니다.');
            }

            return { message: '상품이 성공적으로 삭제되었습니다.', product: deletedProduct };
        } catch (e) {
            throw new BadRequestError('상품 삭제에 실패했습니다.');
        }
    },
};

export default productService;
