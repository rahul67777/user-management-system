import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [AppModule, ServerModule, MatButtonModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
