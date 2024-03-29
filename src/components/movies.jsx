import React, {Component} from "react";
import {getMovies} from "../services/fakeMovieService";
import Pagination from '../common/pagination';
import {paginate} from '../utlis/paginate';
import ListGroup from '../common/listGroup';
import {getGenres} from '../services/fakeGenreService';
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends Component
{
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        sortColumn: {
            path: 'title',
            order: 'asc'
        }
    };

    //get data from server
    componentDidMount()
    {
        const genres = [
            {
                _id: "",
                name: 'All Genres'
            },
            ...getGenres()
        ]
        this.setState({movies: getMovies(), genres});

    }

    handleDelete = movie => {
        const movies = this
            .state
            .movies
            .filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {
            ...movies[index]
        };
        movies[index].liked = !movies[index].liked;
        this.setState({movies})
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    }
    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
    }

    handleSort = sortColumn => {
        this.setState({sortColumn});

    }

    getPagedData = () => {
        const {pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn} = this.state;

        const filterd = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order])
        debugger
        const movies = paginate(sorted, currentPage, pageSize);
        return {totalCount: filterd.length, data: movies}
    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, sortColumn} = this.state;

        if (count === 0) 
            return <p>There are no movies in the database.</p>;
        debugger

        const {totalCount, data: movies} = this.getPagedData();

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}/>
                </div>

                <div className="col">
                    <p>Showing {count}
                        movies in the database.</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}/>
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}/>
                </div>

            </div>
        );
    }
}

export default Movies;
