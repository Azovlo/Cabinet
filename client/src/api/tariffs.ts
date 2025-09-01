import api from './api';

// Description: Get available tariff plans
// Endpoint: GET /api/tariffs
// Request: {}
// Response: { tariffs: Array<{ id: string, name: string, price: number, features: Array<string>, popular: boolean, description: string }> }
export const getTariffs = () => {
  console.log('API: Fetching tariff plans')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tariffs: [
          {
            id: '1',
            name: 'CRM',
            price: 250,
            description: 'Complete CRM system with document generation',
            popular: false,
            features: [
              'CRM System',
              'Document Generator',
              'Client Management',
              'Analytics Dashboard',
              'Email Support'
            ]
          },
          {
            id: '2',
            name: 'CABINETS',
            price: 250,
            description: 'Bank personal cabinets with multi-bank support',
            popular: false,
            features: [
              'Bank Personal Cabinets',
              'Document Generator',
              '30+ Bank Templates',
              'Client Chat System',
              'Email Support'
            ]
          },
          {
            id: '3',
            name: 'CRM & CABINETS',
            price: 300,
            description: 'Combined CRM and Cabinets with enhanced features',
            popular: true,
            features: [
              'Complete CRM System',
              'Bank Personal Cabinets',
              'Document Generator',
              '30+ Bank Templates',
              'Enhanced Analytics',
              'Client Chat System',
              'Priority Support'
            ]
          },
          {
            id: '4',
            name: 'ALL IN ONE',
            price: 400,
            description: 'Complete package with all features and VIP support',
            popular: false,
            features: [
              'Complete CRM System',
              'Bank Personal Cabinets',
              'Document Generator',
              '30+ Bank Templates',
              'Advanced Analytics',
              'Data Breach Database',
              'Client Chat System',
              'VIP Support',
              'Custom Integrations'
            ]
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/tariffs');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Subscribe to a tariff plan
// Endpoint: POST /api/tariffs/subscribe
// Request: { tariffId: string, paymentMethod: string }
// Response: { success: boolean, message: string, subscriptionId: string }
export const subscribeToPlan = (data: { tariffId: string; paymentMethod: string }) => {
  console.log('API: Subscribing to plan:', data.tariffId)
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Successfully subscribed to plan',
        subscriptionId: 'sub_' + Math.random().toString(36).substr(2, 9)
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/tariffs/subscribe', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}