export interface IProfile{
    displayName : string,
    username : string,
    bio: string,
    image : string,
    photos : IPhoto[]
}

export interface IPhoto{
    id: string,
    url : string,
    isMain: boolean
}

export interface IEditProfile{
    displayName : string,
    bio: string,

}