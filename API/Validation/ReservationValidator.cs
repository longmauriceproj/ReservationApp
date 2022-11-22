using API.Entities;
using FluentValidation;

namespace API.Validation
{
    public class ReservationValidator : AbstractValidator<Reservation>
    {
        public ReservationValidator()
        {
            // TODO: will need to revisit and make better validation rules
            RuleFor(res => res.CustomerFullName).NotEmpty();
            RuleFor(res => res.BookingTime).NotEmpty();
            RuleFor(res => res.PartySize).NotEmpty();
            RuleFor(res => res.PhoneNumber).NotEmpty();
            RuleFor(res => res.Email).NotEmpty();
            RuleFor(res => res.AllowSMS).NotEmpty();
            RuleFor(res => res.AllowMarketing).NotEmpty();
        }
    }
}