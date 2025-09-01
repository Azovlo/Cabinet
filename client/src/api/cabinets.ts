import api from './api';

// Description: Get cabinets data including active cabinets and bank templates
// Endpoint: GET /api/cabinets
// Request: {}
// Response: { cabinets: Array<Cabinet>, templates: Array<BankTemplate> }
export const getCabinetsData = () => {
  console.log('API: Fetching cabinets data')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cabinets: [
          {
            id: '1',
            clientName: 'John Smith',
            bankTemplate: 'Chase Bank',
            status: 'active',
            createdDate: '2024-01-10T00:00:00Z',
            lastAccess: '2024-01-15T14:30:00Z',
            documentsCount: 12,
            chatEnabled: true
          },
          {
            id: '2',
            clientName: 'Emily Davis',
            bankTemplate: 'Wells Fargo',
            status: 'active',
            createdDate: '2024-01-08T00:00:00Z',
            lastAccess: '2024-01-14T10:20:00Z',
            documentsCount: 8,
            chatEnabled: true
          },
          {
            id: '3',
            clientName: 'Robert Johnson',
            bankTemplate: 'Bank of America',
            status: 'pending',
            createdDate: '2024-01-12T00:00:00Z',
            lastAccess: '2024-01-13T16:45:00Z',
            documentsCount: 5,
            chatEnabled: false
          },
          {
            id: '4',
            clientName: 'Lisa Brown',
            bankTemplate: 'Citibank',
            status: 'active',
            createdDate: '2024-01-05T00:00:00Z',
            lastAccess: '2024-01-15T09:15:00Z',
            documentsCount: 15,
            chatEnabled: true
          },
          {
            id: '5',
            clientName: 'David Wilson',
            bankTemplate: 'TD Bank',
            status: 'inactive',
            createdDate: '2024-01-03T00:00:00Z',
            lastAccess: '2024-01-10T11:30:00Z',
            documentsCount: 3,
            chatEnabled: false
          }
        ],
        templates: [
          {
            id: '1',
            name: 'Chase Bank',
            logo: '/logos/chase.png',
            description: 'Professional Chase Bank template with modern design',
            features: [
              'Account Overview',
              'Transaction History',
              'Bill Pay Integration',
              'Mobile Banking UI',
              'Security Features'
            ]
          },
          {
            id: '2',
            name: 'Wells Fargo',
            logo: '/logos/wells-fargo.png',
            description: 'Wells Fargo template with comprehensive banking features',
            features: [
              'Account Management',
              'Transfer Funds',
              'Investment Tracking',
              'Credit Score Monitor',
              'Customer Support Chat'
            ]
          },
          {
            id: '3',
            name: 'Bank of America',
            logo: '/logos/boa.png',
            description: 'Bank of America template with advanced security',
            features: [
              'Multi-Account View',
              'Zelle Integration',
              'Credit Card Management',
              'Loan Information',
              'Fraud Protection'
            ]
          },
          {
            id: '4',
            name: 'Citibank',
            logo: '/logos/citibank.png',
            description: 'Citibank template with international banking support',
            features: [
              'Global Banking',
              'Currency Exchange',
              'Investment Portfolio',
              'Rewards Tracking',
              'Travel Notifications'
            ]
          },
          {
            id: '5',
            name: 'TD Bank',
            logo: '/logos/td-bank.png',
            description: 'TD Bank template with user-friendly interface',
            features: [
              'Simple Navigation',
              'Quick Balance Check',
              'ATM Locator',
              'Deposit Checks',
              'Budget Tools'
            ]
          },
          {
            id: '6',
            name: 'Capital One',
            logo: '/logos/capital-one.png',
            description: 'Capital One template with innovative features',
            features: [
              'Credit Monitoring',
              'Savings Goals',
              'Spending Analysis',
              'Virtual Cards',
              'Auto-Save Features'
            ]
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/cabinets');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Create a new client cabinet
// Endpoint: POST /api/cabinets/create
// Request: { templateId: string, clientName: string }
// Response: { success: boolean, message: string, cabinetId: string }
export const createCabinet = (data: { templateId: string; clientName: string }) => {
  console.log('API: Creating cabinet for client:', data.clientName, 'with template:', data.templateId)
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Cabinet created successfully',
        cabinetId: 'cab_' + Math.random().toString(36).substr(2, 9)
      });
    }, 1500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/cabinets/create', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Create a new user for client access
// Endpoint: POST /api/users/create
// Request: { name: string, email: string, phone?: string, role: string }
// Response: { success: boolean, message: string, userId: string }
export const createUser = (data: { name: string; email: string; phone?: string; role: string }) => {
  console.log('API: Creating user:', data.name, 'with email:', data.email, 'and role:', data.role)
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'User created successfully',
        userId: 'user_' + Math.random().toString(36).substr(2, 9)
      });
    }, 1500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/users/create', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}