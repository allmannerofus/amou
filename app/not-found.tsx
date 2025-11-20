import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="relative w-full" style={{ backgroundColor: 'var(--background)' }}>
      {/* 50vh on mobile, 80vh on desktop */}
      <div className="relative w-full h-[50vh] md:h-[80vh]">
        <Image
          src="/404-bummer.gif"
          alt="That is a bummer"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        
        {/* 404 Text - Aligned with logo column (same padding as nav) */}
        <div className="absolute left-8 md:left-20 top-8 md:top-12 z-10">
          <h1 
            className="font-vt323 text-2xl md:text-3xl lg:text-4xl"
            style={{ color: '#FEFCF4' }}
          >
            404! This is a bummer.
          </h1>
        </div>
      </div>
    </div>
  )
}
