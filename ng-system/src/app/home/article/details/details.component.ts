import { PromptService } from './../../../public/prompt/prompt.service';
import { LoadingService } from './../../../public/loading/loading.service';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';
declare const editormd;
declare const $;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  /* 表单模型 */
  public formModel: FormGroup;
  private fb: FormBuilder = new FormBuilder();

  /* 文章Id */
  public id: string = 'new';
  public result: any;
  public classItems: string[] = [];

  /* markdown引用 */
  public editor: any;

  constructor(
    public http: HttpService,
    public fmBuilder: FormBuilder = new FormBuilder(),
    public routerInfo: ActivatedRoute,
    public promptService: PromptService
  ) { }

  ngOnInit() {
    /* 获取文章Id */
    this.routerInfo.params.subscribe( (params: Params) => this.id = params['id']);

    this.http.get('class/list', {}, (res) => {
      this.classItems = res.result;
      this.formModel.get('parent').setValue(this.classItems[0]['_id']);
    })
    
    this.formModel = this.fb.group({
      title: ['', [Validators.required]],
      keyword: [''],
      sort: [''],
      status: [true],
      parent: [''],
      desc: ['']
    });

    if(this.id === 'new'){
      this.init();
    }else{
      this.http.get('article/details', {id: this.id}, (res) => {
        this.result = res.result;
        this.init();
        this.formModel.get('title').setValue(this.result.title);
        this.formModel.get('keyword').setValue(this.result.keyword);
        this.formModel.get('sort').setValue(this.result.sort);
        this.formModel.get('parent').setValue(this.result.parent);
        this.formModel.get('status').setValue(this.result.status);
        this.formModel.get('desc').setValue(this.result.desc);
      })
    }

   
  }

  /* 初始化 */
  init(): void{
    this.editor = editormd("editormd", {
      width   : "100%",
      height  : 640,
      syncScrolling : "single",
      path    : "assets/js/lib/",
      saveHTMLToTextarea : true,
      flowChart : true,             // 开启流程图支持，默认关闭
      sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
      imageUpload : true,
      emoji: true,
      imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL : "/notes/upfile"
    });
  }

  /* 保存 */
  save(): void {
    if(this.formModel.invalid){return;}
    let params = this.formModel.value;
    params.id = this.id;
    params.markdown = this.editor.getMarkdown();
    params.content = $('.editormd-preview').html();
    this.http.loadingService.show = true;
    this.http.post('article/update', params, (res) => {
      this.promptService.show(res.message, () => {
        if(res.code == 1000){
          this.http.router.navigateByUrl('/home/list');
        }
      })
    });
  }

}
