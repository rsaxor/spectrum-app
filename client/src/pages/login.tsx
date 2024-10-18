import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "../components/hooks/use-toast";
import { Toaster } from "../components/ui/toaster";
import Footer from '../components/Footer';

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // For redirecting after login
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Dynamically decide whether email or username is provided
            const loginData: { email?: string; username?: string; password: string } = emailOrUsername.includes('@')
                ? { email: emailOrUsername, password }  // If '@' is present, treat it as an email
                : { username: emailOrUsername, password };  // Otherwise, treat it as a username


            const response = await axios.post(`${apiURL}/users/login`, loginData);
            const { token, user } = response.data;
    
            // Store the token in localStorage or cookies
            localStorage.setItem('token', token);
    
            // toast({
            //     title: "Login Successful",
            //     description: `Welcome back, ${user.username}!`,
            // });
    
            // Redirect to home or dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error);
            toast({
                title: "Login Failed",
                description: "Invalid email or password",
                variant: "destructive",
            });
        }
    };

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 justify-center items-center">
            <div className="text-center">
                <h1><b>Spectrum App</b></h1>
            </div>
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email/username below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email/Username</Label>
                            <Input
                                id="email"
                                type="text"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="mt-3">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4">Sign in</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <Toaster />
                </CardFooter>
            </Card>
            <Footer />
        </main>
    );
};

export default Login;
