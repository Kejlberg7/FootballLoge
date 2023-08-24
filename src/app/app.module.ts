import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './member-list/member-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SyncronizeComponent } from './syncronize/syncronize.component';
import { ExpandableTableComponent } from './expandable-table/expandable-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    FileUploadComponent,
    SyncronizeComponent,
    ExpandableTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
