// client/src/components/pages/dashboard/users/UserManagement.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, NewUser } from '../../../types';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "../../../components/hooks/use-toast";
import { Toaster } from "../../../components/ui/toaster";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Settings from "../../../components/layouts/Settings";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>(`${apiURL}/users`);
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: NewUser = { email, username, password, role };
    try {
      const response = await axios.post<User>(`${apiURL}/users`, newUser);
      setUsers([...users, response.data]);

      toast({
        title: "Successfully Added",
        description: `${email} | ${username} | ${role}`,
        action: (
          <Button asChild>
            <a href="/dashboard/users-list">View</a>
          </Button>
        )
      });
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error === 'Duplicate key') {
        const message = error.response.data.message; // Get the message from the backend
        toast({
          title: "Error",
          description: message, // Display the specific error message
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred while saving the user.",
          variant: "destructive"
        });
      }
      console.error('Error adding user:', error.response);
    }
  };
  
  return (
    <DashboardLayout pageTitle="Register">
      <div className="">
        <Settings settingsTitle="Add User">
          <form onSubmit={handleAddUser}>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Register a User</CardTitle>
                <CardDescription>
                  Enter information to create an account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
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
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="gird gap-2">
                    <Label htmlFor="">Role</Label>
                    <Select onValueChange={(value) => setRole(value as 'user' | 'admin')} defaultValue={role}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit">Register</Button>
              </CardFooter>
            </Card>
          </form>
        </Settings>
        <Toaster />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
