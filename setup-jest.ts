import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

jest.mock('./src/app/home/home.component.html', () => '');
jest.mock('./src/app/home/home.component.css', () => '');

setupZoneTestEnv();