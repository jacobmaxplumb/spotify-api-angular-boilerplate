import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontendboiler';

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('code')) {
      console.log(params.get('code'));
      console.log('hit me');
      this.spotifyService.getCodes(params.get('code')).subscribe(
        this.onGetCodesSuccess.bind(this),
        this.onGetCodesError.bind(this)
      );
    } else {
      window.location.href = 'http://localhost:8888/login';
    }
  }

  onGetCodesSuccess(codes: any): void {
    console.log('hit me')
    console.log(codes);
    localStorage.setItem('access_token', codes.access_token);
    this.spotifyService.setAccessToken(codes.access_token);
    this.spotifyService.setRefreshToken(codes.refresh_token);
  }

  onGetCodesError(error: Error) {
    console.log(error.message);
  }

  logStuff(): void {
    console.log(this.spotifyService.getAccessToken());
    console.log(this.spotifyService.getRefreshToken());
  }

  trySearchByCall() {
    this.spotifyService.getSearchResults().subscribe(res => console.log(res));
  }
}
