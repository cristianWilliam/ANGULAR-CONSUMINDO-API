import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MusicService } from './services/music.service';
import { Music } from './models/music.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tutoriais';

  // musicas: Music[] = []
  musicas$ = new Observable<Music[]>();

  // form
  id = '';
  musica = 'eu sou uma musica';
  autor = '';

  constructor(private musicService: MusicService){
    this.obterMusicasCadastradas();
  }

  obterMusicasCadastradas(){
    // this.musicService.obterMusicas()
    //   .subscribe(musicas => this.musicas = musicas)

    this.musicas$ = this.musicService.obterMusicas();
  }

  buttonClick(){
    if (!this.musica || !this.autor)
      return;

    if (this.id) {
      this.atualizar();
      return;
    }

    this.musicService.cadastrarMusica({ author: this.autor, text: this.musica })
      .subscribe(_ => this.obterMusicasCadastradas())
  }

  atualizar(){
    this.musicService.editarMusica({ 
      id: parseInt(this.id), author: this.autor, text: this.musica })
    .subscribe(_ => this.obterMusicasCadastradas());
  }

  preencherCampos(musica: Music){
    this.id = musica.id!.toString();
    this.musica = musica.text;
    this.autor = musica.author;
  }

  remover(id: number){
    this.musicService.remover(id)
      .subscribe(_ => this.obterMusicasCadastradas());
  }
}
