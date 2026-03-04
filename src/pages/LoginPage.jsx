
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

const roleOptions = [
{
  value: 'employee',
  label: 'Employee'
},
{
  value: 'manager',
  label: 'Manager'
},
{
  value: 'hr',
  label: 'HR Admin'
}];


export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email or Employee ID is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    if (!role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onLogin(email, role);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5
        }}
        className="w-full max-w-md relative">

        <Card padding="lg" className="shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
              <CalendarDaysIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LeaveFlow</h1>
            <p className="text-gray-500 mt-1">
              Sign in to manage your leave requests
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email / Employee ID"
              type="text"
              placeholder="Enter your email or employee ID"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required />


            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              error={errors.password}
              required />


            <Select
              label="Role"
              options={roleOptions}
              value={role}
              onChange={setRole}
              error={errors.role}
              required
              placeholder="Select your role" />


            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              size="lg">

              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">

              Forgot your password?
            </button>
          </div>

         
        </Card>

        <p className="text-center text-sm text-gray-400 mt-6">
          © 2024 LeaveFlow. All rights reserved.
        </p>
      </motion.div>
    </div>);

}
