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
        widthTotal: { type:String },
        btnArrow: { type:Number },
        nDisplay: { type:Number },
        data: { type:Array },
        _pathImages: { type: String },
    };
}

constructor() {
    super();
    this.marginTopArrow = '100px';
    this.btnArrow = '34px';
    this.height = 280;  
    this.widthItem = 200;
    this.nDisplay = 3;
    this._pathImages = this._getComponentPath('resources/images/subcategories/');
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

toPrev(e) {
    let carouselList = this.shadowRoot.querySelector('.carousel__list');
    let left = carouselList.style.left.replace('px','')*1;
    let right = 0

    if (left !== 0) {
        if (left > 0) {
            carouselList.style.left = '0px'
        } else {
            right = (this.widthItem)+left+20
        }
        if (right >0 ) {
            this.animation(left,0);
        } else {
            this.animation(left,right);
        }
        this.shadowRoot.querySelector('.carousel-count').value--
    }
}

toNext(e) {
    let carousel = this.shadowRoot.querySelector('.carousel');
    let carouselList = this.shadowRoot.querySelector('.carousel__list');
    let left = carouselList.style.left.replace('px','') * 1;
    let right = (this.widthItem*-1)+left - 20;

    let carouselCount = this.shadowRoot.querySelector('.carousel-count')
    let carouselTotal = this.shadowRoot.querySelector('.carousel-total')
    carouselTotal.value =  Math.trunc(carousel.offsetWidth/this.widthItem)

    if(carouselCount.value < 0){
        carouselCount.value = 0;
    }

    if( (carouselCount.value*1 + carouselTotal.value*1) <= this.data.length + 1 ){
        this.animation(left ,right);
        carouselCount.value = carouselCount.value * 1 + 1;
    }
}

animation(from, to){
let elem = this.shadowRoot.querySelector('.carousel__list');
let pos = from;
let offSet = Math.abs(to)<Math.abs(from)? 1 : -1;

let id = setInterval(frame, 0);
  function frame() {
    pos = pos+offSet;
    elem.style.left = pos + 'px';
      if (Math.abs(pos) == Math.abs(to)) {
        elem.style.left = pos + 'px';
        clearInterval(id);
      }
  }
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

_templateDetails(){
return html`
  <div class="carousel__list">
    ${
      this.data.map((v,i)=> html`
      <div data-id="${v.code}" id="cat${v.code}" class="carousel__item cursor" style="width:${this.widthItem+'px'}" @click=${this.selectedCategory} >
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
              <div class="title">${v.title}</div>
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
    <div class="carousel js-carousel">
        <input class="carousel-total" type="text" style="display:none;"/>
        <input class="carousel-count" type="text" style="display:none;"/>
        <div class="carousel__nav">
            <button class="js-carousel-button box-nav" style='height:${this.btnArrow};width:${this.btnArrow};  margin-top:${this.marginTopArrow};'  @click=${this.toPrev} data-dir="prev">&lt;</button>
        </div>
        <div class="carousel__container js-carousel-container" style="height:${this.height+'px'};"  >
            ${this._templateDetails()}
        </div>
        <div class="carousel__nav">
            <button class="js-carousel-button box-nav" style='height:${this.btnArrow};width:${this.btnArrow};  margin-top:${this.marginTopArrow};'  @click=${this.toNext} data-dir="next">&gt;</button>
        </div>
    </div>
`;
}
}

// Register the element with the browser
customElements.define(CellsCarouselCreditCardBnet.is, CellsCarouselCreditCardBnet);
