import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';  // Adjust path
import { Member } from '@prisma/client';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(data => {
      this.members = data;
    });
  }

}
