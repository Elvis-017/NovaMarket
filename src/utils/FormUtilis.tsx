export const cleanFields = () => {
    let win: any = window?.document
    let inputs = win.getElementsByClassName("form-control");

    for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        element.value = ""

        element.classList.remove("is-invalid");
    }

   const idFormValue = win.getElementById("productid")
   idFormValue.value = ""
};

export  const checkRequiredField = () => {
    let value: boolean = false;

    Array.from(window.document.getElementsByClassName("form-control")).map(
        (input: any) => {
            if (input.value.trim() == "") {
                input.classList.add("is-invalid");
                value = true;
            }
        }
    );

    return value;
};

export  const checkCorrectValidation = (e: any) => {
    let classes: any = e.target.classList;
    if (e.target.value.trim() == "") {
        classes.add("is-invalid");
    } else classes.remove("is-invalid");
};
