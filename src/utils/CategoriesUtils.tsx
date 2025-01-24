import { NovaButton } from "../components/NovaButton";
import BaseUrl from "./BaseURL";
import NovaNotification from "./NovaNotification";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { changeFamiliarTitle } from "./ModalUtils";
import { getShownRowData } from "./DataTableUtils";
import { categoriesMD } from "../interfaces/categoriesMD";
import { FormEvent } from "react";
import { disableSubmitBtn } from "./FormUtilis";
import { GlobalMessages } from "../enums/GlobalMessages";


export const saveCategories = async (callback: any = () => { }) => {
    const initialData: any = {};

    const form: any = window.document.getElementById("form-category"),
        saveBtn: any = document.getElementById("btn-save-category"),
        formData = new FormData(form, saveBtn);

    for (const [key, value] of formData) {
        console.log(key, value)
        let val: any = value;
        if (val == "") continue;
        initialData[key] = !isNaN(val) ? parseInt(val) : val;
        // console.log(key, value)
    }
    console.log(initialData)


    disableSubmitBtn("btn-save-category", true);
    await new BaseUrl().setData(initialData["id"] ? `Category/modifyCategory` : `Category/saveCategory`, initialData)
        .then(() => {
            disableSubmitBtn("btn-save-category", false);
            new NovaNotification(GlobalMessages.SUCCESS, "colored");
            callback(this);
        })
        .catch((error: any) => {
            new NovaNotification(error.replace("SQL Error:", ""), "colored").errorNotification();
        })


}

export const deleteCategory = async (e: FormEvent, callback: any = () => { }) => {

    e.preventDefault();

    const initialData: any = {};

    const form: any = window.document.getElementById("form-remove-category"),
        saveBtn: any = document.getElementById("btn-form-remove-category"),
        formData = new FormData(form, saveBtn);


    let val: any = formData.get("idremovecategory")?.toString();

    initialData["id"] = !isNaN(val) ? parseInt(val) : val;
  
    // for (const [key, value] of formData) {
    //     let val: any = value;
    //     if (val == "") continue;
    //     if(key == "idremove") key = "id";
    //     initialData[key] = !isNaN(val) ? parseInt(val) : val;
    //     // console.log(key, value)
    // }


   await new BaseUrl().setData(`Category/removeCategory`, initialData)
        .then(() => {
            new NovaNotification(GlobalMessages.SUCCESS, "colored");
            callback(this);
        })
        .catch((error: any) => {
            new NovaNotification(error.replace("SQL Error:", ""), "colored").errorNotification();
        })

}

export const getCategoriesCustomRows = async () => {
    return await new BaseUrl().getData("Categories/getCategories")
        .then((responds: any) => {

            try {
                let stringy = JSON.stringify(responds),
                    data = JSON.parse(stringy),
                    rows: Array<any> = [];

                data.map((obj: categoriesMD) => {
                    let props = {
                        id: obj.id,
                        name: obj.name
                    }

                    rows.push({
                        name: props.name,
                        action: <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <NovaButton
                                datasets={{
                                    id: props.id,
                                    name: props.name,
                                }}
                                onClick={(e: any) => {
                                    getShownRowData(e, "btn-warning");
                                    changeFamiliarTitle("Edit Category", "category-modal");
                                }
                                }
                                type="button"
                                dataTarget={"#category-modal"}
                                className={`btn btn-warning m-1 btn-sm`}
                                icon={<MdEdit />}
                            />
                            <NovaButton
                                type="button"
                                datasets={{
                                    idremovecategory: props.id
                                }}
                                onClick={(e: any) => {
                                    getShownRowData(e, "btn-danger");
                                }}
                                dataTarget="#modal-remove-category"
                                className={`btn btn-danger m-1 btn-sm`}
                                icon={<MdDelete />}
                            />
                        </div>
                    });
                });


                return rows

            } catch (error: any) {
                new NovaNotification(error.message, "colored").errorNotification();
            }
        });
}
