import {create as createSectionInput}  from './section-input.js';
import * as ET from './element-type.js';


document.addEventListener('DOMContentLoaded', () => {
    const sectionContainer = document.querySelector<ET.Container>('.cmp-main-container');

    if(sectionContainer) {
      createSectionInput(sectionContainer)
    }
});



