import { Router } from 'express';
import * as vendorController from './vendor.controller';
import { authenticate as requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as validation from './vendor.validation';

const router = Router();

// Protect ALL routes below with authentication and VENDOR role
router.use(requireAuth);
router.use(requireRole('VENDOR'));

// Dashboard
router.get('/dashboard', vendorController.getDashboardStats);

// Products
router.get('/products', vendorController.getProducts);
router.get('/products/:id', vendorController.getProductById);
router.post('/products', validate(validation.createProductSchema), vendorController.createProduct);
router.put('/products/:id', validate(validation.updateProductSchema), vendorController.updateProduct);
router.delete('/products/:id', vendorController.deleteProduct);

// Orders
router.get('/orders', vendorController.getOrders);
router.get('/orders/:id', vendorController.getOrderById);
router.put('/orders/:id/fulfill', vendorController.updateOrderFulfillment);

// Payouts
router.get('/payouts', vendorController.getPayouts);
router.post('/payouts', validate(validation.requestPayoutSchema), vendorController.requestPayout);

// Settings / Profile
router.get('/profile', vendorController.getProfile);
router.put('/profile', validate(validation.updateProfileSchema), vendorController.updateProfile);
router.put('/bank-details', validate(validation.updateBankDetailsSchema), vendorController.updateBankDetails);

// Reviews
router.get('/reviews', vendorController.getReviews);

export default router;
