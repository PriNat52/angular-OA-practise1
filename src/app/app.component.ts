import {
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { debounceTime, delay, fromEvent, map } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  @ViewChild('input', { static: true })
  input!: ElementRef;
  value!: string
  array =[];

  ngOnInit() {
    
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(500),
      filter((_) => {
        const key = this.input.nativeElement.value.trim();
        this.array.push(key);
        return key;
      }),
      tap((_)=>{
        const key = this.input.nativeElement.value.trim();
        console.log(key);
      })
    ).subscribe();
  }

  onDel(i:any){
    for(let j=0;j<=this.array.length - 1; j++){
      if(this.array[j] === i){
        this.array.splice(j--, 1);
      }
    }
  }
}
