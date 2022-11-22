using API.Data;
using API.Entities;
using API.Errors;
using API.LanguageExt;
using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ReservationsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IValidator<Reservation> _validator;
        public ReservationsController(DataContext context, IMapper mapper, IValidator<Reservation> validator)
        {
            _validator = validator;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetReservations() 
        {
            var reservations = await _context.Reservations.ToListAsync();
            return HandleResult(Result<IEnumerable<Reservation>>.Success(reservations));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservation(Guid id) 
        {
            var reservation = await _context.Reservations.FindAsync(id);
            return HandleResult(Result<Reservation>.Success(reservation));
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation(Reservation reservation)
        {
            ValidationResult result = await _validator.ValidateAsync(reservation);

            if (!result.IsValid) 
            {
                result.AddToModelState(this.ModelState);
                return BadRequest(result);
            }


            _context.Reservations.Add(reservation);
            bool saveChangesIsSuccessFul = await _context.SaveChangesAsync() > 0;
            if (!saveChangesIsSuccessFul) return HandleResult(Result<Unit>.Failure("Failed to create reservation."));
            return HandleResult(Result<Unit>.Success(Unit.Value));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditReservation(Guid id, Reservation reservation) {
            ValidationResult result = await _validator.ValidateAsync(reservation);

            if (!result.IsValid) 
            {
                result.AddToModelState(this.ModelState);
                return BadRequest(result);
            }
            
            var reservationToUpdate = await _context.Reservations.FindAsync(id);

            if (reservationToUpdate == null) return NotFound();

            _mapper.Map(reservation, reservationToUpdate);

            bool saveChangesIsSuccessFul = await _context.SaveChangesAsync() > 0;

            if (!saveChangesIsSuccessFul) return HandleResult(Result<Unit>.Failure("Failed to update the reservation."));
            return HandleResult(Result<Unit>.Success(Unit.Value));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteReservation(Guid id) {
            var reservation = await _context.Reservations.FindAsync(id);

            // if (reservation == null) return NotFound();

            _context.Remove(reservation);

            bool saveChangesIsSuccessFul = await _context.SaveChangesAsync() > 0;
            if (!saveChangesIsSuccessFul) return HandleResult(Result<Unit>.Failure("Failed to delete the reservation."));
            return HandleResult(Result<Unit>.Success(Unit.Value));
        }
    }
}