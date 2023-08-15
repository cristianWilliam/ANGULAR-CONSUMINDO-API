import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { Music, MusicCadastrar } from "../models/music.model";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private url = `${environment.api}/musics`;

  constructor(private httpClient: HttpClient){
  }

  obterMusicas(){
    return this.httpClient.get<Music[]>(this.url);
  }

  cadastrarMusica(musica: MusicCadastrar){
    return this.httpClient.post<Music>(this.url, musica);
  }

  editarMusica(musica: Music){
    return this.httpClient.put<Music>(`${this.url}/${musica.id}`, musica);
  }

  remover(id: number){
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}