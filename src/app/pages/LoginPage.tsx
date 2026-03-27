import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(email, password);
    
    if (success) {
      toast.success('¡Bienvenido de vuelta!');
      navigate('/perfil');
    } else {
      toast.error('Email o contraseña incorrectos');
    }
  };

  const handleDemoLogin = (type: 'user' | 'admin') => {
    if (type === 'user') {
      login('maria@email.com', 'demo');
    } else {
      login('admin@joyasmelia.com', 'admin');
    }
    toast.success('¡Sesión iniciada!');
    navigate(type === 'admin' ? '/admin' : '/perfil');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5b4c9f] to-[#1a1f3a] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">JM</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1a1f3a]">Iniciar Sesión</h1>
            <p className="text-gray-600 mt-2">Accede a tu cuenta de Joyas Meliá</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5b4c9f] hover:bg-[#4a3d85] text-white h-11"
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo rápido</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin('user')}
                className="w-full"
              >
                Usuario Demo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin('admin')}
                className="w-full"
              >
                Administrador Demo
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">¿No tienes cuenta? </span>
            <Link to="/registro" className="text-[#5b4c9f] hover:underline font-medium">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
