using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ReservationsDashboardController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ReservationsDashboardController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations() 
        {
            return await _context.Reservations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(Guid id) 
        {
            return await _context.Reservations.FindAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            return Ok(await _context.SaveChangesAsync());
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditReservation(Guid id, Reservation reservation) {
            var reservationToUpdate = await _context.Reservations.FindAsync(id);

            _mapper.Map(reservation, reservationToUpdate);

            return Ok(await _context.SaveChangesAsync());
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteReservation(Guid id) {
            var reservation = await _context.Reservations.FindAsync(id);

            _context.Remove(reservation);

            return Ok(await _context.SaveChangesAsync());
        }
    }
}