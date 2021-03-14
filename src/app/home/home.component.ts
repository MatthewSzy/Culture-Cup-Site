import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagesSetOne: string[] = [
    "assets/images/joker.jpg",
    "assets/images/doctorstrange.jpg"
  ];

  imagesSetTwo: string[] = [
    "assets/images/godofwar.jpg",
    "assets/images/starwars.jpg"
  ];

  constructor() {}

  ngOnInit(): void {

  }
}