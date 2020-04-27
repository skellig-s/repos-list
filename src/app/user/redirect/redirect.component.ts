import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    window.opener.postMessage(this.route.snapshot.data.access_token);
  }

}
