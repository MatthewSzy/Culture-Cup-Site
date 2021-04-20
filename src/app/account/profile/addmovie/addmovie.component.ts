import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
  selectedDirector!: string;

  categories = ['Akcja', 'Animacja', 'Biografia', 'Dokumentalny', 'Dramat', 'Fantasy', 'HackAndSlash', 'Horror', 'Komedia', 'MMO', 'Musical',
                  'Przygodowy', 'Przyrodniczy', 'Romantyczny', 'RougeLike', 'RPG', 'SciFi', 'Strategia', 'Strzelanka', 'Thriller', 'Western', 'Wojenny'];

  selectedCategories = new Array();

  directorForm!: FormGroup;
  movieForm!: FormGroup;
  formGroupDirective!: FormGroupDirective;

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
  invalidMovieCategory = "Proszę wybrać kategorię filmu!";
  invalidMovieCategoryCheck = false;

  addImagesCorrectResponse = "";
  addImagesErrorResponse = "";
  invalidImagesCheck = false;

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private directorService: DirectorService
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

    if (this.isLoggedIn) {}
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }
  }

  get df() { return this.directorForm.controls; }
  get mf() { return this.movieForm.controls; }

  addDirector() {
    if (this.directorForm.invalid) { return; }
    this.clearDirector();

    this.directorService.addDirector(this.df.firstName.value, this.df.lastName.value, this.df.nationality.value).subscribe(
      response => {
        this.addDirectorCorrectResponse = "Dodano nowego reżysera: " + this.df.firstName.value + " " + this.df.lastName.value;
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
    if (this.selectedCategories.length == 0) {
      this.invalidMovieCategoryCheck = true;
      return;
    }
    this.clearMovie();

    this.movieService.addMovie(this.mf.director.value.directorId, this.mf.title.value, this.mf.description.value, this.mf.releaseDate.value, this.mf.length.value, this.selectedCategories).subscribe(
      response => {
        this.addMovieCorrectResponse = "Dodano nowy film: " + this.mf.title.value;
        this.movieForm.reset();
        this.movieForm.controls.director.setErrors(null);
        this.movieForm.controls.title.setErrors(null);
        this.movieForm.controls.description.setErrors(null);
        this.movieForm.controls.releaseDate.setErrors(null);
        this.movieForm.controls.length.setErrors(null);
        this.selectedCategories = [];
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
    this.directorDiv = true;
    this.movieDiv = false;
    this.imagesDiv = false;
  }

  movieDisplay() {
    this.directorDiv = false;
    this.movieDiv = true;
    this.imagesDiv = false;
  }

  imageDisplay() {
    this.directorDiv = false;
    this.movieDiv = false;
    this.imagesDiv = true;
  }
}
