import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qrpage',
  templateUrl: './qrpage.component.html',
  styleUrls: ['./qrpage.component.css']
})
export class QrpageComponent implements OnInit {
  qrCodeImageUrl: string = ''; // Initialize the property

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  generateQRCode(): void {
    this.http.get('http://192.168.137.1:5000/generateQRCode', { responseType: 'blob' }).subscribe(response => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.qrCodeImageUrl = reader.result as string; // Set qrCodeImageUrl
      };
      reader.readAsDataURL(response);
    });
  }
  
}
