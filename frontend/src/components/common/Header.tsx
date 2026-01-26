import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLogo from './AppLogo';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const baseNav = "flex transition-transform duration-300 z-40";
    const mobileNav = `
        fixed top-0 right-0 h-screen w-64 items-center justify-center
        bg-white shadow-2xl
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
    `;
    const desktopNav = `
        md:static md:h-fit md:w-full md:bg-transparent
        md:shadow-none md:translate-x-0 md:space-x-8 md:space-y-0
    `;

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex justify-between items-center h-16 max-w-5xl">
                <div className="flex justify-between items-center bg-white">
                    <AppLogo />
                </div>

                <div className="flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="right-0 z-50 space-y-1.5 mr-4 md:hidden" // スマホのみ表示
                    >
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                    <nav className={`${baseNav} ${mobileNav} ${desktopNav}`}>
                        <ul className="flex flex-col p-10 pt-20 space-y-6 md:flex-row md:p-0 md:pt-0 md:space-y-0 md:h-full md:gap-x-8">
                            <li className="hover:text-stone-900 cursor-pointer">Menu</li>
                            <li className="hover:text-stone-900 cursor-pointer">About</li>
                            <li className="hover:text-stone-900 cursor-pointer">Access</li>
                            <li className="hover:text-stone-900 cursor-pointer text-blue-600">
                                <Link to="/admin">Adminへ（開発用リンク）</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* メニュ－表示時の暗幕 */}
            {isMenuOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed inset-0 md:hidden bg-black/50 z-30"
                />
            )}
        </header>
    )
}

export default Header
