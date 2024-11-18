import express from 'express';
import productService from '../services/productService.js';

const productController = {
    // 상품 목록 조회
    getProductList: async (req, res) => {
        try {
            const products = await productService.getProductList();
            res.status(200).json(products);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    // 상품 등록
    uploadProduct: async (req, res) => {
        try {
            const productData = req.body; // 요청 본문에서 상품 데이터 가져오기
            const result = await productService.uploadProduct(req, productData);
            res.status(201).json(result);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    // 상품 수정
    updateProduct: async (req, res) => {
        try {
            const { productId, updateData } = req.body; // 요청 본문에서 상품 ID와 수정할 데이터 가져오기
            const result = await productService.updateProduct(productId, updateData);
            res.status(200).json(result);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    // 상품 삭제
    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.body; // 요청 본문에서 상품 ID 가져오기
            const result = await productService.deleteProduct(productId);
            res.status(200).json(result);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
};

export default productController;
