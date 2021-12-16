export type Container = HTMLElement;
export type Input = HTMLInputElement;
export type Output =
  | HTMLOutputElement
  | (HTMLElement & {
      value: string;
    });
export type Command =
  | HTMLButtonElement
  | (HTMLElement & {
      disabled: boolean;
    });
export type Template = HTMLTemplateElement;
export type TemplateContent = DocumentFragment;
export type Number = HTMLElement;
