import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateModule } from './template/template.module';

const routes: Routes = [
  {
    path: 'template',
    loadChildren: () => import('./template/template.module').then(m=>m.TemplateModule) //Carga perezosa de las rutas de template
  },
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.module').then(m=>m.ReactiveModule) //Carga perezosa de las rutas de reactive
  },
  {
    path: '**',
    redirectTo: 'template'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
