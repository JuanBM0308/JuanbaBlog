import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { NewsService } from '../services/news.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let newsServiceMock: jest.Mocked<NewsService>;

  beforeEach(async () => {
    const newsServiceSpy = {
      getNews: jest.fn()
    } as unknown as jest.Mocked<NewsService>;
  
    await TestBed.configureTestingModule({
      imports: [CommonModule, HomeComponent, provideHttpClientTesting],
      providers: [{ provide: NewsService, useValue: newsServiceSpy }]
    }).compileComponents();
  
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    newsServiceMock = TestBed.inject(NewsService) as jest.Mocked<NewsService>;
  });
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadNews on ngOnInit', () => {
    const loadNewsSpy = jest.spyOn(component, 'loadNews');
    component.ngOnInit();
    expect(loadNewsSpy).toHaveBeenCalled();
  });

  it('should populate news array when getNews returns data', () => {
    const mockNews = { articles: [{ title: 'Test News' }] };
    newsServiceMock.getNews.mockReturnValue(of(mockNews));

    component.loadNews();

    expect(component.news.length).toBe(1);
    expect(component.news[0].title).toBe('Test News');
  });

  it('should handle error when getNews fails', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    newsServiceMock.getNews.mockReturnValue(throwError(() => new Error('API error')));

    component.loadNews();

    expect(console.error).toHaveBeenCalledWith('Error loading news:', new Error('API error'));
  });

  it('should toggle liked property in holdColor', () => {
    component.news = [{ liked: false }];
    component.holdColor(0);
    expect(component.news[0].liked).toBe(true);
    component.holdColor(0);
    expect(component.news[0].liked).toBe(false);
  });
});

