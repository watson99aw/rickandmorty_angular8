import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { Character } from '@app/shared/components/interfaces/character.interface';

@Component({
    selector:'app-character',
    template:`
    <div class="row justify-content-center">
    <div class="col-12 col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <h4>{{ character.name | slice: 0:15 }}</h4>
            <h6 class="text-muted">{{ character.gender }}</h6>
            <p class="text-muted">{{ character.created | date }}</p>
          </div>
          <div class="card-img-top mb-3">
            <img [src]="character.image" [alt]="character.name" class="img-fluid" />
          </div>
          <div class="card-text">
            <p>{{ character.status }}</p>
            <p>{{ character.species }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class CharacterComponent {
    @Input() character: Character;
}