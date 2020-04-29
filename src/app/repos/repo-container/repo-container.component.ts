import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state/repo.reducer';
import { Observable } from 'rxjs';
import { Repo } from '../repo';
import { initializeRepos, setCurrentRepo } from '../state/repo.actions';
import { selectCurrentRepo, selectRepos, selectReposError } from '../state';

@Component({
  selector: 'app-repo-container',
  templateUrl: './repo-container.component.html',
  styleUrls: ['./repo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoContainerComponent implements OnInit {

  repos$: Observable<Repo[]>;
  currentRepo$: Observable<Repo>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(initializeRepos());
    this.repos$ = this.store.pipe(select(selectRepos));
    this.currentRepo$ = this.store.pipe(select(selectCurrentRepo));
    this.errorMessage$ = this.store.pipe(select(selectReposError));
  }

  public onRepoSelected(repo: Repo): void {
    this.store.dispatch(setCurrentRepo(repo));
  }
}
