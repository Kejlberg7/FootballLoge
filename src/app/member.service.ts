import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member, FootballTeam, Match } from '@prisma/client';
import { MemberWithMatches, TeamWithMatches } from './expandable-table/expandable-table.component';

@Injectable({
  providedIn: 'root'
})


export class MyService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addMember(name: string) {
    return this.http.post(`${this.baseUrl}/add-member`, { name });
  }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}/members`);
  }

  uploadFile(file: File): any {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getMemberTeams(memberId: number) {
    return this.http.get<{FootballTeamMember:{ footballTeam: FootballTeam}[]}>(`${this.baseUrl}/member-teams/${memberId}`);
  }

  getTeamMatchesPrMemeber(memberId: number) {
    return this.http.get<TeamWithMatches>(`${this.baseUrl}/member-teams-matches/${memberId}`);
  }

  syncronize() {
    return this.http.get(`${this.baseUrl}/fixtures`);
  }
}
