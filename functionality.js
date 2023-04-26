/*===========================
	SETUP
===========================*/
//#region Setup
$(document).ready(function () {
    makeHidden();
    displayData();
    setRandomColor();
});

function setRandomColor() {
    let colorArray = [".movie"];

    for (let colorElement in colorArray) {
        $(colorArray[colorElement]).each(function () {
            $(this).css("background-color", random_color());
        });
    }
}

function random_color() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    color += "40";
    return color;
}

// Hide everything then display something when dropdown is changed
$("#dataSelection").on("change", function () {
    event.preventDefault();
    makeHidden();
    displayData();
});

//#endregion

//#region Hide/Show

// Hides all elements
function makeHidden() {
    $(".allMovies").hide();
    $(".genreBox").hide();
}

// Shows the selected section and runs its function
function displayData() {
    switch ($("#dataSelection").val()) {
        case "all":
            allMovies(1);
            break;
        case "pubDate":
            allMovies(3);
            break;
        case "genre":
            genreSetup("movieGenre");
            break;
    }

    //setGradient();
}
//#endregion

/*===========================
	ALL Movies Watched
===========================*/
//#region All Movies
// Pulls all of the movies and displays them
function allMovies(sortingNum) {
    let allMovies = ``;
    let moviesForAll = 0;

    $(".allMovies").show();

    let movieArr = JSON.parse(JSON.stringify(movieData));

    if (sortingNum == 3) {
        movieArr.sort(function (a, b) {
            return b.yearReleased - a.yearReleased;
        });
    }

    for (let i = 0; i < movieArr.length; i++) {
        allMovies += `<div class="movie"><div class="title">${movieArr[i].title}</div><div class="year">${movieArr[i].yearReleased}</div>
      <div class="rating">${movieArr[i].rating}</div></div>`;
        moviesForAll += 1;
        movieArr[i].id = i;
    }

    $(".allMovies").html(`     
			<h3>${moviesForAll} movies</h3>
			<div class="movieList">${allMovies}</div>
    `);

    setRandomColor();
}
//#endregion

/*==========================================
	Movies BY Genre, Director, Country
==========================================*/
//#region Keyword
function genreSetup(sortType) {
    $(".genreBox").show();
    let movieArr = JSON.parse(JSON.stringify(movieData));
    let movieGenreArr = [];

    for (let i = 0; i < movieArr.length; i++) {
        for (let j = 0; j < movieArr[i][sortType].length; j++) {
            if (!movieGenreArr.includes(movieArr[i][sortType][j])) {
                movieGenreArr.push(movieArr[i][sortType][j]);
            }
        }
    }
    movieGenreArr.sort();
    printGenres(movieGenreArr, sortType);
}

function printGenres(movieGenreArr, sortType) {
    let movieList = ``;
    let movieCounts = {};

    for (let i = 0; i < movieGenreArr.length; i++) {
        movieList += `<div class="genreTitle" id="${movieGenreArr[i].replace(/\s/g, "")}">${movieGenreArr[i]}<span class="countNum"></span></div>`;
        for (let j = 0; j < movieData.length; j++) {
            if (movieData[j][sortType] == undefined) {
            } else {
                if (movieData[j][sortType].includes(movieGenreArr[i]) == true) {
                    movieList += `<div class="movie"><div class="title">${movieData[j].title}</div><div class="year">${movieData[j].yearReleased}</div>
            <div class="rating">${movieData[j].rating}</div></div>`;
                    movieCounts[movieGenreArr[i]] = movieCounts[movieGenreArr[i]] + 1 || 1;
                }
            }
        }
    }

    $(".genreBox").html(`
			<div class="genreMovies">
				<div class="movieList">${movieList}</div>
			</div>
    `);

    console.log(movieCounts);

    for (let i = 0; i < movieGenreArr.length; i++) {
        console.log(movieCounts[movieGenreArr[i]]);
        $(`#${movieGenreArr[i].replace(/\s/g, "")}`).html(`
			${movieGenreArr[i]}<span class="countNum">${movieCounts[movieGenreArr[i]]}</span>
		`);
    }

    setRandomColor();
}
//#endregion
