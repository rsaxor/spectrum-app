import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Customer, NewCustomer, User } from '../../types';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "../../components/hooks/use-toast";
import { Toaster } from "../../components/ui/toaster";
import DashboardLayout from "../../components/layouts/DashboardLayout"; // Import the layout
import { useParams } from 'react-router-dom';

const CustomerManagement = () => {
  const { customerId } = useParams<{ customerId: string }>(); // Get the customer ID from the URL
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);  // New state for users
  const [acctcode, setAcctcode] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [salesrep, setSalesrep] = useState('');
  const [trade, setTrade] = useState<'Trade Customer' | 'Cash Customer' | 'Credit Customer'>('Trade Customer');
  const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get<Customer[]>(`${apiURL}/customers`);
      setCustomers(response.data);
    };
    fetchCustomers();
  }, [apiURL]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${apiURL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [apiURL]);

  // Fetch specific customer details if customerId is present
  useEffect(() => {
    if (customerId) {
      const fetchCustomer = async () => {
        try {
          const response = await axios.get<Customer>(`${apiURL}/customers/${customerId}`);
          const customer = response.data;
          setAcctcode(customer.acctcode);
          setCompany(customer.company);
          setEmail(customer.email);
          
          // Check if the salesrep matches any user from the fetched users
          const foundUser = users.find(user => user.username === customer.salesrep);
          if (foundUser) {
            setSalesrep(foundUser.username);
          } else {
            setSalesrep(''); // Or set to a default value if necessary
          }
          
          if (customer.trade === 'Trade Customer' || customer.trade === 'Cash Customer' || customer.trade === 'Credit Customer') {
            setTrade(customer.trade);
          }
        } catch (error) {
          console.error('Error fetching customer:', error);
        }
      };
      fetchCustomer();
    }
  }, [customerId, users, apiURL]); // Added users as a dependency

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCustomer: NewCustomer = { acctcode, company, email, salesrep, trade };
    try {
      if (customerId) {
        // Update existing customer
        await axios.put(`${apiURL}/customers/${customerId}`, updatedCustomer);
        toast({
          title: "Customer updated successfully!",
          description: `${acctcode} | ${company} | ${email} | ${trade}`,
          action: (
            <Button asChild>
              <a href="/customers">View</a>
            </Button>
          )
        });
      } else {
        // Add new customer
        const response = await axios.post<Customer>(`${apiURL}/customers`, updatedCustomer);
        setCustomers([...customers, response.data]);
        toast({
          title: "Successfully Added",
          description: `${acctcode} | ${company} | ${email} | ${trade}`,
          action: (
            <Button asChild>
              <a href="/customers">View</a>
            </Button>
          )
        });
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <DashboardLayout pageTitle="Manage customer">
      <div className="grid flex-1 items-start gap-4 py-4 sm:py-0 md:gap-8">
        <form onSubmit={handleSaveCustomer}>
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>{customerId ? 'Edit customer' : 'Add a customer'}</CardTitle>
              <CardDescription>
                {customerId ? 'Modify customer details' : 'Encode customer details.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="acctcode">Account Code</Label>
                  <Input
                    id="acctcode"
                    type="text"
                    value={acctcode}
                    onChange={(e) => setAcctcode(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
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
                  <Label htmlFor="salesrep">Sales representative</Label>
                  <Select onValueChange={(value) => setSalesrep(value)} value={salesrep}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sales Rep" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user._id} value={user.username}>
                          {user.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="">Trade</Label>
                  <Select onValueChange={(value) => setTrade(value as 'Trade Customer' | 'Cash Customer' | 'Credit Customer')} value={trade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trade Customer">Trade Customer</SelectItem>
                      <SelectItem value="Cash Customer">Cash Customer</SelectItem>
                      <SelectItem value="Credit Customer">Credit Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 gap-2">
              <Button type="submit">{customerId ? 'Save Changes' : 'Add Customer'}</Button>
              <Button variant="outline" asChild><a href="/customers">Cancel</a></Button>
            </CardFooter>
          </Card>
        </form>
        <Toaster />
      </div>
    </DashboardLayout>
  );
}

export default CustomerManagement;
