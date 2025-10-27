// src/contexts/AuthContext.tsx
import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, FirestoreError } from 'firebase/firestore';
import { db } from '../firebase';

interface User {
  id: string;
  name: string;
  email: string;
  university: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, university: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as Omit<User, 'id'>;
          setUser({ id: firebaseUser.uid, ...userData });
        } else {
          setUser({ id: firebaseUser.uid, name: '', email: firebaseUser.email || '', university: '' });
        }
        setToken(idToken);
      } else {
        setUser(null);
        setToken(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      return true;
    } catch (error) {
      const err = error as Error;
      console.error('Login error:', { message: err.message, name: err.name });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, university: string): Promise<boolean> => {
    try {
      console.log('Registering user with:', { name, email, university });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created with UID:', userCredential.user.uid);
      await setDoc(doc(db, 'users', userCredential.user.uid), { name, email, university }, { merge: true });
      console.log('User data saved to Firestore for UID:', userCredential.user.uid);
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      return true;
    } catch (error) {
      const err = error as Error | FirestoreError;
      const errorMessage = err.message || 'An unexpected error occurred during registration';
      console.error('Registration error:', {
        message: errorMessage,
        code: (err as FirestoreError).code,
        name: err.name,
        stack: err.stack,
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}