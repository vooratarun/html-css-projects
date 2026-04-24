import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isNavbarBlack$ = this.scrollService.isNavbarBlack$;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {}
}

