import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) {
  }

  public getRepos(): Observable<any> {
    return this.http.get('/api/user/repos');
  }

  public getRepoContributors(owner: string, repo: string): Observable<any> {
    return this.http.get(`/api/repos/${owner}/${repo}/contributors`);
  }
}
