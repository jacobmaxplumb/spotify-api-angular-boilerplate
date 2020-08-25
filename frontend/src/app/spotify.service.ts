import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private accessToken: string;
  private refreshToken: string;

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public setRefreshToken(token: string) {
    this.refreshToken = token;
  }

  constructor(private http: HttpClient) { }

  getCodes(authCode: string): Observable<any> {
    return this.http.get(`${environment.api_url}/callback?code=${authCode}`);
  }

  getSearchResults() {
    return this.http.get(`https://api.spotify.com/v1/search?q=blues&type=album`, {headers: {Authorization: `Bearer ${this.accessToken}`}});
  }
}
