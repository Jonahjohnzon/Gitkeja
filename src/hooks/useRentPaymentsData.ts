import { useState, useEffect } from 'react';
import { RentPayment } from '../types';

export const useRentPaymentsData = () => {
  const [data, setData] = useState<RentPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch data here
    // For now, we'll use mock data
    const mockData: RentPayment[] = [
      // Add mock data here
    ];

    setData(mockData);
    setIsLoading(false);
  }, []);

  return { data, isLoading, error };
};