import VendorProductForm from '../../../../components/products/VendorProductForm'

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">Add New Product</h1>
        <p className="text-muted text-sm">Create a new listing. It will require admin approval to go live.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-border p-6">
        <VendorProductForm />
      </div>
    </div>
  )
}
