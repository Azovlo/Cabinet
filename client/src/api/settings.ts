import api from './api';

// Description: Get user and application settings
// Endpoint: GET /api/settings
// Request: {}
// Response: { settings: SettingsData }
export const getSettings = () => {
  console.log('API: Fetching settings')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        settings: {
          personal: {
            name: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+1 (555) 123-4567',
            timezone: 'EST',
            notifications: true
          },
          office: {
            companyName: 'Cabinets Monster Inc.',
            address: '123 Business Street, Suite 100\nNew York, NY 10001',
            workingHours: '9:00 AM - 6:00 PM',
            ipWhitelist: ['192.168.1.1', '10.0.0.1'],
            allowRemoteAccess: true
          },
          crm: {
            autoAssignment: true,
            callRecording: false,
            followUpReminders: true,
            exportFormat: 'xlsx'
          },
          cabinets: {
            defaultBankTemplate: 'chase',
            clientChatEnabled: true,
            documentRetention: 90,
            customBranding: false
          },
          pdfGenerator: {
            defaultTemplate: 'professional',
            watermark: true,
            compression: 'medium',
            batchSize: 50
          }
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/settings');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Update settings for a specific section
// Endpoint: PUT /api/settings
// Request: { section: string, data: object }
// Response: { success: boolean, message: string }
export const updateSettings = (data: { section: string; data: any }) => {
  console.log('API: Updating settings for section:', data.section)
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Settings updated successfully'
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put('/api/settings', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}