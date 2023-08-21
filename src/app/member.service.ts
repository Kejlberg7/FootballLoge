import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '@prisma/client';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

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

    return this.http.post(`${this.baseUrl}/uploadFile`, formData);
  }
}
