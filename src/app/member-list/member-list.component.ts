import { Component, OnInit } from '@angular/core';
import { MyService } from '../member.service';  // Adjust path
import { Member, FootballTeam } from '@prisma/client';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];
  membersAndTeams: { member:string, team1:string, team2:string }[] = [];

  constructor(private memberService: MyService) { }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(data => {
      this.members = data;
      this.members.forEach(element => {
        this.memberService.getMemberTeams(element.id).subscribe(data => {
          this.membersAndTeams.push({member:element.name, team1:data.FootballTeamMember[0].footballTeam.name, team2:data.FootballTeamMember[1].footballTeam.name});
        });
      });
    });


  }

}
