import { create as createInputSum } from './input-sum.js';
import * as ET from './element-type.js';

function generateContainer(parentContainer: ET.Container): void {
    const sectionContainers = parentContainer.querySelectorAll<ET.Container>('.cmp-section-container .cmp-section-container');
    sectionContainers.forEach((sectionContainer, i) => {
        sectionContainer.querySelector<ET.Number>('.cmp-section-no')!.textContent = (
          i + 1
          ).toString();
        sectionContainer.querySelector<ET.Command>('.cmd-delete-section')!.disabled =
        false;
    });

    if(sectionContainers.length === 1) {
        parentContainer.querySelector<ET.Command>('.cmp-section-container .cmd-delete-section')!.disabled = true;
    }
}

function add(parentContainer: ET.Container): void {
    const tmpSection = document.querySelector<ET.Template>('template#tmp-section');
    const fragment = tmpSection!.content.cloneNode(true) as ET.TemplateContent;

    createInputSum(fragment.querySelector<ET.Container>('.cmp-section-container')!);

    parentContainer.querySelector<ET.Container>('.cmp-section-container')!.append(fragment);

    generateContainer(parentContainer);
}

function remove(container: ET.Container, parentContainer: ET.Container) {
    container.remove();

    generateContainer(parentContainer);
}

export function create(parentContainer: ET.Container) {
    parentContainer.addEventListener('click', (ev) => {
        const elem = ev.target as ET.Command;

        if(elem.matches('.cmd-add-section')) {
            add(parentContainer);
        } else if(elem.matches('.cmd-delete-section')) {
            const container = elem.closest<ET.Container>('.cmp-section-container')!;

            remove(container, parentContainer);
        }
    });

    add(parentContainer);
}
