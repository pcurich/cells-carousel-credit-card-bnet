import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles, } from '@cells-components/cells-lit-helpers/cells-lit-helpers.js';
import '@cells-components/cells-icon/cells-icon.js';import styles from './cells-carousel-credit-card-bnet-styles.js';
/**
This component ...

Example:

```html
<cells-carousel-credit-card-bnet></cells-carousel-credit-card-bnet>
```

##styling-doc

@customElement cells-carousel-credit-card-bnet
@polymer
@LitElement
@demo demo/index.html
*/
export class CellsCarouselCreditCardBnet extends LitElement {
  static get is() {
    return 'cells-carousel-credit-card-bnet';
  }

  static get properties() {
    return {
        height: { type:Number },
        widthItem: { type:Number },
        marginTopArrow: { type:Number },
        initialJustifyContent: { type:Number  },
        justifyContent: { type:Number, reflect:true },
        widthTotal: { type:String },
        btnArrow: { type:Number }, 
        data: { type:Array },
        elements: {type:Number},
        nSteps: {type:Number},
        speed: {type:Number},
        _pathImages: { type: String },
        _isMoving: { type: Boolean },
    };
}

constructor() {
    super();
    this.marginTopArrow = '150px';
    this.btnArrow = '40px';
    this.height = 280;  
    this.widthItem = 200; 
    this.justifyContent = 10
    this.initialJustifyContent = this.justifyContent
    this.nSteps = 0;
    this.speed = 5;
    this._pathImages = this._getComponentPath('resources/images/subcategories/');
    this._isMoving = false;
}

_getComponentPath(path) {
    return window.AppConfig ? './' + path : '../' + path;
} 

static get shadyStyles() {
    return `
    ${styles.cssText}
    ${getComponentSharedStyles('cells-card-carousel-bnet-shared-styles').cssText}
    `;
}

resize(){ 
    let carouselList = this.shadowRoot.querySelector('.carousel__list');
    let widthParent = carouselList.offsetWidth; 
    this.elements = parseInt(widthParent/(this.widthItem + this.initialJustifyContent));
    let offSet = widthParent - this.widthItem*this.elements;
    this.justifyContent = offSet/(this.elements+1);
    this.shadowRoot.querySelector('.carousel__list').style.left = '0px';
    this.nSteps = 0;
}

toPrev(e) {
  debugger 
  if(this._isMoving === false){
    this.nSteps = this.nSteps - 1; 
    if (this.nSteps >= 0){ 
      this.move(1);
    }else{
      this.nSteps = 0;
    } 
  }
}

toNext(e) {
  debugger 
  if(this._isMoving === false){
    this.nSteps = this.nSteps + 1; 
    if (this.nSteps <= Math.ceil((this.data.length/this.elements))){ 
      this.move(-1);
    }else{
      this.nSteps = this.nSteps - 1;
    }
  }
    
}

move(direction){
  let carouselList = this.shadowRoot.querySelector('.carousel__list');
  let left = carouselList.style.left.replace('px','') * 1; 
  let right = parseInt((this.justifyContent + this.widthItem)*this.elements);
  // this.shadowRoot.querySelector('.carousel-count').value = this.nSteps;
  // this.shadowRoot.querySelector('.carousel-total').value = right;
  // this.shadowRoot.querySelector('.carousel-data').value = this.data.length;
  // this.shadowRoot.querySelector('.carousel-elements').value = this.elements;
  // this.shadowRoot.querySelector('.carousel-steps').value = Math.ceil(this.data.length/this.elements);
  // this.shadowRoot.querySelector('.carousel-moving').value = this._isMoving;
  this.animation(left ,right, this.speed*direction);
}

animation(from, to , offSet){
this._isMoving = true;
let elem = this.shadowRoot.querySelector('.carousel__list');
let pos = from; 
let start = 0;
let id = setInterval(()=> {
  pos = pos+offSet;
  elem.style.left = pos + 'px';
  start = start + offSet 
    if (Math.abs(start) >= Math.abs(to)) {
      elem.style.left = pos + 'px';
      this._isMoving = false; 
      clearInterval(id); 
    }
}, 0); 
}


setSelectedCategory(categoryId) {
const target = this.shadowRoot.querySelector('#cat' + categoryId);
if (target !== null) {
    this.selectedCategory({ target });
}   
}

selectedCategory(e) {
let parent = this.shadowRoot.querySelector('.carousel__list');
let children = Array.prototype.slice.call(parent.children);

//cleaning
children.forEach(element => { element.setAttribute('class','carousel__item')}) 
parent = this.shadowRoot.querySelectorAll(".active")
parent.forEach(element => { element.setAttribute('class','no-active push-right')})

let target = e.target;
let code = '';
while(target.getAttribute('class') != 'carousel__item') { 
  target = target.parentNode;
  if(code == '' && target.getAttribute('data-id'))
  {
    code = target.getAttribute('data-id');
  }
}

//set selected
target.setAttribute('class','carousel__item carousel__item-hover');

//get category
let category = this.data.find(function(element) {
  return element.code === code;
}); 

var icon = this.shadowRoot.querySelector("#icon"+code);
icon.setAttribute('class','active push-right');

let raiseEvent = new CustomEvent('cells-card-carousel-bnet-selected', 
{
  detail: category,
  bubbles: true,
  composed: true
});

this.dispatchEvent(raiseEvent);
}

_element(){
return html`
  <div  class="carousel__list" >
    ${
      this.data.map((v,i)=> html`
      <div data-id="${v.code}" id="cat${v.code}" class="carousel__item cursor" style='width:${this.widthItem+"px"}; margin:10px ${this.justifyContent+"px"} 10px ${i==0? this.justifyContent+"px":"0px"};' @click=${this.selectedCategory} >
        <div class="flex-container box" >
        
          <div id="icon${v.code}" class='${v.selected? "active": "no-active"} push-right'>
            <cells-icon
              id="icon"
              icon="coronita:correct"
              size="18" >
            </cells-icon>
          </div> 

          <div class="sections">
            <div class="section-information">
              <div class="title">${v.title} + ${i}</div>
              <div class="sub-title">${v.number}</div>
            </div>

            <div class="section-image"> 
              <img src="${v.cardPhoto}"/>
            </div>
        
            <div class="section-information">
              <div class="sub-title">${v.titleLine}</div>
              <div class="title">${v.creditLine}</div>		
            </div>
          </div>

        </div>
      </div>
    `)}
  </div>`
}

render() {
return html`
    <style>${this.constructor.shadyStyles}</style>

    <!-- Ancho<input class="carousel-total" type="text" style="display:none;"/><br>
    posicion<input class="carousel-count" type="text" style="display:none;"/><br> 
    Elmentos<input class="carousel-elements" type="text" style="display:none;"/><br> 
    Data<input class="carousel-data" type="text" style="display:none;"/><br> 
    total<input class="carousel-steps" type="text" style="display:none;"/><br> 
    Se mueve<input class="carousel-moving" type="text" style="display:none;"/><br>  -->
    
    <div class="carousel">
        <div class="carousel__nav">
            <button class="box-nav" style='height:${this.btnArrow};width:${this.btnArrow};  margin-top:${this.marginTopArrow};'  @click=${this.toPrev} data-dir="prev">&lt;</button>
        </div>
        <div class="carousel__container" style="height:${this.height+'px'}; background-color:#F6F9FF; width: 100%;"  > 
          ${this._element()}
        </div>
        <div class="carousel__nav">
            <button class="box-nav" style='height:${this.btnArrow};width:${this.btnArrow};  margin-top:${this.marginTopArrow};'  @click=${this.toNext} data-dir="next">&gt;</button>
        </div>
    </div>
`;
}
}

// Register the element with the browser
customElements.define(CellsCarouselCreditCardBnet.is, CellsCarouselCreditCardBnet);
