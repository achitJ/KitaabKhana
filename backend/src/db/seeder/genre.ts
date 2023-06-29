import GenreRepo from "../repository/Genre";

const genres = [
    {
        name: 'Fantasy'
    },
    {
        name: 'Science Fiction'
    },
    {
        name: 'Horror'
    },
    {
        name: 'Thriller'
    },
    {
        name: 'Mystery'
    },
    {
        name: 'Romance'
    },
    {
        name: 'Western'
    },
    {
        name: 'Dystopian'
    },
    {
        name: 'Contemporary'
    },
    {
        name: 'Memoir'
    },
    {
        name: 'Cooking'
    },
    {
        name: 'Art'
    },
    {
        name: 'Novel'
    },
    {
        name: 'Development'
    },
    {
        name: 'Motivational'
    },
    {
        name: 'Health'
    },
    {
        name: 'History'
    },
    {
        name: 'Travel'
    },
    {
        name: 'Guide / How-to'
    },
    {
        name: 'Families & Relationships'
    },
];

export async function seedGenres() {
    for (const genre of genres) {
        const genreName = genre.name;
        const genreExists = await GenreRepo.findGenreByName(genreName);
        console.log(genreExists);
        if (!genreExists) {
            await GenreRepo.createNewGenre({name: genreName});
        }
    }
}