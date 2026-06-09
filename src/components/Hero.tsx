import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative w-full">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1599619585752-c3edb42a414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMHBhaW50aW5nfGVufDF8fHx8MTc3NTIzMTM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left banner - Protege tus superficies */}
          <div className="md:col-span-5 bg-[#68b859] rounded-xl p-6 md:p-8 text-white flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl mb-1" style={{ fontWeight: 700 }}>PROTEGÉ TUS SUPERFICIES</h2>
            <p className="text-white/90 text-sm md:text-base mb-4">QUE LA LLUVIA NO TE SORPRENDA MÁS</p>
            <div className="flex gap-3 mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763741226847-f5ef0c846506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBzdG9yZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Productos impermeabilizantes"
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
              />
            </div>
            <a href="/pinturas" className="bg-[#f7c948] text-gray-900 px-6 py-2 rounded-full text-sm hover:bg-[#f0bc30] transition self-start inline-block">
              Impermeabilidad para todo el año
            </a>
          </div>

          {/* Center - Discount */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-[#3b7dd8]/80 backdrop-blur rounded-xl p-6 flex-1 flex items-center justify-center text-center">
              <div>
                <p className="text-white/80 text-sm uppercase">Hasta</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-white text-7xl md:text-8xl" style={{ fontWeight: 700 }}>35</span>
                  <div className="text-left">
                    <span className="text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>%</span>
                    <br />
                    <span className="text-white text-2xl md:text-3xl" style={{ fontWeight: 700 }}>OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            {/* Cuotas banner */}
            <div className="bg-[#68b859] rounded-xl p-5 flex-1 flex items-center justify-center text-center">
              <div>
                <p className="text-white/80 text-xs uppercase">Hasta</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-white text-5xl" style={{ fontWeight: 700 }}>12</span>
                  <div className="text-left">
                    <span className="text-white text-lg" style={{ fontWeight: 700 }}>cuotas</span>
                    <br />
                    <span className="text-white text-sm">SIN INTERÉS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo card */}
            <div className="bg-[#68b859] rounded-xl p-5 flex items-center justify-center">
              <div className="text-center text-white">
                <span className="text-2xl" style={{ fontWeight: 700 }}>centro</span>
                <span className="block text-[10px] tracking-[0.25em] uppercase">pinturerias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
