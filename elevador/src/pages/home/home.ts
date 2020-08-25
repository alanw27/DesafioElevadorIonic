import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AlertController, AlertOptions } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public elevadores: FormGroup;
  public historicoElevador_1: Object = 
    {
      origem: 1,
      destino: null,
      final: null
    };
  public historicoElevador_2: Object = 
    {
      origem: 1,
      destino: null,
      final: null
    };

  constructor(fb: FormBuilder, public alertCrtl: AlertController) {
   
    this.elevadores = fb.group({
      elevador_1: new FormControl(null),
      elevador_2: new FormControl(null)
    })

  }

  public moverElevador = () => {
    const totalAndares: number = 15;

    if(this.elevadores.value.elevador_1 > totalAndares || this.elevadores.value.elevador_2 > totalAndares)
    {
      this.showAlert();
    }
    else
    {
      if(this.historicoElevador_1['final'] != null && this.historicoElevador_1['final'] != null)
      {
        this.historicoElevador_1['origem'] = this.historicoElevador_1['final'];
        this.historicoElevador_2['origem'] = this.historicoElevador_2['final'];
      }
      else
      {
        this.historicoElevador_1['origem'] = 1;
        this.historicoElevador_2['origem'] = 1;
      }

      this.historicoElevador_1['destino'] = this.elevadores.value.elevador_1;
      this.historicoElevador_2['destino'] = this.elevadores.value.elevador_2;
      
      let vetor_1: number = totalAndares - this.elevadores.value.elevador_1 ;
      let vetor_2: number = totalAndares - this.elevadores.value.elevador_2;

      if(vetor_1 < vetor_2)
      {
        this.historicoElevador_1['final'] = totalAndares;
        this.historicoElevador_2['final'] = 1;
      }
      else if (vetor_2 < vetor_1) 
      {
        this.historicoElevador_1['final'] = 1;
        this.historicoElevador_2['final'] = totalAndares;
      } 
      else
      {
        this.historicoElevador_1['final'] = 1;
        this.historicoElevador_2['final'] = totalAndares;
      }
    }
  }
  showAlert = () => {
    let alertOptions: AlertOptions = {
      title: "IMPORTANTE",
      subTitle: "O prédio só tem 15 andares. Digite um número até 15.",
      buttons: ["OK"]
    }

    let msgAlert = this.alertCrtl.create(alertOptions);
    msgAlert.present();
  }
}
