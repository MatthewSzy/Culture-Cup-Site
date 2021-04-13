import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectorService } from 'src/app/_services/director.service';
import { MovieService } from 'src/app/_services/movie.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  directorForm!: FormGroup;
  movieForm!: FormGroup;
  directorDiv: boolean = true;
  movieDiv: boolean = false;
  imagesDiv: boolean = false;

  isLoggedIn!: boolean;

  addDirectorCorrectResponse = "";
  addDirectorErrorResposne = "";

  invalidDirectorFirstName = "Proszę podać imię reżysera!";
  invalidDirectorSecondName = "Proszę podać nazwisko reżysera!";
  invalidDirectorNationality = "Proszę podać narodowość reżysera!";

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
      secondName: ['', Validators.required],
      nationality: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if (this.isLoggedIn) {}
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }
  }

  get df() { return this.directorForm.controls; }

  addDirector() {
    if (this.directorForm.invalid) { return; }
    this.clearDirector();

    this.directorService.addDirector(this.df.firstName.value, this.df.secondName.value, this.df.nationality.value).subscribe(
      response => {
        this.addDirectorCorrectResponse = "Dodano nowego reżysera: " + this.df.firstName.value + " " + this.df.secondName.value;
        this.df.firstName.setValue('');
        this.df.secondName.setValue('');
        this.df.nationality.setValue('');
      },
      error => {
        this.addDirectorErrorResposne = error.error.message;
      }
    )
  }

  clearDirector() {
    this.addDirectorCorrectResponse = "";
    this.addDirectorErrorResposne = "";
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
