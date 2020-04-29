import { Component, Input, OnInit } from '@angular/core';
import { Repo } from '../repo';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss']
})
export class RepoInfoComponent implements OnInit {

  @Input() currentRepo: Repo;

  constructor() { }

  ngOnInit(): void {
  }

}
