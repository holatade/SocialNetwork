using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Application.Errors;
using System.Net;
using System;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo is null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });
                }
                var currentMain = user.Photos.FirstOrDefault(x => x.isMain);
                currentMain.isMain = false;
                photo.isMain = true;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("problem saving changes");
            }
        }
    }
}