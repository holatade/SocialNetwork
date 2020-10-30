using System.Linq;
using AutoMapper;

namespace Application.Comment
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Comment, CommentDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Author.UserName))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Author.Photos.FirstOrDefault(x => x.isMain).Url))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.Author.DisplayName));
        }
    }
}