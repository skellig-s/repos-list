import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Repo } from '../repo';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss']
})
export class RepoInfoComponent implements OnInit {

  @Input() currentRepo: Repo;
  @Output() closeInfo = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onCloseInfo(): void {
    this.closeInfo.emit();
  }

}
