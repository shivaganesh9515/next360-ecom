import { Request, Response, NextFunction } from 'express';
import * as vendorService from './vendor.service';
import { successResponse } from '../../shared/utils/response';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await vendorService.getDashboardStats((req.user as any).id);
    successResponse(res, stats, 'Vendor dashboard stats fetched');
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await vendorService.getProducts((req.user as any).id, req.query);
    successResponse(res, products, 'Vendor products fetched');
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await vendorService.getProductById((req.user as any).id, req.params.id as string);
    successResponse(res, product, 'Vendor product fetched');
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await vendorService.createProduct((req.user as any).id, req.body);
    successResponse(res, product, 'Product created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await vendorService.updateProduct((req.user as any).id, req.params.id as string, req.body);
    successResponse(res, product, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await vendorService.deleteProduct((req.user as any).id, req.params.id as string);
    successResponse(res, null, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await vendorService.getOrders((req.user as any).id, req.query);
    successResponse(res, orders, 'Vendor orders fetched');
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await vendorService.getOrderById((req.user as any).id, req.params.id as string);
    successResponse(res, order, 'Vendor order fetched');
  } catch (error) {
    next(error);
  }
};

export const updateOrderFulfillment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await vendorService.updateOrderFulfillment((req.user as any).id, req.params.id as string, req.body);
    successResponse(res, order, 'Order fulfillment updated');
  } catch (error) {
    next(error);
  }
};

export const getPayouts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payouts = await vendorService.getPayouts((req.user as any).id);
    successResponse(res, payouts, 'Vendor payouts fetched');
  } catch (error) {
    next(error);
  }
};

export const requestPayout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payout = await vendorService.requestPayout((req.user as any).id, req.body);
    successResponse(res, payout, 'Payout requested successfully');
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await vendorService.getProfile((req.user as any).id);
    successResponse(res, profile, 'Vendor profile fetched');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await vendorService.updateProfile((req.user as any).id, req.body);
    successResponse(res, profile, 'Vendor profile updated');
  } catch (error) {
    next(error);
  }
};

export const updateBankDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await vendorService.updateBankDetails((req.user as any).id, req.body);
    successResponse(res, profile, 'Bank details updated');
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await vendorService.getReviews((req.user as any).id, req.query);
    successResponse(res, reviews, 'Vendor reviews fetched');
  } catch (error) {
    next(error);
  }
};
