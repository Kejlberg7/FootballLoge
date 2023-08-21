import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyService } from '../member.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  selectedFile: File | null = null;

  constructor(private memberService: MyService) { }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    try {
      const response = await this.memberService.uploadFile(this.selectedFile).toPromise();
      console.log('Upload response:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
