import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './marca/marca.component';
import { TipoComponent } from './tipo/tipo.component';
import { CocheComponent } from './coche/coche.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:'home'
    },
    {
        path:'marca',
        component:MarcaComponent,
        title:'marca'
    },
    {
        path:'tipo',
        component:TipoComponent,
        title:'tipo'
    },
    {
        path:'coche',
        component:CocheComponent,
        title:'coche'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
