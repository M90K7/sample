import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  compactMode = false;
  @Output() compactModeChange = new EventEmitter<boolean>();

  toggleCompact() {
    this.compactMode = !this.compactMode;
    this.compactModeChange.emit(this.compactMode);
  }

}
