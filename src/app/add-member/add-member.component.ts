import { Component } from '@angular/core';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html'
})
export class AddMemberComponent {
  name: string = '';
  email: string = '';

  constructor(private memberService: MemberService) { }

  addMember() {
    this.memberService.addMember(this.name)
      .subscribe(
        data => {
          console.log('Member added:', data);
          alert('Member added successfully!');
          this.name = '';
          this.email = '';
        },
        error => {
          console.error('Error:', error);
          alert('Error adding member!');
        }
      );
  }
}
