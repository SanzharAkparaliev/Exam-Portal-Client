import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports:[
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  declarations:[SignupComponent, HomeComponent,LoginComponent],
})
export class MaterialModule {};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
