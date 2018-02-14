import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {createElement} from '@angular/core/src/view/element';
import {TransactionsService} from "./transactions.service";

declare var PagSeguroDirectPayment: any;

@Injectable()
export class PagSeguroService {
  info: any;

  selectParcelas = [];

  constructor(private http: Http,
              private transactionsService: TransactionsService) {
    this.info = {};
    this.loadScriptPagSeguro().then(() => {
      this.getTokken().subscribe((res) => {
        const tokken = res.session.id[0];
        console.log(tokken);
        PagSeguroDirectPayment.setSessionId(tokken);
        PagSeguroDirectPayment.getPaymentMethods({
          amount: 1,
          success: (response) => {
            console.log(response);
          },
          error: (response) => {
            console.log(response);
          },
          complete: (response) => {
          }
        });
      }, error => {
        console.error(error);
      });
    });
  }

  getTokken() {
    const url = 'http://192.168.1.4:3000/pagSeguro/sessions';
    return this.http.post(url, null)
      .map(res => res.json())
  }

  loadScriptPagSeguro() {
    return new Promise((resolve) => {
      const script: HTMLScriptElement = document.createElement('script');
      script.addEventListener('load', r => resolve());
      script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
      document.head.appendChild(script);
    });
  }

  getBrand(input) {
    console.log(input.value);
    PagSeguroDirectPayment.getBrand({
      cardBin: input.value,
      success: (response) => {
        console.log(response);
        this.info.brand = response.brand.name;
        console.log(this.info.brand);
      }, error: (response) => {
        console.log(response);
      }, complete: (response) => {
        // console.log(response);
        console.log('Concluido');
      }
    });
  }

  createCardToken(dados) {
    // console.log(dados);
    PagSeguroDirectPayment.createCardToken({
      cardNumber: dados.cardNumber,
      brand: this.info.brand,
      cvv: dados.codeSecurityCard,
      expirationMonth: dados.valideMonthCard,
      expirationYear: dados.numberYearCard,
      success: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      },
      complete: (response) => {
        console.log('Concluido');
      }
    });
  }

  getInstallments(value) {
    let result = {};
    PagSeguroDirectPayment.getInstallments({
      amount: value,
      maxInstallmentNoInterest: 3,
      brand: this.info.brand,
      success: (response) => {
        console.log(response);
        result = response.installments[Object.keys(response.installments)[0]];
        console.log(result);
        for (let i = 0; i < result['length']; i++) {
          const parcela = {
            id: i + 1,
            nome: `${result[i].quantity}x de R$ ${result[i].installmentAmount.toString().replace('.', ',')}`
          };
          this.selectParcelas.push(parcela);
        }
      },
      error: (response) => {
        console.log(response);
      },
      complete: (response) => {
        console.log('Concluido');
      }
    });
  }

  getDadosFromBuy() {
    const infoBuyer = {
      hash: PagSeguroDirectPayment.getSenderHash(),
      ip: '1.1.1.1',
      email: 'comprador@uol.com.br',
      phone: {
        areaCode: 99,
        number: 99999999
      },
      bornDate: '08/07/1999',
      documents: {
        document: {
          type: 'CPF',
          value: 46690669866
        }
      },
      name: 'Usuario Teste'
    }

    const myData = {
      myEmail: 'gabrielferrer@outlook.com.br'
    };
    const products = {
      camiseta: {
        id: '0001',
        description: 'Camiseta confortavel',
        amound: 50.00,
        quantity: 1
      }
    }
    // console.log(myData);
    // console.log(infoBuyer);
    // let payment = {
    //   mode: 'default',
    //   currency: 'BRL',
    //   notificationURL: 'https://sualoja.com.br/notifica.html',
    //   receiverEmail: myData.myEmail,
    //   sender: {
    //     hash: infoBuyer.hash,
    //     ip: '1.1.1.1',
    //     email: infoBuyer.email,
    //     phone: {
    //       areaCode: infoBuyer.phone.areaCode,
    //       number: infoBuyer.phone.number
    //     },
    //     bornDate: infoBuyer.bornDate,
    //     document: {
    //       type: 'CPF',
    //       value: infoBuyer.document.value
    //     },
    //     name: infoBuyer.name,
    //   },
    //   items: [
    //     {
    //       id: products.camiseta.id,
    //       description: products.camiseta.description,
    //       amount: products.camiseta.amound,
    //       quantity: products.camiseta.quantity
    //     }
    //   ],
    // }
    this.transactionsService.setDataUser(infoBuyer);
    this.transactionsService.setDataBasics(null);
    this.transactionsService.setDataItems(null);
    this.transactionsService.setDataShipping(null);
    this.sendBuy(this.transactionsService.payments).subscribe((res) => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  sendBuy(obj) {
    const url = 'http://192.168.1.4:3000/pagSeguro/transactions';
    return this.http.post(url, obj)
      .map(res => res.json());
  }

  parseXml(string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(string, 'text/xml');
    return xml;
  }
}
