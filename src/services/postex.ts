export interface PostExCity {
  operationalCityName: string;
  countryName: string;
  isPickupCity: boolean;
  isDeliveryCity: boolean;
}

export interface PostExOrderResponse {
  statusCode: string;
  statusMessage: string;
  dist: {
    trackingNumber: string;
    orderStatus: string;
    orderDate: string;
  };
}

import { CartItem, CustomerDetails } from '../types';

/**
 * Frontend service to interact with PostEx.
 * Authentication using the POSTEX_API_TOKEN from environment variables
 * is securely handled in the Express server (/api/postex/* endpoints)
 * to avoid exposing the token to the client.
 */
export async function fetchOperationalCities(): Promise<PostExCity[]> {
  try {
    const response = await fetch('/api/postex/cities');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.dist || [];
  } catch (error) {
    console.error('Error fetching operational cities from PostEx:', error);
    return [];
  }
}

export async function createPostExOrder(orderId: string, cartItems: CartItem[], total: number, customer: CustomerDetails): Promise<PostExOrderResponse | null> {
  try {
    const itemDetails = cartItems.map(item => `${item.quantity}x ${item.product.title} (${item.product.sku})`).join(', ');
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    const payload = {
      orderRefNumber: orderId,
      customerName: `${customer.firstName} ${customer.lastName}`.trim(),
      customerPhone: customer.phone,
      deliveryAddress: customer.address,
      cityName: customer.city,
      invoiceDivision: 1,
      invoicePayment: total,
      items: totalItems,
      orderDetail: itemDetails,
      orderType: 'Normal',
      transactionNotes: 'Order placed via Akash Collection Website'
    };

    const response = await fetch('/api/postex/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating PostEx order:', error);
    return null;
  }
}
