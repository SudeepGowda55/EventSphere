// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MovieData {
    address public owner;

    struct Theatre {
        string id;
        string name;
        string location;
        string[] showTimes;
    }

    struct Movie {
        string id;
        string name;
        string[] languages;
        Theatre[] theatres;
    }

    Movie[] public movies;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addMovie(
        string memory _id,
        string memory _name,
        string[] memory _languages,
        string[] memory _theatreIds,
        string[] memory _theatreNames,
        string[] memory _theatreLocations,
        string[][] memory _theatreShowTimes
    ) public onlyOwner {
        require(
            _theatreIds.length == _theatreNames.length &&
                _theatreNames.length == _theatreLocations.length &&
                _theatreLocations.length == _theatreShowTimes.length,
            "Theatre data arrays must have the same length"
        );

        movies.push();
        Movie storage newMovie = movies[movies.length - 1];
        newMovie.id = _id;
        newMovie.name = _name;
        newMovie.languages = _languages;

        for (uint256 i = 0; i < _theatreIds.length; i++) {
            Theatre memory newTheatre = Theatre({
                id: _theatreIds[i],
                name: _theatreNames[i],
                location: _theatreLocations[i],
                showTimes: _theatreShowTimes[i]
            });
            newMovie.theatres.push(newTheatre);
        }
    }

    function getMoviesByLocation(string memory _location)
        public
        view
        returns (
            string[] memory movieIds,
            string[] memory movieNames,
            string[][] memory movieLanguages,
            Theatre[][] memory theatres
        )
    {
        uint256 count = 0;

        for (uint256 i = 0; i < movies.length; i++) {
            for (uint256 j = 0; j < movies[i].theatres.length; j++) {
                if (
                    keccak256(abi.encodePacked(movies[i].theatres[j].location)) ==
                    keccak256(abi.encodePacked(_location))
                ) {
                    count++;
                    break;
                }
            }
        }

        movieIds = new string[](count);
        movieNames = new string[](count);
        movieLanguages = new string[][](count);
        theatres = new Theatre[][](count);

        uint256 index = 0;

        for (uint256 i = 0; i < movies.length; i++) {
            for (uint256 j = 0; j < movies[i].theatres.length; j++) {
                if (
                    keccak256(abi.encodePacked(movies[i].theatres[j].location)) ==
                    keccak256(abi.encodePacked(_location))
                ) {
                    movieIds[index] = movies[i].id;
                    movieNames[index] = movies[i].name;
                    movieLanguages[index] = movies[i].languages;
                    theatres[index] = movies[i].theatres;
                    index++;
                    break;
                }
            }
        }

        return (movieIds, movieNames, movieLanguages, theatres);
    }
}
