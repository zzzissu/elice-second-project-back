import Product from '../models/product.js';

const productService = {
    // 상품 리스트 조회
    getProductList: async () => {
        try {
            // 삭제되지 않은 상품만 조회
            const products = await Product.find({ deletedAt: null, state: false }).sort({ createdAt: -1 });
            return products;
        } catch (e) {
            throw new Error('상품 리스트 조회에 실패했습니다.');
        }
    },

    // 상품 등록
    uploadProduct: async (productData) => {
        try {
            const { name, image, price, description, seller_id, state, category_id } = productData;

            // 새 상품 생성
            const newProduct = new Product({
                name,
                image,
                price,
                description,
                seller_id,
                state,
                category_id,
            });

            // 상품 저장
            await newProduct.save();
            return { message: '상품이 성공적으로 등록되었습니다.', product: newProduct };
        } catch (e) {
            console.log(e);
            throw new Error('상품 등록에 실패했습니다.');
        }
    },

    // 상품 수정
    updateProduct: async (productId, updateData) => {
        try {
            const { name, image, price, description, category_id } = updateData;

            // 상품 업데이트
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: productId, deletedAt: null, state: true }, // 삭제된 상품과 판매된 상품 수정 불가
                { name, image, price, description, category_id, updatedAt: Date.now() },
                { new: true } // 수정된 데이터를 반환
            );
            if (!updatedProduct) {
                throw new Error('상품을 찾을 수 없습니다.');
            }

            return { message: '상품이 성공적으로 수정되었습니다.', product: updatedProduct };
        } catch (e) {
            console.log(e);
            throw new Error('상품 수정에 실패했습니다.');
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
                throw new Error('상품을 찾을 수 없습니다.');
            }

            return { message: '상품이 성공적으로 삭제되었습니다.', product: deletedProduct };
        } catch (e) {
            throw new Error('상품 삭제에 실패했습니다.');
        }
    },
};

export default productService;
