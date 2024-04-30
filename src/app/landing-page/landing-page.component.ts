import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  name: string = "Anthony Planisek"
  nameLetters: { letter: string, x:number, y: number }[];

  private isDragging: boolean = false;
  private dragIndex: number = -1;
  private offsetX: number = 0;
  private offsetY: number = 0;

  constructor() {
    this.nameLetters = this.name.split('').map(letter => ({ letter, x: 0, y: 0 }))
  }

  startDrag(event: MouseEvent, index: number) {
    this.isDragging = true;
    this.dragIndex = index;
    this.offsetX = event.clientX - this.nameLetters[index].x;
    this.offsetY = event.clientY - this.nameLetters[index].y;
  }

  stopDrag(event: MouseEvent, index: number) {
    this.isDragging = false;
    this.dragIndex = -1;
  }

  onDrag(event: MouseEvent) {
    if (this.isDragging && this.dragIndex !== -1) {
      this.nameLetters[this.dragIndex].x = event.clientX - this.offsetX;
      this.nameLetters[this.dragIndex].y = event.clientY - this.offsetY;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.stopDrag(event, this.dragIndex);
  }


}
