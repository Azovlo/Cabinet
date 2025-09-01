import api from './api';

// Description: Get CRM data including clients and call history
// Endpoint: GET /api/crm
// Request: {}
// Response: { clients: Array<Client>, calls: Array<Call> }
export const getCRMData = () => {
  console.log('API: Fetching CRM data')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        clients: [
          {
            id: '1',
            name: 'John Smith',
            phone: '+1 (555) 123-4567',
            email: 'john.smith@email.com',
            status: 'new',
            assignedTo: 'Sarah Johnson',
            lastContact: '2024-01-15T10:30:00Z',
            source: 'Website'
          },
          {
            id: '2',
            name: 'Emily Davis',
            phone: '+1 (555) 234-5678',
            email: 'emily.davis@email.com',
            status: 'contacted',
            assignedTo: 'Mike Wilson',
            lastContact: '2024-01-14T14:20:00Z',
            source: 'Referral'
          },
          {
            id: '3',
            name: 'Robert Johnson',
            phone: '+1 (555) 345-6789',
            email: 'robert.johnson@email.com',
            status: 'interested',
            assignedTo: 'Sarah Johnson',
            lastContact: '2024-01-13T09:15:00Z',
            source: 'Cold Call'
          },
          {
            id: '4',
            name: 'Lisa Brown',
            phone: '+1 (555) 456-7890',
            email: 'lisa.brown@email.com',
            status: 'converted',
            assignedTo: 'Tom Anderson',
            lastContact: '2024-01-12T16:45:00Z',
            source: 'Social Media'
          },
          {
            id: '5',
            name: 'David Wilson',
            phone: '+1 (555) 567-8901',
            email: 'david.wilson@email.com',
            status: 'closed',
            assignedTo: 'Mike Wilson',
            lastContact: '2024-01-11T11:30:00Z',
            source: 'Website'
          }
        ],
        calls: [
          {
            id: '1',
            clientId: '1',
            clientName: 'John Smith',
            duration: 15,
            outcome: 'Interested',
            date: '2024-01-15T10:30:00Z',
            notes: 'Client showed interest in CRM package'
          },
          {
            id: '2',
            clientId: '2',
            clientName: 'Emily Davis',
            duration: 8,
            outcome: 'Callback Scheduled',
            date: '2024-01-14T14:20:00Z',
            notes: 'Needs to discuss with partner, callback scheduled for tomorrow'
          },
          {
            id: '3',
            clientId: '3',
            clientName: 'Robert Johnson',
            duration: 22,
            outcome: 'Demo Requested',
            date: '2024-01-13T09:15:00Z',
            notes: 'Requested product demo for next week'
          },
          {
            id: '4',
            clientId: '4',
            clientName: 'Lisa Brown',
            duration: 35,
            outcome: 'Converted',
            date: '2024-01-12T16:45:00Z',
            notes: 'Successfully converted to premium plan'
          },
          {
            id: '5',
            clientId: '5',
            clientName: 'David Wilson',
            duration: 5,
            outcome: 'Not Interested',
            date: '2024-01-11T11:30:00Z',
            notes: 'Not interested at this time, marked as closed'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/crm');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Upload client database file
// Endpoint: POST /api/crm/upload
// Request: { file: File }
// Response: { success: boolean, message: string, importedCount: number }
export const uploadDatabase = (data: { file: any }) => {
  console.log('API: Uploading database file')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Database uploaded successfully',
        importedCount: 150
      });
    }, 2000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/crm/upload', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Export clients data
// Endpoint: POST /api/crm/export
// Request: { format: string }
// Response: { success: boolean, downloadUrl: string }
export const exportClients = (data: { format: string }) => {
  console.log('API: Exporting clients data in format:', data.format)
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        downloadUrl: '/downloads/clients_export.csv'
      });
    }, 1500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/crm/export', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}