import { useEffect, useState } from 'react';
import { Button } from '.././components/Button';

import { api } from '.././services/api';

import '.././styles/sidebar.scss';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ISidebarProps {
  sideHandleClickButton(genreId:number):void
  sideSelectedGenreId:number
}

export function SideBar({sideHandleClickButton, sideSelectedGenreId}:ISidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);  

  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => sideHandleClickButton(genre.id)}
            selected={sideSelectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}