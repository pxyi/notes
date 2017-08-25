import { Component, OnInit } from '@angular/core';
import { PromptService } from './prompt.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  constructor(public promptService: PromptService) { }

  ngOnInit() {
  }

}
