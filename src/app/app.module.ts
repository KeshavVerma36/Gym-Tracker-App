import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutPageComponent } from './workout-page/workout-page.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCommonModule } from '@angular/material/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    WorkoutPageComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
