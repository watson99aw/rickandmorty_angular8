import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { take, filter } from 'rxjs/operators';
import { Character } from '@app/shared/components/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';


type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  characters: Character[] = [];

  info: RequestInfo = { next: null };

  showGoUpButton = false;
  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScrollDown():void{
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }

  onScrollTop():void{
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }


  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }


  
  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      console.log(params);
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length) {
          const { info, results } = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = [];
        }
      });
  }
}
