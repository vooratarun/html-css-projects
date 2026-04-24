import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { MovieRowComponent } from './components/movie-row/movie-row.component';
import { MovieService, MovieRow } from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BannerComponent, MovieRowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  movieRows: MovieRow[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieRows = this.movieService.getMovieRows();
  }
}

