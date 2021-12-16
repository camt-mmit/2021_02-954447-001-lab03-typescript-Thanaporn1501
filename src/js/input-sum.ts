import * as ET from './element-type.js';

function calculateSum(parentContainer: ET.Container): void {
  const inputs = parentContainer.querySelectorAll<ET.Input>(
    '.cmp-inputs-container .cmp-input-container input[type="number"]'
  );

  let total = 0;
  inputs.forEach((elem) => (total += elem.valueAsNumber));
  parentContainer.querySelector<ET.Output>('output.cmp-result')!.value =
    total.toString();
}

function generateContainer(parentContainer: ET.Container): void {
  const inputContainers = parentContainer.querySelectorAll<ET.Container>(
    '.cmp-inputs-container .cmp-input-container'
  );
  inputContainers.forEach((inputContainer, i) => {
    inputContainer.querySelector<ET.Number>('.cmp-input-no')!.textContent = (
      i + 1
    ).toString();
    inputContainer.querySelector<ET.Command>('.cmd-delete-input')!.disabled =
      false;
  });

  if (inputContainers.length === 1) {
    parentContainer.querySelector<ET.Command>(
      '.cmp-inputs-container .cmd-delete-input'
    )!.disabled = true;
  }

  calculateSum(parentContainer);
}

function add(parentContainer: ET.Container): void {
  const tmpInput = document.querySelector<ET.Template>('template#tmp-input')!;
  const fragment = tmpInput.content.cloneNode(true) as ET.TemplateContent;

  parentContainer
    .querySelector<ET.Container>('.cmp-inputs-container')!
    .append(fragment);

  generateContainer(parentContainer);
}

function remove(container: ET.Container, parentContainer: ET.Container) {
  container.remove();

  generateContainer(parentContainer);
}

export function create(parentContainer: ET.Container) {
  parentContainer.addEventListener('click', (ev) => {
    const elem = ev.target as ET.Command;

    if (elem.matches('.cmd-add-input')) {
      add(parentContainer);
    } else if (elem.matches('.cmd-delete-input')) {
      const container = elem.closest<ET.Container>('.cmp-input-container')!;

      remove(container, parentContainer);
    }
  });


  const inputsContainer = parentContainer.querySelector<ET.Container>(
    '.cmp-inputs-container'
  )!;
  inputsContainer.addEventListener('change', (ev) => {
    const elem = ev.target as ET.Input;

    if (elem.matches('input[type="number"]')) {
      calculateSum(parentContainer);
    }
  });

  add(parentContainer);
}
