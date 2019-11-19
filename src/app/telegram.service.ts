import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Postagem } from "./postagem";

@Injectable({
  providedIn: "root"
})
export class TelegramService {
  // Base url
  baseurl =
    "https://api.telegram.org/bot1053975644:AAHSZS0GZBfwmLm4eQPNJaIQu9uWQ36ZQ6I/sendMessage?chat_id=-393327297&text=";
  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
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
