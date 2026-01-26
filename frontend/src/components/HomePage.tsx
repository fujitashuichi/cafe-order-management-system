import React from 'react'
import Header from './common/Header'

function HomePage() {
    return (
        <div>
            <Header />
            <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <img
                    src="/images/main-visual.jpg"
                    alt="Cafe Lumina Interior"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white px-4">
                    <h2 className="font-dancing text-6xl md:text-8xl mb-6 drop-shadow-lg">
                    Slow life, Slow coffee.
                    </h2>
                    <p className="text-lg md:text-2xl tracking-[0.2em] font-light uppercase">
                    Cafe Lumina
                    </p>
                </div>
            </section>
        </div>
    )
}

export default HomePage
