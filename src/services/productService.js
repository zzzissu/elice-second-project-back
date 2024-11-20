import Product from '../models/product.js';
import { NotFoundError, BadRequestError } from '../class/errorClass.js';

const productService = {
    // 상품 리스트 조회
    getProductList: async () => {
        const products = await Product.find({ deletedAt: null, soldOut: false }).sort({ createdAt: -1 });
        if (!products) {
            throw new NotFoundError('상품 리스트 조회에 실패했습니다.');
        }
        return products;
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
        return { message: '상품이 성공적으로 등록되었습니다.', product: newProduct };
    },

    // 특정 상품 조회
    getProduct: async (productId) => {
        const product = await Product.findOne({ _id: productId, deletedAt: null, soldOut: false });
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
