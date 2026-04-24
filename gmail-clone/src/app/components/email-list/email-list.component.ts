import { Component, Input } from '@angular/core';
import { EmailRow, SectionItem } from '../../models';

@Component({
  selector: 'app-email-list',
  imports: [],
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.css'
})
export class EmailListComponent {
  @Input() sectionItems: SectionItem[] = [];
  @Input() emailRows: EmailRow[] = [];
}

