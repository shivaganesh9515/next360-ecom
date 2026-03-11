import VendorLayoutInner from "../../components/vendor/VendorLayout";
import { AuthGuard } from "../../components/auth/AuthGuard";

export const metadata = {
  title: "Next360 - Vendor Interface",
  description: "Next360 Platform Merchant Environment",
};

export default function RootVendorLayout({ children }) {
  return (
    <AuthGuard allowedRoles={['VENDOR']}>
      <VendorLayoutInner>
        {children}
      </VendorLayoutInner>
    </AuthGuard>
  );
}
