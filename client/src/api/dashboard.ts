import api from './api';

// Description: Get dashboard statistics and metrics
// Endpoint: GET /api/dashboard/stats
// Request: {}
// Response: { stats: { totalClients: number, activeSubscriptions: number, monthlyRevenue: number, supportTickets: number }, recentActivity: Array<{ id: string, type: string, message: string, timestamp: string }> }
export const getDashboardStats = () => {
  console.log('API: Fetching dashboard statistics')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalClients: 1247,
          activeSubscriptions: 89,
          monthlyRevenue: 45230,
          supportTickets: 12
        },
        recentActivity: [
          { id: '1', type: 'client', message: 'New client registered: John Doe', timestamp: '2024-01-15T10:30:00Z' },
          { id: '2', type: 'payment', message: 'Payment received: $250 from ABC Corp', timestamp: '2024-01-15T09:15:00Z' },
          { id: '3', type: 'support', message: 'Support ticket resolved: #1234', timestamp: '2024-01-15T08:45:00Z' },
          { id: '4', type: 'subscription', message: 'Subscription upgraded: Premium Plan', timestamp: '2024-01-15T07:20:00Z' }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/dashboard/stats');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Get subscription status and remaining days
// Endpoint: GET /api/dashboard/subscription
// Request: {}
// Response: { subscription: { plan: string, remainingDays: number, status: string, expiryDate: string } }
export const getSubscriptionStatus = () => {
  console.log('API: Fetching subscription status')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        subscription: {
          plan: 'CRM & CABINETS',
          remainingDays: 23,
          status: 'active',
          expiryDate: '2024-02-07T00:00:00Z'
        }
      });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/dashboard/subscription');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}