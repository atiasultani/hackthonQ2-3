// src/pages/dashboard.js
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.role !== 'admin') { 
    router.push('/login'); 
    return null; 
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Admin Dashboard</h1>
      {/* Display admin-specific content here */}
      <p>Welcome, {user.name}!</p>
      {/* Example: Display admin-only data or actions */}
    </div>
  );
};

export default Dashboard;