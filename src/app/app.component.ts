import { Component } from "@angular/core";
import { Postagem } from "./postagem";
import { Observable } from "rxjs";
import { TelegramService } from "./telegram.service";
import { MailService } from './mail.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private telegram: TelegramService, private mail: MailService) {}

  title = "cipa-agora";
  submitted = false;
  telegramUrl =
    "https://api.telegram.org/bot1053975644:AAHSZS0GZBfwmLm4eQPNJaIQu9uWQ36ZQ6I/sendMessage?chat_id=-393327297&text=";

  model = new Postagem("", "", "", "");

  onSubmit() {
    this.submitted = true;
    console.log("foi submetido");
  }

  onClickSubmit(cadastro) {
    console.log(cadastro);

    if(!cadastro.mensagem || cadastro.mensagem=="" ){
      alert("A mensagem é obrigatória");
      return;
    }

    this.mailMessage(
      "Nova mensagem " + JSON.stringify(cadastro, null, " ")
    );

    this.telegramMessage(
      "Nova mensagem " + JSON.stringify(cadastro, null, " ")
    );
  }


  mailMessage(mensagem) {
    mensagem = encodeURI(mensagem);
    return this.mail.Notificar(mensagem).subscribe((data: {}) => {
      console.log(data);
      alert("Mensagem enviada com sucesso, em breve entraremos em contato")
    });
  }

  telegramMessage(mensagem) {
    mensagem = encodeURI(mensagem);
    const apiUrl = `${this.telegramUrl}${mensagem}`;
    return this.telegram.Notificar(mensagem).subscribe((data: {}) => {
      console.log(data);
      // alert("Mensagem enviada com sucesso, em breve entraremos em contato")
    });
  }
}
