import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  const { storeInfo } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1f3a] text-white mt-16">
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5b4c9f] to-[#1a1f3a] border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">JM</span>
              </div>
              <span className="text-xl font-semibold">Joyas Meliá</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Creando joyas excepcionales desde 1985. Cada pieza cuenta una historia única.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/bienvenida" className="text-white/70 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-white/70 hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/catalogo?category=rings" className="text-white/70 hover:text-white transition-colors">
                  Anillos
                </Link>
              </li>
              <li>
                <Link to="/catalogo?category=necklaces" className="text-white/70 hover:text-white transition-colors">
                  Collares
                </Link>
              </li>
              <li>
                <Link to="/catalogo?category=bracelets" className="text-white/70 hover:text-white transition-colors">
                  Pulseras
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/perfil" className="text-white/70 hover:text-white transition-colors">
                  Mi Cuenta
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-white/70 hover:text-white transition-colors">
                  Mi Carrito
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5b4c9f]" />
                <span className="text-white/70">{storeInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#5b4c9f]" />
                <a href={`tel:${storeInfo.phone}`} className="text-white/70 hover:text-white transition-colors">
                  {storeInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#5b4c9f]" />
                <a href="mailto:contacto@joyasmelia.com" className="text-white/70 hover:text-white transition-colors">
                  contacto@joyasmelia.com
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">Síguenos</h4>
              <div className="flex gap-3">
                {storeInfo.socialMedia.facebook && (
                  <a
                    href={storeInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#5b4c9f] flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {storeInfo.socialMedia.instagram && (
                  <a
                    href={storeInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#5b4c9f] flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {storeInfo.socialMedia.twitter && (
                  <a
                    href={storeInfo.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#5b4c9f] flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {currentYear} Joyas Meliá. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Política de Cookies
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Aviso Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
