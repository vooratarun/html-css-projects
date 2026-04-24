import { Injectable } from '@angular/core';

export interface MovieRow {
  title: string;
  posters: string[];
  isLarge: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieRows: MovieRow[] = [
    {
      title: 'NETFLIX ORIGINALS',
      posters: [
        'assets/images/large-movie1.jpg',
        'assets/images/large-movie2.jpg',
        'assets/images/large-movie3.jpg',
        'assets/images/large-movie4.jpg',
        'assets/images/large-movie5.jpg',
        'assets/images/large-movie6.jpg',
        'assets/images/large-movie7.jpg',
        'assets/images/large-movie8.jpg'
      ],
      isLarge: true
    },
    {
      title: 'Trending Now',
      posters: [
        'assets/images/small-movie1.jpg',
        'assets/images/small-movie2.jpg',
        'assets/images/small-movie3.jpg',
        'assets/images/small-movie4.jpg',
        'assets/images/small-movie5.jpg',
        'assets/images/small-movie6.jpg',
        'assets/images/small-movie7.jpg',
        'assets/images/small-movie8.jpg'
      ],
      isLarge: false
    },
    {
      title: 'Top Rated',
      posters: [
        'assets/images/small-movie1.jpg',
        'assets/images/small-movie2.jpg',
        'assets/images/small-movie3.jpg',
        'assets/images/small-movie4.jpg',
        'assets/images/small-movie5.jpg',
        'assets/images/small-movie6.jpg',
        'assets/images/small-movie7.jpg',
        'assets/images/small-movie8.jpg'
      ],
      isLarge: false
    },
    {
      title: 'Action Movies',
      posters: [
        'assets/images/small-movie1.jpg',
        'assets/images/small-movie2.jpg',
        'assets/images/small-movie3.jpg',
        'assets/images/small-movie4.jpg',
        'assets/images/small-movie5.jpg',
        'assets/images/small-movie6.jpg',
        'assets/images/small-movie7.jpg',
        'assets/images/small-movie8.jpg'
      ],
      isLarge: false
    },
    {
      title: 'Comedy Movies',
      posters: [
        'assets/images/small-movie1.jpg',
        'assets/images/small-movie2.jpg',
        'assets/images/small-movie3.jpg',
        'assets/images/small-movie4.jpg',
        'assets/images/small-movie5.jpg',
        'assets/images/small-movie6.jpg',
        'assets/images/small-movie7.jpg',
        'assets/images/small-movie8.jpg'
      ],
      isLarge: false
    },
    {
      title: 'Horror Movies',
      posters: [
        'assets/images/small-movie1.jpg',
        'assets/images/small-movie2.jpg',
        'assets/images/small-movie3.jpg',
        'assets/images/small-movie4.jpg',
        'assets/images/small-movie5.jpg',
        'assets/images/small-movie6.jpg',
        'assets/images/small-movie7.jpg',
        'assets/images/small-movie8.jpg'
      ],
      isLarge: false
    },
    {
      title: 'Romance Movies',
      posters: [
        'assets/images/small-movie1.jpg',
        'assets/images/small-movie2.jpg',
        'assets/images/small-movie3.jpg',
        'assets/images/small-movie4.jpg',
        'assets/images/small-movie5.jpg',
        'assets/images/small-movie6.jpg',
        'assets/images/small-movie7.jpg',
        'assets/images/small-movie8.jpg'
      ],
      isLarge: false
    },
    {
      title: 'Documentaries',
      posters: [
        'assets/images/small-movie1.jpg',
        'assets/images/small-movie2.jpg',
        'assets/images/small-movie3.jpg',
        'assets/images/small-movie4.jpg',
        'assets/images/small-movie5.jpg',
        'assets/images/small-movie6.jpg',
        'assets/images/small-movie7.jpg',
        'assets/images/small-movie8.jpg'
      ],
      isLarge: false
    }
  ];

  getMovieRows(): MovieRow[] {
    return this.movieRows;
  }
}

