export function getEstimatedDeliveryDays(city: string): [number, number] {
  if (!city) return [3, 5];
  
  const formattedCity = city.trim();
  
  if (formattedCity === 'Lahore') return [1, 2];
  if (['Islamabad', 'Rawalpindi', 'Gujranwala', 'Sialkot', 'Faisalabad'].includes(formattedCity)) return [2, 3];
  if (['Karachi', 'Hyderabad', 'Sukkur', 'Multan', 'Bahawalpur', 'Sargodha', 'Peshawar', 'Quetta', 'Jhelum'].includes(formattedCity)) return [3, 4];
  
  return [3, 5]; // Default
}

export function formatDeliveryDateRange(minDays: number, maxDays: number): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const today = new Date();
  
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);
  
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  return `${minDate.toLocaleDateString('en-US', options)} - ${maxDate.toLocaleDateString('en-US', options)}`;
}
