import React, { useState } from 'react';
import VendorSidebar from './VendorSidebar';
import VendorHeader from './VendorHeader';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden w-full bg-[radial-gradient(900px_420px_at_85%_-180px,rgba(136,183,157,0.12),transparent_62%),#f7f3ea]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/35 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <VendorSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden w-full h-full">
        <VendorHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-[1240px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
