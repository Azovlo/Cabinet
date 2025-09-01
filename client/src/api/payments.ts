import api from './api';

// Description: Get payment history for the user
// Endpoint: GET /api/payments/history
// Request: {}
// Response: { payments: Array<Payment> }
export const getPaymentHistory = () => {
  console.log('API: Fetching payment history')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        payments: [
          {
            id: '1',
            amount: 300,
            date: '2024-01-15T00:00:00Z',
            status: 'completed',
            description: 'CRM & CABINETS - Monthly Subscription',
            method: 'Visa •••• 4242'
          },
          {
            id: '2',
            amount: 300,
            date: '2023-12-15T00:00:00Z',
            status: 'completed',
            description: 'CRM & CABINETS - Monthly Subscription',
            method: 'Visa •••• 4242'
          },
          {
            id: '3',
            amount: 250,
            date: '2023-11-15T00:00:00Z',
            status: 'completed',
            description: 'CRM - Monthly Subscription',
            method: 'Visa •••• 4242'
          },
          {
            id: '4',
            amount: 75,
            date: '2023-11-10T00:00:00Z',
            status: 'completed',
            description: 'PDF Generator - Add-on Module',
            method: 'Visa •••• 4242'
          },
          {
            id: '5',
            amount: 300,
            date: '2024-02-15T00:00:00Z',
            status: 'pending',
            description: 'CRM & CABINETS - Monthly Subscription',
            method: 'Visa •••• 4242'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/payments/history');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Get saved payment methods
// Endpoint: GET /api/payments/methods
// Request: {}
// Response: { paymentMethods: Array<PaymentMethod> }
export const getPaymentMethods = () => {
  console.log('API: Fetching payment methods')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        paymentMethods: [
          {
            id: '1',
            type: 'card',
            last4: '4242',
            brand: 'Visa',
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true
          },
          {
            id: '2',
            type: 'card',
            last4: '0005',
            brand: 'Mastercard',
            expiryMonth: 8,
            expiryYear: 2024,
            isDefault: false
          },
          {
            id: '3',
            type: 'bank',
            last4: '1234',
            brand: 'Bank Account',
            isDefault: false
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/payments/methods');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}

// Description: Add a new payment method
// Endpoint: POST /api/payments/methods
// Request: { type: string, cardNumber: string, expiryMonth: number, expiryYear: number, cvv: string }
// Response: { success: boolean, message: string, paymentMethodId: string }
export const addPaymentMethod = (data: { type: string; cardNumber: string; expiryMonth: number; expiryYear: number; cvv: string }) => {
  console.log('API: Adding payment method')
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Payment method added successfully',
        paymentMethodId: 'pm_' + Math.random().toString(36).substr(2, 9)
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/payments/methods', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}