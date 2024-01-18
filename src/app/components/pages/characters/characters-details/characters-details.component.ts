import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Character } from '@app/shared/components/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent {
    character$ : Observable<Character>;

    constructor(private route: ActivatedRoute, private characterSvc: CharacterService, private location: Location) {
    
    }

    ngOnInit(): void {
        this.route.params.pipe(take(1)).subscribe(params => {
          const id = params['id'];
          this.character$ = this.characterSvc.getDetails(id);
        });
    }

    onGoBack(): void {
      this.location.back();
    }
}
