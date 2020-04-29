import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Repo } from '../repo';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {

  @Input() repos: Repo[];
  @Input() currentRepo: Repo;
  @Input() errorMessage: string;
  @Output() repoSelected = new EventEmitter<Repo>();

  constructor() { }

  ngOnInit(): void {
  }

  public selectRepo(repo: Repo) {
    this.repoSelected.emit(repo);
  }
}
