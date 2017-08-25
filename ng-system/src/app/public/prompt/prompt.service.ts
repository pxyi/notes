import { Injectable } from '@angular/core';

@Injectable()
export class PromptService {

  constructor() { }

  isShow: boolean = false;

  promptText: string;

  promptCallback;

  show(text: string, callback = () => {}): void {
  	this.isShow = true;
  	this.promptText = text || '';
  	this.promptCallback = callback;
  }

  hide(): void {
  	this.isShow = false;
  	this.promptCallback();
  	this.promptCallback = undefined;
  }


}
