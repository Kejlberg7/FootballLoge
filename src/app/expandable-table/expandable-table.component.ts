import { Component } from '@angular/core';
import { MyService } from '../member.service';
import { FootballTeam, Match, Member } from '@prisma/client';

export type MemberWithMatches = {
  member: Member;
} & TeamWithMatches;

export type TeamWithMatches = {
  teams: {
    team: {
      name: string;
    };
    matches: Match[];
  }[];
  wins: number;
  losses: number;
  draws: number;
  totalOwed: number;
}

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.css']
})
export class ExpandableTableComponent {
  // Mock data for demonstration

  constructor(private memberService: MyService) { }

  memberWithMatches: MemberWithMatches[]= [];
  members: Member[] = [];

  expandedMember: MemberWithMatches | null = null;

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(data => {
      this.members = data;
      this.members.forEach(element => {
        this.memberService.getTeamMatchesPrMemeber(element.id).subscribe(data => {
          this.memberWithMatches.push({member:element, teams:data.teams.map( team => {return {team:team.team, matches:team.matches } }), wins: data.wins, losses: data.losses, draws: data.draws, totalOwed: data.totalOwed });
        });
      });
    });
  }


  toggleExpand(summary: MemberWithMatches): void {
    if (this.expandedMember === summary) {
      this.expandedMember = null;
    } else {
      this.expandedMember = summary;
    }
  }
}
