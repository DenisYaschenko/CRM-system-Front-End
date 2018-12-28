import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionService } from 'src/app/shared/services/positions.service';
import { Observable } from 'rxjs';
import { Position } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  @ViewChild('input') input: ElementRef;

  positions$: Observable <Position[]>
  validNumber: boolean = false;

    constructor(private route: ActivatedRoute,
      private positionsService: PositionService,
      private order: OrderService) {}

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(switchMap(
        (params: Params) => {
          return this.positionsService.fetch(params['id'])
        }
      ),
        map(
          (positions: Position[]) => {
            return positions.map(position => {
              position.quantity = 1;
              return position;
            })
          }
        ))
  }

  someChanges($event) {
    this.validNumber = $event > 0 ? false : true;

  }

  addToOrder(position: Position) {
    
    this.order.add(position);
  }

}
