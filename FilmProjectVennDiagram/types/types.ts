export { PersonData, MovieData }
type PersonData = {
    FullName?: string,
    Id?: number,
    Popularity?: number,
    ProfilePicture?: string,
    Job?: string
}

type MovieData = {
    Id?: number,
    Title?: string,
    ReleaseDate?: string,
    PosterPath?: string,
    Popularity?: number       
}   
