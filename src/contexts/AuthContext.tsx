import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'resident' | 'owner' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  apartmentId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  signup: async () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // In a real app, this would call an API endpoint
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock login logic - replace with real API calls
    if (email && password) {
      setUser({
        id: '123',
        name: role === 'resident' ? 'John Resident' : 
              role === 'owner' ? 'Sarah Owner' : 'Admin User',
        email,
        role,
        apartmentId: role === 'resident' ? 'A-101' : undefined
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock signup logic - replace with real API calls
    if (name && email && password) {
      setUser({
        id: '123',
        name,
        email,
        role,
        apartmentId: role === 'resident' ? 'A-101' : undefined
      });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      signup 
    }}>
      {children}
    </AuthContext.Provider>
  );
};