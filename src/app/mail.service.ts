import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Postagem } from "./postagem";

@Injectable({
  providedIn: "root"
})
export class MailService {
  // Base url
  baseurl =
    "http://cipa.rf.gd/PHPMailer/examples/gmail.php";

  constructor(private http: HttpClient) {}




  // GET
  Notificar(postagem): Observable<any> {



    const params = new HttpParams()
    .set('body', postagem);


      // return this.http.post<any>(this.baseurl, postagem)
      //   .pipe(
      //     catchError(this.errorHandl)
      //   );

    // return this.http.post<any>(this.baseurl, { params }).subscribe(data => {
    //   // next: data => {},
    //   error: error => console.error('There was an error!', error)
    // });

    return this.http.get<any>(this.baseurl,  {params}).pipe(
      // return this.http.get<Postagem>('http://127.0.0.1:8080/').pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
