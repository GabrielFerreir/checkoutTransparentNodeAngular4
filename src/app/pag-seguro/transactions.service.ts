import {Injectable} from '@angular/core';

@Injectable()
export class TransactionsService {
  payments;

  constructor() {
    this.payments = {};
  }

  Transactions() {
  }

  setDataUser(values) {
    this.payments.sender = {
      hash: values.hash,
      ip: values.ip,
      email: 'c87947564495873875861@sandbox.pagseguro.com.br',
      phone: {
        areaCode: values.phone.areaCode,
        number: values.phone.number
      },
      bornDate: values.bornDate,
      documents: {
        document: {
          type: values.documents.document.type,
          value: values.documents.document.value
        }
      },
      name: values.name
    };
  }

  setDataBasics(values) {
    this.payments.mode = 'default';
    this.payments.currency = 'BRL';
    this.payments.notificationURL = 'https://sualoja.com.br/notifica.html';
    this.payments.receiverEmail = 'gabrielferrer@outlook.com.br';
    this.payments.reference = 'REF123';
    this.payments.extraAmount = '1.00';
    this.payments.method = 'boleto';
    this.payments.promoCode = 'PROMOCODE';
  }

  setDataItems(values) {
    this.payments.items = {
      item: [
        {
          id: 1,
          description: 'Products',
          amount: '10.00',
          quantity: 1
        }
      ]
  };
  }

  setDataShipping(values) {
    this.payments.shipping = {
      address: {
        street: 'Av. Pagseguro',
        number: 9999,
        complement: '2° Andar',
        district: 'Jardim Internet',
        city: 'Cidade Exemplo',
        state: 'SP',
        country: 'BRA',
        postalCode: 99999333
      },
      type: 1,
      cost: '1.00',
      addressRequired: true
    };
  }


}
