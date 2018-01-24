import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-box-selector',
  templateUrl: './box-selector.component.html',
  styles: [`
  div {
    cursor: pointer;
  }
  .selected {
    color: red;
  }
  `],
})
export class BoxSelectorComponent implements OnInit {

  @Input() currentMailBox: string;
  @Output() currentMailBoxChange = new EventEmitter();

  changeMailBox(val) {
    this.currentMailBoxChange.emit(val);
  }

  constructor() { }

  ngOnInit() {
    this.currentMailBox = 'in';
  }

}
