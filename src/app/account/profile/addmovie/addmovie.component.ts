import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/_services/category.service';
import { DirectorService } from 'src/app/_services/director.service';
import { MovieService } from 'src/app/_services/movie.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  faTimes = faTimes;

  directors!: any;
  movies!: any;
  categories!: any;

  selectedCategories = new Array();

  directorForm!: FormGroup;
  movieForm!: FormGroup;

  selectedPoster!: File;
  posterImage: any;
  selectedBackground!: File;
  backgroundImage: any;

  directorDiv: boolean = true;
  movieDiv: boolean = false;
  imagesDiv: boolean = false;
  movieIsSelected: boolean = false;
  selectedMovieId!: string;

  isLoggedIn!: boolean;

  addDirectorCorrectResponse = "";
  addDirectorErrorResposne = "";

  invalidDirectorFirstName = "Proszę podać imię reżysera!";
  invalidDirectorLastName = "Proszę podać nazwisko reżysera!";
  invalidDirectorNationality = "Proszę podać narodowość reżysera!";

  addMovieCorrectResponse = "";
  addMovieErrorResponse = "";

  invalidMovieTitle = "Proszę podać tytuł filmu!";
  invalidMovieDirector = "Proszę wybrać reżysera!";
  invalidMovieDescription = "Proszę podać opis filmu!";
  invalidMovieReleaseDate = "Proszę podać datę premiery filmu!";
  invalidMovieLength = "Proszę podać długość filmu!";

  addImagesCorrectResponse = "";
  addImagesErrorResponse = "";

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private directorService: DirectorService,
    private categoryService: CategoryService
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.directorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required]
    });

    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      description: ['', Validators.required],
      releaseDate: ['', Validators.required],
      length: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if (this.isLoggedIn) {}
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }

    this.directorService.getAll().subscribe(
      response => {
        this.directors = response;
      }
    )

    this.movieService.getAll().subscribe(
      response => {
        this.movies = response;
      }
    )

    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
      }
    )
  }

  get df() { return this.directorForm.controls; }
  get mf() { return this.movieForm.controls; }

  addDirector() {
    if (this.directorForm.invalid) { return; }
    this.clearDirector();

    this.directorService.addDirector(this.df.firstName.value, this.df.lastName.value, this.df.nationality.value).subscribe(
      response => {
        this.addDirectorCorrectResponse = response.message;
        this.directorForm.reset();
        this.directorForm.controls.firstName.setErrors(null);
        this.directorForm.controls.lastName.setErrors(null);
        this.directorForm.controls.nationality.setErrors(null);
        this.directorService.getAll().subscribe(
          response => {
            this.directors = response;
          }
        )
      },
      error => {
        this.addDirectorErrorResposne = error.error.message;
      }
    )
  }

  addMovie() {
    if (this.movieForm.invalid) { return; }
    this.clearMovie();

    this.movieService.addMovie(this.mf.director.value.directorId, this.mf.title.value, this.mf.description.value, this.mf.releaseDate.value, this.mf.length.value, this.selectedCategories).subscribe(
      response => {
        this.addMovieCorrectResponse = response.message
        this.movieForm.reset();
        this.movieForm.controls.director.setErrors(null);
        this.movieForm.controls.title.setErrors(null);
        this.movieForm.controls.description.setErrors(null);
        this.movieForm.controls.releaseDate.setErrors(null);
        this.movieForm.controls.length.setErrors(null);
        this.selectedCategories = [];
        this.movieService.getAll().subscribe(
          response => {
            this.movies = response;
          }
        )
      },
      error => {
        this.addMovieErrorResponse = error.error.message;
      }
    )
  }

  addImages(){
    if (!this.selectedPoster && !this.selectedBackground) {
      this.addImagesErrorResponse = "Proszę dodać oba zdjęcia!";
      return;
    }
    this.clearImages();

    this.movieService.addMovieImages(this.selectedMovieId, this.selectedPoster, this.selectedBackground).subscribe(
      response => {
        this.addImagesCorrectResponse = response.message;
      },
      error => {
        this.addImagesErrorResponse = error.error.message;
      }
    )
  }

  addCategory(event: string) {
    this.selectedCategories.push(event);
  }

  removeCategory(event: string) {
    this.selectedCategories = this.selectedCategories.filter(x => x !== event);
  }

  movieSelection(event: any) {
    this.movieIsSelected = true;
    this.selectedMovieId = event.movieId;
  }

  onPosterSelected(event: any) {
    this.selectedPoster = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.posterImage = reader.result;
    }
  }

  onBackgroundSelected(event: any) {
    this.selectedBackground = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.backgroundImage = reader.result;
    }
  }

  clearDirector() {
    this.addDirectorCorrectResponse = "";
    this.addDirectorErrorResposne = "";
  }

  clearMovie() {
    this.addMovieCorrectResponse = "";
    this.addMovieErrorResponse = "";
  }

  clearImages() {
    this.addImagesCorrectResponse = "";
    this.addImagesErrorResponse = "";
  }

  directorDisplay() {
    this.clearDirector();
    this.clearMovie();
    this.clearImages();
    this.directorDiv = true;
    this.movieDiv = false;
    this.imagesDiv = false;
  }

  movieDisplay() {
    this.clearDirector();
    this.clearMovie();
    this.clearImages();
    this.directorDiv = false;
    this.movieDiv = true;
    this.imagesDiv = false;
  }

  imageDisplay() {
    this.clearDirector();
    this.clearMovie();
    this.clearImages();
    this.directorDiv = false;
    this.movieDiv = false;
    this.imagesDiv = true;
  }
}
