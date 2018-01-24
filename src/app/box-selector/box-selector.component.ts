import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-box-selector',
  templateUrl: './box-selector.component.html',
  styles: [`
  div {
    cursor: pointer;
  }
  .active {
    background-color: #009;
    color: #fff;
  }

  .list-group {
    font-size: 14px;
  }
  `],
})
export class BoxSelectorComponent implements OnInit {

  public testUser = GlobalVariable.TEST_USER;

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
