export interface SalesRecord {
  id: number;
  date: string;
  region: string;
  city: string;
  product_category: string;
  product_name: string;
  units_sold: number;
  unit_price: number;
  total_revenue: number;
  cost_per_unit: number;
  total_cost: number;
  profit: number;
  customer_age: number;
  customer_gender: string;
  payment_method: string;
}

export const COLUMNS = [
  { name: 'id', type: 'int', description: 'Unique record identifier' },
  { name: 'date', type: 'str (YYYY-MM-DD)', description: 'Date of transaction' },
  { name: 'region', type: 'str', description: 'Geographic region (North, South, East, West)' },
  { name: 'city', type: 'str', description: 'City of the transaction' },
  { name: 'product_category', type: 'str', description: 'Category of product sold' },
  { name: 'product_name', type: 'str', description: 'Name of the product' },
  { name: 'units_sold', type: 'int', description: 'Number of units sold' },
  { name: 'unit_price', type: 'float', description: 'Price per unit ($)' },
  { name: 'total_revenue', type: 'float', description: 'Total revenue (units_sold × unit_price)' },
  { name: 'cost_per_unit', type: 'float', description: 'Cost to produce/acquire one unit ($)' },
  { name: 'total_cost', type: 'float', description: 'Total cost (units_sold × cost_per_unit)' },
  { name: 'profit', type: 'float', description: 'Profit (total_revenue − total_cost)' },
  { name: 'customer_age', type: 'int', description: 'Age of customer' },
  { name: 'customer_gender', type: 'str', description: 'Gender of customer (Male/Female/Other)' },
  { name: 'payment_method', type: 'str', description: 'Payment method used' },
];

const regions = ['North', 'South', 'East', 'West'];
const cities: Record<string, string[]> = {
  North: ['New York', 'Chicago', 'Boston', 'Detroit'],
  South: ['Houston', 'Miami', 'Atlanta', 'Dallas'],
  East: ['Philadelphia', 'Charlotte', 'Baltimore', 'Richmond'],
  West: ['Los Angeles', 'San Francisco', 'Seattle', 'Denver'],
};
const categories = ['Electronics', 'Clothing', 'Food & Beverages', 'Sports', 'Home & Garden'];
const products: Record<string, string[]> = {
  Electronics: ['Laptop', 'Smartphone', 'Headphones', 'Tablet', 'Smartwatch'],
  Clothing: ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers', 'Dress'],
  'Food & Beverages': ['Coffee Beans', 'Protein Bar', 'Green Tea', 'Energy Drink', 'Chocolate'],
  Sports: ['Yoga Mat', 'Dumbbells', 'Basketball', 'Running Shoes', 'Tennis Racket'],
  'Home & Garden': ['Plant Pot', 'LED Bulb', 'Cushion', 'Wall Clock', 'Garden Hose'],
};
const genders = ['Male', 'Female', 'Other'];
const payments = ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking'];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateDataset(count: number = 200): SalesRecord[] {
  const rand = seededRandom(42);
  const data: SalesRecord[] = [];

  for (let i = 1; i <= count; i++) {
    const region = regions[Math.floor(rand() * regions.length)];
    const city = cities[region][Math.floor(rand() * cities[region].length)];
    const category = categories[Math.floor(rand() * categories.length)];
    const product = products[category][Math.floor(rand() * products[category].length)];
    const unitsSold = Math.floor(rand() * 95) + 5;

    let basePrice = 0;
    if (category === 'Electronics') basePrice = 100 + rand() * 900;
    else if (category === 'Clothing') basePrice = 15 + rand() * 85;
    else if (category === 'Food & Beverages') basePrice = 3 + rand() * 20;
    else if (category === 'Sports') basePrice = 20 + rand() * 150;
    else basePrice = 5 + rand() * 60;

    const unitPrice = Math.round(basePrice * 100) / 100;
    const costPerUnit = Math.round(unitPrice * (0.4 + rand() * 0.3) * 100) / 100;
    const totalRevenue = Math.round(unitsSold * unitPrice * 100) / 100;
    const totalCost = Math.round(unitsSold * costPerUnit * 100) / 100;
    const profit = Math.round((totalRevenue - totalCost) * 100) / 100;

    const month = Math.floor(rand() * 12) + 1;
    const day = Math.floor(rand() * 28) + 1;
    const date = `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const customerAge = Math.floor(rand() * 52) + 18;
    const gender = genders[Math.floor(rand() * genders.length)];
    const payment = payments[Math.floor(rand() * payments.length)];

    data.push({
      id: i,
      date,
      region,
      city,
      product_category: category,
      product_name: product,
      units_sold: unitsSold,
      unit_price: unitPrice,
      total_revenue: totalRevenue,
      cost_per_unit: costPerUnit,
      total_cost: totalCost,
      profit,
      customer_age: customerAge,
      customer_gender: gender,
      payment_method: payment,
    });
  }

  return data;
}

export const dataset = generateDataset(200);
