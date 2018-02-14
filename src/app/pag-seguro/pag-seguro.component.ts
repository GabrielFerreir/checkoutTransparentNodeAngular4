import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PagSeguroService} from './pag-seguro.service';

@Component({
  selector: 'app-pag-seguro',
  templateUrl: './pag-seguro.component.html',
  styleUrls: ['./pag-seguro.component.scss']
})
export class PagSeguroComponent implements OnInit, AfterViewInit {
  info;

  constructor(public pagSeguroService: PagSeguroService) {
    this.info = {};
  }

  ngOnInit() {

  }
  ngAfterViewInit() {

  }

}
