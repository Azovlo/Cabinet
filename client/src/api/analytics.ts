import api from './api';

// Description: Get comprehensive analytics data for managers, calls, statuses, and complaints
// Endpoint: GET /api/analytics
// Request: {}
// Response: { managers: object, calls: object, statuses: object, complaints: object }
export const getAnalyticsData = () => {
  console.log('API: Fetching analytics data')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        managers: {
          total: 15,
          activeToday: 13,
          avgPerformance: 87,
          topPerformer: 'Sarah Johnson',
          performanceData: [
            { name: 'John Smith', performance: 92 },
            { name: 'Sarah Johnson', performance: 95 },
            { name: 'Mike Davis', performance: 78 },
            { name: 'Lisa Wilson', performance: 88 },
            { name: 'Tom Brown', performance: 85 }
          ]
        },
        calls: {
          total: 1247,
          successful: 1089,
          avgDuration: 8.5,
          peakHour: '2-3 PM',
          volumeData: [
            { time: '9 AM', calls: 45 },
            { time: '10 AM', calls: 67 },
            { time: '11 AM', calls: 89 },
            { time: '12 PM', calls: 123 },
            { time: '1 PM', calls: 156 },
            { time: '2 PM', calls: 189 },
            { time: '3 PM', calls: 167 },
            { time: '4 PM', calls: 134 },
            { time: '5 PM', calls: 98 }
          ]
        },
        statuses: {
          distribution: [
            { name: 'New', value: 234 },
            { name: 'In Progress', value: 456 },
            { name: 'Completed', value: 789 },
            { name: 'On Hold', value: 123 }
          ],
          timeData: [
            { date: 'Jan 1', new: 45, inProgress: 67, completed: 89 },
            { date: 'Jan 2', new: 52, inProgress: 73, completed: 95 },
            { date: 'Jan 3', new: 48, inProgress: 69, completed: 102 },
            { date: 'Jan 4', new: 61, inProgress: 81, completed: 87 },
            { date: 'Jan 5', new: 55, inProgress: 76, completed: 93 }
          ]
        },
        complaints: {
          total: 89,
          resolved: 76,
          avgResolution: 4.2,
          satisfaction: 92,
          categories: [
            { category: 'Technical', count: 23 },
            { category: 'Billing', count: 18 },
            { category: 'Service', count: 15 },
            { category: 'Account', count: 12 },
            { category: 'Other', count: 21 }
          ]
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/analytics');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}