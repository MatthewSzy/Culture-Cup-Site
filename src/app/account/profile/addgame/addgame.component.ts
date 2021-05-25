import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/_services/category.service';
import { DeveloperService } from 'src/app/_services/developer.service';
import { GameService } from 'src/app/_services/game.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {

  faTimes = faTimes;

  developers!: any;
  games!: any;
  categories!: any;

  selectedCategories = new Array();

  developerForm!: FormGroup;
  gameForm!: FormGroup;

  selectedPoster!: File;
  posterImage: any;
  selectedBackground!: File;
  backgroundImage: any;

  developerDiv: boolean = true;
  gameDiv: boolean = false;
  imagesDiv: boolean = false;
  gameIsSelected: boolean = false;
  selectedGameId!: string;

  isLoggedIn!: boolean;

  addDeveloperCorrectResponse = "";
  addDeveloperErrorResposne = "";

  invalidDeveloperName = "Proszę podać nazwę developera!";
  invalidDeveloperHeadquartersCity = "Proszę podać miasto gdzie znajduje się siedziba!";
  invalidDeveloperHeadquartersCountry = "Proszę podać kraj gdzie znajduje się siedziba!";
  invalidDeveloperFoundationYear = "Proszę podać datę założenia!";

  addGameCorrectResponse = "";
  addGameErrorResponse = "";

  invalidGameTitle = "Proszę podać tytuł gry!";
  invalidGameDeveloper = "Proszę wybrać producenta!";
  invalidGameDescription = "Proszę podać opis gry!";
  invalidGameReleaseDate = "Proszę podać datę premiery gry!";
  invalidGamePublisher = "Proszę podać wydawce gry!";

  addImagesCorrectResponse = "";
  addImagesErrorResponse = "";

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private developerService: DeveloperService,
    private categoryService: CategoryService
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.developerForm = this.formBuilder.group({
      developerName: ['', Validators.required],
      headquartersCity: ['', Validators.required],
      headquartersCountry: ['', Validators.required],
      foundationYear: ['', Validators.required]
    });

    this.gameForm = this.formBuilder.group({
      title: ['', Validators.required],
      developer: ['', Validators.required],
      description: ['', Validators.required],
      releaseDate: ['', Validators.required],
      publisher: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {}
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }

    this.developerService.getAll().subscribe(
      response => {
        this.developers = response;
      }
    )

    this.gameService.getAllTitles().subscribe(
      response => {
        this.games = response;
      }
    )

    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
      }
    )
  }

  get df() { return this.developerForm.controls; }
  get gf() { return this.gameForm.controls; }

  addDeveloper() {
    if (this.developerForm.invalid) { return; }
    this.clearDeveloper();

    this.developerService.addDeveloper(this.df.developerName.value, this.df.headquartersCity.value, this.df.headquartersCountry.value, this.df.foundationYear.value).subscribe(
      response => {
        this.addDeveloperCorrectResponse = response.message;
        this.developerForm.reset();
        this.df.developerName.setErrors(null);
        this.df.headquartersCity.setErrors(null);
        this.df.headquartersCountry.setErrors(null);
        this.df.foundationYear.setErrors(null);
        this.developerService.getAll().subscribe(
          response => {
            this.developers = response;
          }
        )
      },
      error => {
        this.addDeveloperErrorResposne = error.error.message;
      }
    )
  }

  addGame() {
    if (this.gameForm.invalid) { return; }
    this.clearGame();

    this.gameService.addGame(this.gf.developer.value.developerId, this.gf.title.value, this.gf.description.value, this.gf.releaseDate.value, this.gf.publisher.value, this.selectedCategories).subscribe(
      response => {
        this.addGameCorrectResponse = response.message;
        this.gameForm.reset();
        this.gf.developer.setErrors(null);
        this.gf.title.setErrors(null);
        this.gf.description.setErrors(null);
        this.gf.releaseDate.setErrors(null);
        this.gf.publisher.setErrors(null);
        this.selectedCategories = [];
        this.gameService.getAllTitles().subscribe(
          response => {
            this.games = response;
          }
        )
      },
      error => {
        this.addGameErrorResponse = error.error.message;
      }
    )
  }

  addImages(){
    if (!this.selectedPoster && !this.selectedBackground) {
      this.addImagesErrorResponse = "Proszę dodać oba zdjęcia!";
      return;
    }
    this.clearImages();

    this.gameService.addGameImages(this.selectedGameId, this.selectedPoster, this.selectedBackground).subscribe(
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

  gameSelection(event: any) {
    this.gameIsSelected = true;
    this.selectedGameId = event.gameId;
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

  clearDeveloper() {
    this.addDeveloperCorrectResponse = "";
    this.addDeveloperErrorResposne = "";
  }

  clearGame() {
    this.addGameCorrectResponse = "";
    this.addGameErrorResponse = "";
  }

  clearImages() {
    this.addImagesCorrectResponse = "";
    this.addImagesErrorResponse = "";
  }

  developerDisplay() {
    this.clearDeveloper();
    this.clearGame();
    this.clearImages();
    this.developerDiv = true;
    this.gameDiv = false;
    this.imagesDiv = false;
  }

  gameDisplay() {
    this.clearDeveloper();
    this.clearGame();
    this.clearImages();
    this.developerDiv = false;
    this.gameDiv = true;
    this.imagesDiv = false;
  }

  imageDisplay() {
    this.clearDeveloper();
    this.clearGame();
    this.clearImages();
    this.developerDiv = false;
    this.gameDiv = false;
    this.imagesDiv = true;
  }
}
