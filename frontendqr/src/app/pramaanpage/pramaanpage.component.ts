import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { URL } from '../config';

@Component({
  selector: 'app-homepage',
  templateUrl: './pramaanpage.component.html',
  styleUrls: ['./pramaanpage.component.css']
})
export class PramaanpageComponent {
    url = URL;
    disableVerification = false;
    didExists = false;
    response: any;
    constructor(private httpClient: HttpClient, private router: Router) {}
    register() {
        this.router.navigate(['/register']);
      }
    verification() {
        this.router.navigate(['/user-verification']);
      }
}  
