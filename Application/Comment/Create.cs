using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comment
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);
                if (activity is null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not found" });
                }
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                if (user is null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });
                }
                var comment = new Domain.Comment
                {
                    Author = user,
                    Activity = activity,
                    CreatedAt = DateTime.Now,
                    Body = request.Body,
                };

                activity.Comments.Add(comment);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("problem saving changes");
            }
        }
    }
}