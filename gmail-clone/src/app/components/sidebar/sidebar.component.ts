import { Component, Input } from '@angular/core';
import { SidebarItem } from '../../models';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() sidebarItems: SidebarItem[] = [];
}

