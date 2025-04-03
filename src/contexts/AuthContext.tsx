
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type UserRole = "mentor" | "learner" | null;

interface User {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  photoURL?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // For demo purposes, we'll use localStorage to persist the user
  useEffect(() => {
    const storedUser = localStorage.getItem("saberViver_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is just a mock implementation for demo purposes
      // In a real app, you'd verify credentials against a backend
      const mockUsers = [
        {
          id: "1",
          email: "mentor@example.com",
          password: "password",
          displayName: "Doroteia Silva",
          role: "mentor" as UserRole,
          photoURL: "/lovable-uploads/5cc21906-e3d5-4796-9da4-1ae84e78820d.png"
        },
        {
          id: "2",
          email: "learner@example.com",
          password: "password",
          displayName: "João Pereira",
          role: "learner" as UserRole
        }
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem("saberViver_user", JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // This is just a mock implementation for demo purposes
      // In a real app, you'd register the user with a backend
      const newUser = {
        id: Date.now().toString(),
        email,
        displayName,
        role
      };
      
      setCurrentUser(newUser);
      localStorage.setItem("saberViver_user", JSON.stringify(newUser));
      
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("saberViver_user");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
