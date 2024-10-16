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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // For redirecting after login
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiURL}/users/login`, { email, password });
            const { token, user } = response.data;
    
            // Store the token in localStorage or cookies
            localStorage.setItem('token', token);
    
            // Optionally show a toast
            // toast({
            //     title: "Login Successful",
            //     description: `Welcome back, ${user.username}!`,
            // });
    
            // Redirect to home or dashboard
            navigate('/dashboard');  // Adjust this route to wherever you want to redirect
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
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
        </main>
    );
};

export default Login;
