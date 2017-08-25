import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmService {

  constructor() { }


  isShow: boolean = false;

  confirmText: string;

  confirmCallback;

  show(text: string, callback = () => {}): void {
  	this.isShow = true;
  	this.confirmText = text || '';
  	this.confirmCallback = callback;
  }

  confirmTrue(): void{
  	this.isShow = false;
  	this.confirmCallback();
  }

}
