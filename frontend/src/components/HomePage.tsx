import React from 'react'
import Header from './common/Header'


const SectionHeader: React.FC<{ children: React.ReactNode, imageUrl?: string }> = ({ children }) =>
        <div className='relative w-full h-fit text-black mx-auto'>
            <h2 className='font-dancing font-bold text-5xl py-10 z-10'>{children}</h2>
        </div>

const ContentHeader: React.FC<{ children: React.ReactNode, imageUrl?: string }> = ({ children, imageUrl }) =>
    <div className='mb-10'>
        <h3 className='text-purple-500 text-2xl font-bold py-5'>{children}</h3>
        <img src={imageUrl} className='w-full h-80 object-cover z-0' />
    </div>

function HomePage() {
    return (
        <div className='bg-gray-200'>
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
            <section id="about" className='max-w-5xl mx-auto text-center'>
                <SectionHeader>About</SectionHeader>
                <div className='mb-10'>
                    <ContentHeader imageUrl='/images/barista.jpg'>バリスタ常駐</ContentHeader>
                    <p className='p-2'>
                        Luminaは、働く人のための隠れ家です。
                        静寂な空間を提供するだけでなく、<strong>一杯の品質</strong>にも徹底的にこだわります。
                    </p>
                    <p className='p-2'>
                        厳選された<strong>スペシャルティコーヒー</strong>を、知識と技術を持つ<strong>専属バリスタ</strong>がハンドドリップで提供。
                    </p>
                    <p className='p-2'>
                        あなたの生産性を最大化するための<strong>最高のサポーター</strong>が、ここに常駐しています。
                    </p>
                </div>
                <div className='mb-10'>
                    <ContentHeader imageUrl='/images/Wi-Fi.jpg'>Wi-Fi完備</ContentHeader>
                    <p className='p-2'>フリーWi-Fiを利用して、通信速度を気にせず作業を行うことができます。</p>
                </div>
                <div className='mb-10'>
                    <ContentHeader imageUrl='/images/power-outlet.jpg'>全席電源あり</ContentHeader>
                    <p className='p-2'>全席に電源が設置されているため、コンセントの有無を気にせずに席をお選びいただけます。</p>
                </div>
            </section>
            <section id="access">a</section>
        </div>
    )
}

export default HomePage
