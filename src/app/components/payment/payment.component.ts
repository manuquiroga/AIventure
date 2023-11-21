import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  tarjetaForm: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) {
    this.tarjetaForm = this.fb.group({
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/),
        ],
      ],
      cardHolder: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)],
      ],
      cardExpiration: [
        '',
        [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)],
      ],
      cardCVV: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });

    //en el input de numero de tarjeta agrega un espacio cada 4 numeros
    this.tarjetaForm.get('cardNumber')?.valueChanges.subscribe((value) => {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      this.tarjetaForm
        .get('cardNumber')
        ?.setValue(formattedValue, { emitEvent: false });

      this.validateCardNumber(formattedValue);
    });

    //en el input de fecha de la tarjeta agrega una barra cada 2 numeros
    this.tarjetaForm.get('cardExpiration')?.valueChanges.subscribe((value) => {
      if (value.length === 2 && !value.includes('/')) {
        this.tarjetaForm.get('cardExpiration')?.setValue(value + '/');
      }
    });

    this.tarjetaForm.valueChanges.subscribe((values) => {
      this.updateCardView(values);
    });
  }

  //valida que el numero de tarjeta sea correcto
  validateCardNumber(cardNumber: string) {
    const card = cardNumber.replace(/\s/g, '');

    const isValid = this.luhnCheck(card);

    this.tarjetaForm
      .get('cardNumber')
      ?.setErrors(isValid ? null : { invalidCardNumber: true });
  }

  //en el display de la tarjeta muestra los datos ingresados
  updateCardView(values: any) {
    const cardNumberElement = document.querySelector(
      '.number-vl'
    ) as HTMLDivElement;
    const cardHolderElement = document.querySelector(
      '.name-vl'
    ) as HTMLDivElement;
    const cardExpirationElement = document.querySelector(
      '.expiration-vl'
    ) as HTMLDivElement;
    const cardCVVElement = document.querySelector('.cvv-vl') as HTMLDivElement;

    cardNumberElement.innerText = values.cardNumber || '1234 5678 9101 1121';
    cardHolderElement.innerText = values.cardHolder
      ? values.cardHolder.toUpperCase()
      : 'TOMAS CORSO';
    cardExpirationElement.innerText = values.cardExpiration || '02/40';
    cardCVVElement.innerText = values.cardCVV || '123';
  }

  @Input() actions!:number;
  @Input() price!:number;
  //algoritmo de luhn
  luhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let alternate = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  }

  private userSubscription: Subscription | undefined;
  previousActions!:number | undefined;
  async onSubmit() {
    console.log(this.tarjetaForm.value);
    if (this.tarjetaForm.valid) {
      this.userSubscription = this.auth.user$.subscribe((user) => {
        if(user){
          this.previousActions = user.historias;
        }
      });

      await this.auth.saveActionCount((this.actions + this.previousActions!));
      this.router.navigate(['/']);
    }
    else{
      alert('Tarjeta de crédito inválida');
    }
  }
}
