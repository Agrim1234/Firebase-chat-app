import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextValue {
    register: (displayName: string, email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    user: any;
    loading: boolean;
    setLoading: (value: boolean) => void;
    setUser: (value: any) => void;
    // Add other properties and methods here
}

export const AuthContext = createContext<AuthContextValue>({
    register: () => {},
    login: () => {},
    logout: () => {},
    user: null,
    loading: false,
    setLoading: () => {},
    setUser: () => {},
})

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                login: async (email: string, password: string) => {
                    // TODO

                },
                register: async (displayName: string, email: string, password: string) => {
                    setLoading(true);

                    try {
                        const userCredential = await createUserWithEmailAndPassword(
                            auth, email, password);

                        if (auth.currentUser) {
                            await updateProfile(auth.currentUser, {
                                displayName: displayName
                            });
                        }

                        // Signed-in Firebase user
                        const currentUser = userCredential.user;

                        console.log("Firebase user created: ", currentUser);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                },
                logout: async () => {
                    // TODO
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};