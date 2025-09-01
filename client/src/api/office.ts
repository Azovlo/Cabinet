import api from './api';

// Description: Get office management data including employees, groups, and positions
// Endpoint: GET /api/office
// Request: {}
// Response: { employees: Array<Employee>, groups: Array<Group>, positions: Array<Position> }
export const getOfficeData = () => {
  console.log('API: Fetching office data')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        employees: [
          {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@company.com',
            position: 'Manager',
            group: 'Sales Team',
            status: 'active',
            lastLogin: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            position: 'Operator',
            group: 'Support Team',
            status: 'active',
            lastLogin: '2024-01-15T09:15:00Z'
          },
          {
            id: '3',
            name: 'Mike Davis',
            email: 'mike.davis@company.com',
            position: 'Analyst',
            group: 'Analytics Team',
            status: 'inactive',
            lastLogin: '2024-01-14T16:45:00Z'
          }
        ],
        groups: [
          {
            id: '1',
            name: 'Sales Team',
            description: 'Responsible for client acquisition and sales',
            memberCount: 8
          },
          {
            id: '2',
            name: 'Support Team',
            description: 'Customer support and technical assistance',
            memberCount: 5
          },
          {
            id: '3',
            name: 'Analytics Team',
            description: 'Data analysis and reporting',
            memberCount: 3
          }
        ],
        positions: [
          {
            id: '1',
            title: 'Manager',
            permissions: ['View All Data', 'Manage Employees', 'Generate Reports', 'System Settings'],
            employeeCount: 2
          },
          {
            id: '2',
            title: 'Operator',
            permissions: ['View Client Data', 'Chat with Clients', 'Generate Documents'],
            employeeCount: 8
          },
          {
            id: '3',
            title: 'Analyst',
            permissions: ['View Analytics', 'Generate Reports', 'Export Data'],
            employeeCount: 3
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/office');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}