export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface BookingOwner {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export interface ActiveTenancy {
  propertyTitle: string;
  location: string;
  price: number;
  leaseStart: string;
  leaseDuration: string;
  deposit: number;
  cycle: string;
  nextDue: string;
  owner: BookingOwner;
  bills: Bill[];
}

export interface PendingBooking {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  appliedOn: string;
  image: string;
}

export interface PastBooking {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  status: string;
  image: string;
}
