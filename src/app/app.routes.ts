import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
    { path: 'projects', loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent) },
    { path: 'experience', loadComponent: () => import('./experience/experience.component').then(m => m.ExperienceComponent) },
    { path: 'contact-me', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
    { path: '**', loadComponent: () => import('./not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent) }
];
