export interface Patient {
  id: string;
  hospitalId: string;
  name: string;
  phone: string;
  nextDeliveryDate: string;
  location: string;
  status: "Completed" | "Due & Paid" | "Due & Unpaid" | "Assigned" | "Paid";
}

export interface Admin {
  name: string;
  avatar: string | null;
  role?: string;
}
