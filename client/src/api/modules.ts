import api from './api';

// Description: Get available modules and their status
// Endpoint: GET /api/modules
// Request: {}
// Response: { modules: Array<Module> }
export const getModules = () => {
  console.log('API: Fetching modules')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        modules: [
          {
            id: '1',
            name: 'CRM System',
            description: 'Complete customer relationship management system with advanced features',
            icon: 'users',
            enabled: true,
            features: [
              'Client Database Management',
              'Call Tracking & Recording',
              'Lead Management',
              'Sales Pipeline',
              'Automated Follow-ups'
            ],
            price: 150
          },
          {
            id: '2',
            name: 'Bank Cabinets',
            description: 'Personal bank cabinets with 30+ bank templates and client portals',
            icon: 'package',
            enabled: true,
            features: [
              '30+ Bank Templates',
              'Client Portal Access',
              'Document Management',
              'Secure Authentication',
              'Custom Branding'
            ],
            price: 200
          },
          {
            id: '3',
            name: 'PDF Generator',
            description: 'Advanced document generation with templates and bulk processing',
            icon: 'file-text',
            enabled: false,
            features: [
              'Multiple Templates',
              'Bulk Generation',
              'Custom Fields',
              'Digital Signatures',
              'Version Control'
            ],
            price: 75
          },
          {
            id: '4',
            name: 'Client Chat',
            description: 'Real-time chat system for client communication and support',
            icon: 'message-square',
            enabled: true,
            features: [
              'Real-time Messaging',
              'File Sharing',
              'Chat History',
              'Operator Management',
              'Automated Responses'
            ],
            price: 100
          },
          {
            id: '5',
            name: 'Advanced Analytics',
            description: 'Comprehensive analytics and reporting with data visualization',
            icon: 'bar-chart',
            enabled: false,
            features: [
              'Custom Dashboards',
              'Advanced Reports',
              'Data Export',
              'Performance Metrics',
              'Predictive Analytics'
            ],
            price: 125
          },
          {
            id: '6',
            name: 'Security Suite',
            description: 'Enhanced security features with IP whitelisting and audit logs',
            icon: 'shield',
            enabled: true,
            features: [
              'IP Whitelisting',
              'Audit Logs',
              'Two-Factor Authentication',
              'Session Management',
              'Security Alerts'
            ],
            price: 90
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/modules');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Toggle module enabled/disabled status
// Endpoint: PUT /api/modules/toggle
// Request: { moduleId: string, enabled: boolean }
// Response: { success: boolean, message: string }
export const toggleModule = (data: { moduleId: string; enabled: boolean }) => {
  console.log('API: Toggling module:', data.moduleId, data.enabled)
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Module status updated successfully'
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put('/api/modules/toggle', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}