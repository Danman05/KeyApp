import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

    // API url 
  private endpoint: string = 'http://localhost:3000/images';
  // Returns an observable 
  upload(file: File[]):Observable<any> { 
  
      // Create form data 
      const formData = new FormData();  
        
      // Store form name as "file" with file data 
    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i]);
    }        
      // Make http post request over api 
      // with formData as req 
      return this.http.post(`${this.endpoint}/upload`, formData) 
    }
}
