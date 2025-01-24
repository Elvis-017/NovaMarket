export const disableSubmitBtn = (btnId: string, value: boolean) => {
    const win: any = window.document
    win.getElementById(btnId).disabled = value;
}

export const cleanFields = () => {
    let win: any = window?.document
    let inputs = win.getElementsByClassName("form-control"),
    inputsId = win.getElementsByClassName("form-control-id");

    for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        element.value = ""

        element.classList.remove("is-invalid");
    }

    Array.from(inputsId).map( (input: any) =>  input.value = "" );
};

export const checkRequiredField = () => {
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

export const checkCorrectValidation = (e: any) => {
    let classes: any = e.target.classList;
    if (e.target.value.trim() == "") {
        classes.add("is-invalid");
    } else classes.remove("is-invalid");
};
