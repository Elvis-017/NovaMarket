import { NovaButton } from "../components/NovaButton";
import { productsMD } from "../interfaces/productsMD";
import BaseUrl from "./BaseURL";
import NovaNotification from "./NovaNotification";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { changeFamiliarTitle } from "./ModalUtils";
import { getShownRowData } from "./DataTableUtils";
import { FormEvent } from "react";
import { GlobalMessages } from "../enums/GlobalMessages";

export const saveProducts = async (e: FormEvent) => {

    e.preventDefault();

    const initialData: any = {};

    const form: any = window.document.getElementById("form-product"),
        saveBtn: any = document.getElementById("btn-save-product"),
        formData = new FormData(form, saveBtn);

    for (const [key, value] of formData) {
        let val: any = value;
        if (val == "") continue;
        initialData[key] = !isNaN(val) ? parseInt(val) : val;

    }

   return await new BaseUrl().setData(initialData["id"] ? `Products/modifyProduct` : `Products/saveProduct`, initialData)
        .then(() => {
            new NovaNotification(GlobalMessages.SUCCESS, "colored").successNotification();
        })
        .catch((error: any) => {
            new NovaNotification(error, "colored").errorNotification();
        })

}


export const deleteProduct = (e: FormEvent) => {

    e.preventDefault();

    const initialData: any = {};

    const form: any = window.document.getElementById("form-remove"),
        saveBtn: any = document.getElementById("btn-form-remove"),
        formData = new FormData(form, saveBtn);

    let val: any = formData.get("idremove")?.toString();

    initialData["id"] = !isNaN(val) ? parseInt(val) : val;
 
  return  new BaseUrl().setData(`Products/removeProduct`, initialData)
    .then(() => {
        new NovaNotification(GlobalMessages.SUCCESS, "colored").successNotification();

    })
    .catch((error: any) => {
        new NovaNotification(error, "colored").errorNotification();
    })


}

export const getProductsCustomRows = async (): Promise<void | any | Array<any>> => {
    return await new BaseUrl().getData("Products/getProducts")
        .then((responds: any) => {
                let stringy = JSON.stringify(responds),
                    data = JSON.parse(stringy),
                    rows: Array<any> = [];

                data.map((obj: productsMD) => {
                    let props = {
                        id: obj.id,
                        name: obj.name,
                        categoryid: obj.categoryId,
                        categoryname: obj.categoryName,

                        idremove: obj.id,
                    }

                    rows.push({
                        name: props.name,
                        categoryName: props.categoryname,
                        action: <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <NovaButton
                                datasets={{
                                    id: props.id,
                                    name: props.name,
                                    categoryid: props.categoryid,
                                }}
                                onClick={(e: any) => {
                                    getShownRowData(e, "btn-warning");
                                    changeFamiliarTitle("Edit Products", "product-modal");
                                }
                                }
                                type="button"
                                dataTarget={"#product-modal"}
                                className={` btn-warning m-1 btn-sm`}
                                icon={<MdEdit />}
                            />
                            <NovaButton
                                type="button"
                                datasets={{
                                    idremove: props.id
                                }}
                                onClick={(e: any) => {
                                    getShownRowData(e, "btn-danger");
                                }}
                                dataTarget="#modal-remove"
                                className={`btn-danger m-1 btn-sm`}
                                icon={<MdDelete />}
                            />
                        </div>
                    });
                });


                return rows

      
        })
        .catch((error: any) => {
            new NovaNotification(error.replace("SQL Error:", ""), "colored").errorNotification();
        })
}