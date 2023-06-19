import { DataService } from './_helpers/data.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';

@NgModule({
    declarations: [
        AppComponent,
        AddUserComponent,
        ListUserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
