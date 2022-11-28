import { Component, Input, OnInit } from '@angular/core';
import { DataInput } from '../../auth/interfaces/components.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() dataInput!:DataInput[];
  constructor() { 
    console.log(this.dataInput)
  }

  ngOnInit(): void {
  }

}
