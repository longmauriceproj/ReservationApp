using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context) {
            if (await context.Reservations.AnyAsync()) return;

            var reservations = new List<Reservation> {
                new Reservation
                {
                    CustomerFullName = "Richard Feynman",
                    BookingTime = new DateTime(2022,12,01,17,0,0),
                    PartySize = 4,
                    PhoneNumber = "626-111-1111",
                    Email = "rfeynman@email.com",
                    AllowSMS = true,
                    AllowMarketing = false,
                },
                new Reservation
                {
                    CustomerFullName = "Niels Bohr",
                    BookingTime = new DateTime(2022,12,01,17,0,0),
                    PartySize = 4,
                    PhoneNumber = "626-222-2222",
                    Email = "nbohr@email.com",
                    AllowSMS = true,
                    AllowMarketing = true,
                },
                new Reservation
                {
                    CustomerFullName = "Marie Curie",
                    BookingTime = new DateTime(2022,12,01,17,0,0),
                    PartySize = 2,
                    PhoneNumber = "626-333-3333",
                    Email = "mcurie@email.com",
                    AllowSMS = true,
                    AllowMarketing = false,
                },
                new Reservation
                {
                    CustomerFullName = "Werner Heisenberg",
                    BookingTime = new DateTime(2022,12,01,18,0,0),
                    PartySize = 4,
                    PhoneNumber = "626-444-4444",
                    Email = "wheisenberg@email.com",
                    AllowSMS = true,
                    AllowMarketing = true,
                },
                new Reservation
                {
                    CustomerFullName = "Ernest Rutherford",
                    BookingTime = new DateTime(2022,12,01,18,0,0),
                    PartySize = 4,
                    PhoneNumber = "626-555-5555",
                    Email = "erutherfordg@email.com",
                    AllowSMS = true,
                    AllowMarketing = true,
                },
                new Reservation
                {
                    CustomerFullName = "James Maxwell",
                    BookingTime = new DateTime(2022,12,01,19,0,0),
                    PartySize = 3,
                    PhoneNumber = "626-666-6666",
                    Email = "jmaxwellg@email.com",
                    AllowSMS = true,
                    AllowMarketing = true,
                },
                new Reservation
                {
                    CustomerFullName = "Antoine Becquerel",
                    BookingTime = new DateTime(2022,12,01,19,0,0),
                    PartySize = 2,
                    PhoneNumber = "626-777-7777",
                    Email = "abecquerelg@email.com",
                    AllowSMS = false,
                    AllowMarketing = false,
                }
            };

            await context.Reservations.AddRangeAsync(reservations);
            await context.SaveChangesAsync();
        }
    }
}