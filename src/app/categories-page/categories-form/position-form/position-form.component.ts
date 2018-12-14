import { Component, OnInit, Input } from '@angular/core';
import { PositionService } from 'src/app/shared/services/positions.service';
import { Position } from '../../../shared/interfaces';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit {
   
  @Input('categoryId') categoryId: string;
  positions: Position[] = [];
  loading = false;

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });
  }

}
