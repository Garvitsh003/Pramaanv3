import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { URL } from '../config';

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.css']
})
export class HomepageComponent {
  url = URL;
  disableVerification = false;
  didExists = false;
  response: any;
  constructor(private httpClient: HttpClient, private router: Router) {}

  //method to register user at the backend - generating and updating a biometric info - DID mapping
  register(id:string, bid: string) {
    let body = {
      id_info : id,
      bio_info : bid
    }

    this.httpClient.post(`${this.url}/register`, body).subscribe({
      next: (resp) => {
        console.log(resp);
        this.response = resp;
        this.disableVerification = false;
        if(this.response["DID already generated"]) {
          this.didExists = true;
        } else {
          this.didExists = false;
        }
      } 
    });

  }





}
