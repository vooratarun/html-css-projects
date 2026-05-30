import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Messenger</h2>
      <p>View and send messages to your friends.</p>
      
      <div class="data-box" *ngIf="pageData">
        <h3>💬 Data from Sidebar:</h3>
        <p><strong>Count:</strong> {{ pageData.count }}</p>
        <p><strong>Message:</strong> {{ pageData.message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 30px;
      background-color: white;
      border-radius: 15px;
      margin: 20px;
      box-shadow: 0 5px 7px -7px rgba(0, 0, 0, 0.75);
    }
    .data-box {
      margin-top: 20px;
      padding: 15px;
      background-color: #f0f2f5;
      border-radius: 10px;
      border-left: 4px solid #2e81f4;
    }
    .data-box h3 {
      margin: 0 0 10px 0;
      color: #2e81f4;
    }
    .data-box p {
      margin: 5px 0;
    }
  `]
})
export class MessengerComponent implements OnInit {
  pageData: any;

  constructor(private route: ActivatedRoute) {
    this.pageData = {
      count: this.route.snapshot.paramMap.get('count'),
      message: this.route.snapshot.queryParamMap.get('message')
    };
  }

  ngOnInit() {
    console.log('Messenger Page Data:', this.pageData);
  }
}


