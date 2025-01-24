
export const getShownRowData = (event: any, classChecker: string) => {
    let elem = event.target;

    while (elem && !elem.classList.contains(classChecker)) {
        elem = elem.parentElement;
    }

    for (const key in elem.dataset) {
        // if (Object.prototype.hasOwnProperty.call(elem.dataset, key)) {
            const element = elem.dataset[key];

            let omittedPropertyArr = ["bsTarget", "bsToggle", "bsDismiss"]
            if (omittedPropertyArr.includes(key)) continue;
       
            let field: any = window.document.getElementById(key);
            field.value = element;
        // }
    }
}