import * as bootstrap from "bootstrap";

export const changeFamiliarTitle = (text: string, modal:string) => {
    const modalTitle: any = window.document.getElementById(modal);
    let header = modalTitle?.querySelector(`.modal-title`);
    header.textContent = text;
  }

  const getModalById = (modalId: string): bootstrap.Modal | undefined => {
    const modal = document.getElementById(modalId) as HTMLElement; 

    if (modal == null) return;

   const modalInstance =  bootstrap.Modal.getOrCreateInstance(modal);

   if (modalInstance == null) return;

   return modalInstance
  }


  export const showModal = (modalId: string) => {
    const modal = getModalById(modalId);

    if (modal) modal.show();
  } 

  export const hideModal = (modalId: string) => {
    const modal = getModalById(modalId);

    if (modal == null) return
    
    modal.hide();
  }