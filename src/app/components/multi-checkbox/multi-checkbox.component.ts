import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckItem} from "../../_types";


@Component({
  selector: 'app-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.scss']
})
export class MultiCheckboxComponent implements OnInit {
  @Input() items: CheckItem = {
    name: 'Main label',
    selected: false,
    value: 'main_label_value',
    children: [
      {name: 'First child', selected: false, value: 'first_child_value'},
      {name: 'Second child', selected: false, value: 'second_child_value'},
    ],
  };
  @Output() itemsChange = new EventEmitter<CheckItem>()

  allSelected: boolean = false;

  updateAllSelected() {
    this.allSelected = this.items.children != null && this.items.children.every(t => t.selected);
    this.items.selected = this.allSelected
    this.itemsChange.emit(this.items)
  }

  someSelected(): boolean {
    if (this.items.children == null) {
      return false;
    }
    return this.items.children.filter(t => t.selected).length > 0 && !this.allSelected;
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    this.items.selected = this.allSelected
    this.itemsChange.emit(this.items)
    if (this.items.children == null) {
      return;
    }
    this.items.children.forEach(t => (t.selected = selected));
  }

  ngOnInit(): void {
    this.updateAllSelected()
  }
}
