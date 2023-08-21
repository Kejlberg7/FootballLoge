import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  fileToUpload: File | null = null;
  message: string | null = null;

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (!this.fileToUpload) {
      this.message = "Please select a file.";
      return;
    }

    // Now, upload the file using your service
    // For demonstration, we'll just show a success message
    this.message = "File uploaded successfully!";
    // Reset the file
    this.fileToUpload = null;
  }
}
