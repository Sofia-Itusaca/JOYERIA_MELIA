import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#5b4c9f]">404</h1>
          <p className="text-2xl font-semibold text-[#1a1f3a] mt-4">
            Página no encontrada
          </p>
          <p className="text-gray-600 mt-2">
            Lo sentimos, la página que buscas no existe.
          </p>
        </div>
        
        <Button
          onClick={() => navigate('/')}
          className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
        >
          <Home className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
