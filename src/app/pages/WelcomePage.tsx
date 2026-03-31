import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export function WelcomePage() {
  const navigate = useNavigate();
  const { storeInfo } = useApp();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${storeInfo.storeImages[0]})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in">
            {storeInfo.welcomeTitle}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 max-w-3xl leading-relaxed">
            {storeInfo.welcomeText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/catalogo')}
              className="bg-[#5b4c9f] hover:bg-[#4a3d85] text-white h-14 px-10 text-lg shadow-xl"
            >
              Explorar Colección
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/bienvenida#contact')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white h-14 px-10 text-lg"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f3a] mb-6">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {storeInfo.aboutText}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-[#5b4c9f]">40+</p>
                  <p className="text-sm text-gray-600 mt-1">Años de experiencia</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-[#5b4c9f]">10K+</p>
                  <p className="text-sm text-gray-600 mt-1">Clientes felices</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={storeInfo.storeImages[1]}
                alt="Tienda"
                className="rounded-lg shadow-lg object-cover h-64"
              />
              <img
                src={storeInfo.storeImages[2]}
                alt="Joyería"
                className="rounded-lg shadow-lg object-cover h-64 mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f3a] mb-6">
            Materiales Premium
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            {storeInfo.materialsText}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Oro 18k', 'Plata 925', 'Oro Rosa', 'Acero Premium'].map((material) => (
              <div key={material} className="p-6 bg-[#f5f5f7] rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5b4c9f] to-[#1a1f3a] mx-auto mb-4" />
                <p className="font-semibold text-[#1a1f3a]">{material}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-[#1a1f3a] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Visítanos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#5b4c9f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Dirección</h3>
                  <p className="text-white/80">{storeInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#5b4c9f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Teléfono</h3>
                  <p className="text-white/80">{storeInfo.phone}</p>
                  <p className="text-white/80">WhatsApp: {storeInfo.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#5b4c9f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Horario</h3>
                  <p className="text-white/80">{storeInfo.schedule}</p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-semibold mb-3">Síguenos</h3>
                <div className="flex gap-4">
                  {storeInfo.socialMedia.facebook && (
                    <a
                      href={storeInfo.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {storeInfo.socialMedia.instagram && (
                    <a
                      href={storeInfo.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {storeInfo.socialMedia.twitter && (
                    <a
                      href={storeInfo.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="font-semibold mb-4 text-xl">¿Tienes preguntas?</h3>
              <p className="text-white/80 mb-6">
                Nuestro equipo está listo para ayudarte. Contáctanos por teléfono, WhatsApp o visítanos en nuestra tienda.
              </p>
              <Button
                onClick={() => navigate('/catalogo')}
                className="w-full bg-[#5b4c9f] hover:bg-[#4a3d85] text-white"
              >
                Explorar Colección
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}