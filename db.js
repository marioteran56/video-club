const Sequelize = require('sequelize');

const movieActorModel = require('./models/movieActor');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const directorModel = require('./models/director');
const copyModel = require('./models/copy');
const memberModel = require('./models/member');
const bookingModel = require('./models/booking');
const actorModel = require('./models/actor');

// 1) Nombre de la base de datos
// 2) Usuario de la base de datos
// 3) Objeto de configuración
// 4) Objeto de configuración (ORM)

const sequelize = new Sequelize('video_club', 'root', 'admin', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const Actor = actorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);

// Un miembro puede tener muchas reservas
Member.hasMany(Booking, {as: 'bookings'});

// Una reserva puede tener un miembro
Booking.belongsTo(Member, {as: 'member'});

// Una copia puede tener muchas reservas
Copy.hasMany(Booking, {as: 'bookings'});

// Una reserva puede tener una copia
Booking.belongsTo(Copy, {as: 'copy'});

// Una pelicula puede tener muchas copias
Movie.hasMany(Copy, {as: 'copies'});

// Una copia puede tener una pelicula
Copy.belongsTo(Movie, {as: 'movie'});

// Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as: 'movies'});

// Una pelicula puede tener un genero
Movie.belongsTo(Genre, {as: 'genre'});

// Un director puede tener muchas peliculas
Director.hasMany(Movie, {as: 'movies'});

// Una pelicula puede tener un director
Movie.belongsTo(Director, {as: 'director'});

// Un actor puede tener muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey: 'movieId'});

// Una pelicula puede tener muchos actores
MovieActor.belongsTo(Actor, {foreignKey: 'actorId'});

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'moviesActors'
});

Actor.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as: 'movies',
    through: 'moviesActors'
});


sequelize.sync({
    force: true,

}).then(()=>{
    console.log("Base de datos actualizada.");
});

module.exports = { Genre, Movie, Director, Copy, Member, Booking, Actor };