using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Reservation
    {
        public Guid Id { get; set; }
        public string CustomerFullName { get; set; }
        // The date and time the reservation was booked.
        public DateTime BookingTime { get; set; }
        // Number of people the reservation should accomodate
        public int PartySize { get; set; }
        public string Notes { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool AllowSMS { get; set; }
        public bool AllowMarketing { get; set; }
    }
}