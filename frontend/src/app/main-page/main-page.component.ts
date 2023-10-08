import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../config';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  url = URL;
  proof: any;
  verification: any;
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  //Verifier will be generated and set up as soon as this component is initialised
  ngOnInit() {
  }

  /*
    This method hits the following APIs:-
    1. Compute witness and generate proof :- The witness here is the ID for which the ZKP proof is generated and returned back to frontend
    2. Verify the proof generated, using the verifier that was generated and deployed to blockchain initially
  */
  generateProof(id: string) {
    let body = {
      bio_info : id
    }

    this.httpClient.post(`${this.url}/verify`, body).subscribe({
      next: (resp) => {
        console.log(resp);
        this.verification = resp;
        //Checking verification response(whether the proof is verified or not)
        if (this.verification['Verification Result'] == "Success") {
          this.router.navigate(['/user-authorised']);
        } else {
          this.router.navigate(['/invalid-did']);
        }
      }
    });
  }
} 