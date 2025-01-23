export const changeFamiliarTitle = (text: string, modal:string) => {
    const modalTitle: any = window.document.getElementById(modal);
    let header = modalTitle?.querySelector(`.modal-title`);
    header.textContent = text;
  }