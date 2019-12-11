import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Postagem } from "./postagem";

@Injectable({
  providedIn: "root"
})
export class MailService {
  // Base url
  baseurl =
    "http://cipa.rf.gd/PHPMailer/examples/gmail.php?body=";
  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "text/plain"
    })
  };

  // GET
  Notificar(postagem): Observable<Postagem> {
    return this.http.get<Postagem>(this.baseurl + postagem).pipe(
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
