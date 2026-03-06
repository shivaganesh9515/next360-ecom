import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string(),
    slug: z.string(),
    shortDesc: z.string(),
    description: z.string().optional(),
    price: z.number().int().positive(),
    defaultWeight: z.string(),
    stockCount: z.number().int().nonnegative(),
    isOrganic: z.boolean(),
    categoryId: z.string()
  })
});

export const updateProductSchema = createProductSchema.deepPartial();

export const requestPayoutSchema = z.object({
  body: z.object({
    amount: z.number().int().positive()
  })
});

export const updateProfileSchema = z.object({
  body: z.object({
    storeName: z.string(),
    gstNumber: z.string().optional(),
    fssaiNumber: z.string().optional(),
  })
});

export const updateBankDetailsSchema = z.object({
  body: z.object({
    bankName: z.string(),
    accNo: z.string(),
    ifsc: z.string()
  })
});
