'use client'

// Auth disabled for manual testing
import { AdminNavbar } from "./AdminNavbarNew"
import { AdminSidebar } from "./AdminSidebarNew"

const AdminLayout = ({ children }) => {
    return (
        <div className="flex bg-[#050505] text-white min-h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <AdminNavbar />
                <main className="flex-1 overflow-y-auto no-scrollbar p-8 lg:p-12">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout