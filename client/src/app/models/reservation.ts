export interface Reservation {
  id: string;
  customerFullName: string;
  bookingTime: string;
  partySize: number;
  notes: string;
  phoneNumber: string;
  email: string;
  allowSMS: boolean;
  allowMarketing: boolean;
}
