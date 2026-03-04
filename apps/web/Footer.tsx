// @ts-nocheck
import Link from "next/link";

const Footer = () => {
    return (
        <footer id="press" className="mt-16 bg-[#2d6a4f] text-[#e8f5e9]">
            <div className="gc-container px-6 py-14">
                <div className="grid md:grid-cols-4 gap-8 text-sm font-semibold">
                    <div>
                        <p>123 Maple Street, Springfield, IL 62704</p>
                        <p className="mt-4">(473) 337 8901</p>
                        <p>hello@next360.com</p>
                    </div>
                    <div>
                        <p>Monday - Friday</p>
                        <p>12:00 PM - 10:00 PM</p>
                        <p className="mt-4">Saturday - Sunday</p>
                        <p>12:00 PM - 6:00 PM</p>
                    </div>
                    <div className="gc-display text-sm leading-[1.7]">
                        <Link href='/' className='block'>Home</Link>
                        <Link href='/shop' className='block'>Shop</Link>
                        <Link href='/#about' className='block'>About Us</Link>
                        <Link href='/#contact' className='block'>Contact Us</Link>
                    </div>
                    <div className="gc-display text-sm leading-[1.7]">
                        <p>Fresh Produce</p>
                        <p>Pantry Staples</p>
                        <p>Bestsellers</p>
                        <p>Seasonal Picks</p>
                    </div>
                </div>

                <div className="gc-display text-[#c8e6c9] text-[80px] sm:text-[120px] leading-[0.82] mt-10">Next360</div>

                <div className="flex flex-wrap items-center justify-between gap-4 gc-display text-xs mt-6">
                    <p>© 2026 Crafted by Next360</p>
                    <div className="flex items-center gap-8">
                        <p>Twitter</p>
                        <p>Instagram</p>
                        <p>Tiktok</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
