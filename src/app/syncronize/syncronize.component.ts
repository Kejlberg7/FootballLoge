import { Component } from '@angular/core';
import { MyService } from '../member.service';

@Component({
  selector: 'app-syncronize',
  templateUrl: './syncronize.component.html',
  styleUrls: ['./syncronize.component.css']
})
export class SyncronizeComponent {

  constructor(private syncService: MyService) { }

  onButtonClick(): void {
    this.syncService.syncronize().subscribe(data => {
      console.log(data);
    }
    );
  }
}
