import { useState, useEffect, useCallback } from 'react';
import { User } from '@shared/schema';
import LocalStorage from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = LocalStorage.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUser = LocalStorage.getUserByEmail(email);
      
      if (existingUser && existingUser.password === password) {
        setUser(existingUser);
        setIsAuthenticated(true);
        LocalStorage.setCurrentUser(existingUser);
        
        toast({
          title: "Welcome back!",
          description: `Good to see you again, ${existingUser.name}`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const existingUser = LocalStorage.getUserByEmail(email);
      
      if (existingUser) {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists",
          variant: "destructive",
        });
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      LocalStorage.saveUser(newUser);
      setUser(newUser);
      setIsAuthenticated(true);
      LocalStorage.setCurrentUser(newUser);

      toast({
        title: "Account created!",
        description: "Welcome to WeddingWander",
      });

      return true;
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    LocalStorage.setCurrentUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  }, [toast]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
}
