import VendorProductForm from '../../../../components/products/VendorProductForm'

export default function EditProductPage({ params }: { params: { id: string } }) {
  // In a real app we would fetch product data here using `vendorService.getProductById(params.id)`
  // For UI testing we simulate a mounted initial state
  
  const mockInitialData = {
    id: params.id,
    name: 'Organic Apples',
    slug: 'organic-apples',
    shortDesc: 'Freshly picked organic apples.',
    description: 'Crisp, sweet, and perfectly organic. Sourced directly from Shimla farms.',
    price: 15000,
    defaultWeight: '1kg',
    stockCount: 45,
    categoryId: '1',
    isOrganic: true,
    images: ['https://placehold.co/400x400'],
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Product</h1>
        <p className="text-gray-500 text-sm">Update prices, stock, or description. Changes may require re-approval.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <VendorProductForm initialData={mockInitialData} />
      </div>
    </div>
  )
}
