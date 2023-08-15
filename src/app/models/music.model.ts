export type Music = {
  id: number,
  author: string,
  text: string
}

export type MusicCadastrar = Omit<Music, 'id'>;