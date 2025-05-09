import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  UserPlus,
  Github 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const strengthLabels = ['Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];

const Auth = () => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing session on mount and redirect if found
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate('/');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (password) {
      // Calculate password strength
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, ingresa tu correo y contraseña",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta"
      });
      
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Verifica tus credenciales e intenta nuevamente",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword || !name) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error de validación",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordStrength < 3) {
      toast({
        title: "Contraseña débil",
        description: "Tu contraseña debe ser al menos de nivel 'Media'",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Registro exitoso",
        description: "Revisa tu correo para confirmar tu cuenta",
      });
      
      setTab("login");
      
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ocurrió un error. Intenta nuevamente más tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Correo requerido",
        description: "Por favor, ingresa tu correo electrónico",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?tab=login`,
      });
      
      if (error) throw error;
      
      setEmailSent(true);
      
    } catch (error: any) {
      toast({
        title: "Error al enviar correo",
        description: error.message || "Ocurrió un error. Intenta nuevamente más tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: "Error con Google",
        description: error.message || "No se pudo iniciar sesión con Google",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
            {resetPasswordMode 
              ? "Recuperar contraseña" 
              : tab === "login" 
                ? "Acceder a tu cuenta" 
                : "Crear una cuenta"}
          </h2>

          {!resetPasswordMode ? (
            <>
              <Tabs 
                defaultValue={tab} 
                value={tab}
                onValueChange={(value) => setTab(value as "login" | "register")} 
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    Iniciar sesión
                  </TabsTrigger>
                  <TabsTrigger value="register" className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Registrarse
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="login-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="button"
                        onClick={() => setResetPasswordMode(true)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">O continúa con</span>
                      </div>
                    </div>

                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={handleGoogleLogin}
                    >
                      <Github className="mr-2 h-5 w-5" />
                      Google
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="register-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="register-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      {password && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-500">Fortaleza: {strengthLabels[passwordStrength - 1] || "N/A"}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${
                                passwordStrength === 0 ? 'w-0' :
                                passwordStrength === 1 ? 'w-1/5 bg-red-500' :
                                passwordStrength === 2 ? 'w-2/5 bg-orange-500' :
                                passwordStrength === 3 ? 'w-3/5 bg-yellow-500' :
                                passwordStrength === 4 ? 'w-4/5 bg-blue-500' :
                                'w-full bg-green-500'
                              }`}
                            ></div>
                          </div>
                          
                          {passwordStrength > 0 && passwordStrength < 3 && (
                            <ul className="mt-2 text-xs text-gray-600 space-y-1 list-disc pl-5">
                              {!/[A-Z]/.test(password) && <li>Añade una letra mayúscula</li>}
                              {!/[a-z]/.test(password) && <li>Añade una letra minúscula</li>}
                              {!/[0-9]/.test(password) && <li>Añade un número</li>}
                              {!/[^A-Za-z0-9]/.test(password) && <li>Añade un símbolo (!@#$...)</li>}
                              {password.length < 8 && <li>Mínimo 8 caracteres</li>}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {password && confirmPassword && password !== confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">Las contraseñas no coinciden</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registrando..." : "Registrarse"}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">O continúa con</span>
                      </div>
                    </div>

                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={handleGoogleLogin}
                    >
                      <Github className="mr-2 h-5 w-5" />
                      Google
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            emailSent ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Correo enviado</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Hemos enviado instrucciones para recuperar tu contraseña a {email}. 
                  Por favor, revisa tu bandeja de entrada.
                </p>
                <Button
                  type="button"
                  className="mt-6"
                  onClick={() => {
                    setResetPasswordMode(false);
                    setEmailSent(false);
                  }}
                >
                  Volver a inicio de sesión
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña.
                </p>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setResetPasswordMode(false)}
                    >
                      Volver al inicio de sesión
                    </Button>
                  </div>
                </form>
              </div>
            )
          )}
        </div>

        {tab === "login" && !resetPasswordMode && (
          <Alert className="mt-4">
            <AlertDescription className="text-sm text-gray-600">
              Si te has registrado recientemente, verifica tu correo electrónico para activar tu cuenta. 
              Revisa la bandeja de entrada y la carpeta de spam.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Auth;
