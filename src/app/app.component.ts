import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DomSanitizer } from '@angular/platform-browser';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

export interface Element {
  id: number;
  type: string;
  title: string;
  authorName: string;
  posterImage: Byte[];
  globalRating: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  elementCtrl = new FormControl();
  elementResponse!: Element[];
  elementData!: Observable<Element[]>;

  title = "Culture Cup";
  faSearch = faSearch;

  isLoggedIn!: boolean;
  id!: string;
  username!: string;
  profileImage: any;
  
  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id = user.id;
      this.username = user.username;
      this.getImage();
    }

    this.userService.searching().subscribe(
      response => {
        this.elementResponse = response;
        this.elementData = this.elementCtrl.valueChanges
          .pipe(
            startWith(''),
            map(element => element ? this.filterElement(element) : this.elementResponse.slice())
          )
      }
    )
  }

  filterElement(value: string): Element[] {
    const filterValue = value.toLowerCase();
    return this.elementResponse.filter(element => element.title.toLowerCase().indexOf(filterValue) === 0);
  }

  getImage() {
    this.userService.getImage(this.id).subscribe(
      response => {
        let bytes = 'data:image/jpeg;base64,' + response.profileImage;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(bytes);
      },
      error => {
        this.profileImage = undefined;
      }
    )
  }

  displayPoster(posterImage: any): any {
    let bytes = 'data:image/jpeg;base64,' + posterImage;
    return this.sanitizer.bypassSecurityTrustUrl(bytes);
  }

  resetValue(optVal: any, trigger: MatAutocompleteTrigger, auto: MatAutocomplete) {
      this.elementCtrl.reset('');
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
