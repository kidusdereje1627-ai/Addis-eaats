export type Order = {
  id: string;
  customer: string;
  status: "Pending" | "Preparing" | "Ready" | "Delivered";
  total: number;
};

export const orders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Customer 1",
    status: "Preparing",
    total: 500,
  },
  {
    id: "ORD-1002",
    customer: "Customer 2",
    status: "Pending",
    total: 320,
  },
  {
    id: "ORD-1003",
    customer: "Customer 3",
    status: "Ready",
    total: 180,
  },
];
