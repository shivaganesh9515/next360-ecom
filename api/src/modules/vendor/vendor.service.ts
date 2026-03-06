import { prisma } from '../../config/database';
import { AppError } from '../../shared/errors/AppError';

export const getDashboardStats = async (userId: string) => {
  const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
  if (!profile) throw AppError.notFound('Vendor profile not found');

  const stats = { revenue: 0, orders: 0, activeProducts: 0, avgRating: 0 };
  return stats; // Mock returning real data later
};

export const getProducts = async (userId: string, filters: any) => {
  return prisma.product.findMany({ where: { vendor: { userId } } });
};

export const getProductById = async (userId: string, productId: string) => {
  const product = await prisma.product.findFirst({ where: { id: productId, vendor: { userId } } });
  if (!product) throw AppError.notFound('Product not found');
  return product;
};

export const createProduct = async (userId: string, data: any) => {
  const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
  if (!profile) throw AppError.notFound('Vendor profile not found');
  
  return prisma.product.create({
    data: {
      ...data,
      vendorId: profile.id,
      approvalStatus: 'PENDING_REVIEW'
    }
  });
};

export const updateProduct = async (userId: string, productId: string, data: any) => {
  const product = await prisma.product.findFirst({ where: { id: productId, vendor: { userId } } });
  if (!product) throw AppError.notFound('Product not found');

  return prisma.product.update({
    where: { id: productId },
    data: {
      ...data,
      approvalStatus: 'PENDING_REVIEW' // Re-trigger approval on update
    }
  });
};

export const deleteProduct = async (userId: string, productId: string) => {
  const product = await prisma.product.findFirst({ where: { id: productId, vendor: { userId } } });
  if (!product) throw AppError.notFound('Product not found');

  return prisma.product.delete({ where: { id: productId } });
};

export const getOrders = async (userId: string, filters: any) => {
  return []; // TBD: join order items with product.vendorId
};

export const getOrderById = async (userId: string, orderId: string) => {
  return null; // TBD
};

export const updateOrderFulfillment = async (userId: string, orderId: string, data: any) => {
  return null; // TBD: update status on split vendor items
};

export const getPayouts = async (userId: string) => {
  const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
  if (!profile) throw AppError.notFound('Vendor profile not found');
  
  return prisma.payout.findMany({ where: { vendorId: profile.id } });
};

export const requestPayout = async (userId: string, data: any) => {
  const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
  if (!profile) throw AppError.notFound('Vendor profile not found');

  // Note: Check available balance here first

  return prisma.payout.create({
    data: {
      vendorId: profile.id,
      amount: data.amount,
      status: 'PENDING'
    }
  });
};

export const getProfile = async (userId: string) => {
  return prisma.vendorProfile.findUnique({ where: { userId } });
};

export const updateProfile = async (userId: string, data: any) => {
  return prisma.vendorProfile.update({
    where: { userId },
    data: {
      storeName: data.storeName,
      gstNumber: data.gstNumber,
      fssaiNumber: data.fssaiNumber,
    }
  });
};

export const updateBankDetails = async (userId: string, data: any) => {
  return prisma.vendorProfile.update({
    where: { userId },
    data: {
      bankDetails: {
        bankName: data.bankName,
        accNo: data.accNo,
        ifsc: data.ifsc
      }
    }
  });
};

export const getReviews = async (userId: string, filters: any) => {
  return prisma.review.findMany({ where: { product: { vendor: { userId } } }, include: { product: true }});
};
