import { css, } from 'lit-element';


export default css`:host {
  display: block;
  @apply --cells-carousel-bnet-parent; }

.carousel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px; }

.carousel__button--prev, .carousel__button--next {
  position: absolute;
  top: 0;
  bottom: 0; }

.carousel__button--prev {
  left: 0; }

.carousel__button--next {
  right: 0; }

.carousel__container {
  overflow: hidden;
  margin-left: 15px;
  margin-right: 15px; }

.carousel__list {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%; }

.carousel__item {
  flex-shrink: 0;
  text-align: center;
  margin: 10px;
  opacity: 1; }

.flex-container {
  height: 100%;
  box-shadow: 0 3px 4px 0 rgba(8, 8, 8, 0.19);
  display: flex;
  flex-direction: column; }

.sections {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-bottom: 20px; }

.section-information {
  height: 15%;
  align-items: center;
  font-size: 12px;
  font-family: sans-serif;
  margin: 13px; }

.section-image {
  height: 75%;
  padding: 0px 25px; }

img {
  width: 100%;
  height: 100%; }

.disabled {
  pointer-events: none;
  opacity: 0.4; }

.cursor {
  cursor: pointer; }

.active {
  color: #55c1ff; }

.no-active {
  color: #949494; }

.title {
  padding-bottom: 3px;
  color: #0078d2;
  font-weight: bold;
  font-size: 15px; }

.sub-title {
  padding-bottom: 10px;
  color: #949494; }

.push-right {
  text-align: end;
  margin: 10px 10px 5px 5px; }

.carousel__item:hover {
  /* box-shadow: 0px 0px 10px 2px rgba(25, 115, 184,0.5) */
  border: 2px solid #55c1ff;
  opacity: 1; }

.carousel__item-hover {
  /* box-shadow: 0px 0px 10px 2px rgba(25, 115, 184,0.5) */
  border: 2px solid #55c1ff;
  color: #55c1ff;
  opacity: 1; }

.flex-row {
  display: flex;
  flex-direction: row; }

.flex-item {
  align-items: center;
  align-self: center;
  width: 100%;
  text-align: center; }

.box {
  background-image: linear-gradient(to bottom, #fefefe, #f6f8f9);
  text-align: center;
  color: #b9c5d2;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer; }

.box-nav {
  background-image: linear-gradient(to bottom, #fff, #fff);
  text-align: center;
  color: #55c1ff;
  border: 0px solid #d5e2ee;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  font-size: 30px;
  font-family: monospace; }

.box:hover, .box:active, .box:focus {
  border: 1px solid #d5e2ee;
  outline: inherit; }
`;