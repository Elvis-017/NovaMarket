import { NovaButton } from "../components/NovaButton";
import { productsMD } from "../interfaces/productsMD";
import BaseUrl from "./BaseURL";
import NovaNotification from "./NovaNotification";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { changeFamiliarTitle } from "./ModalUtils";
import { getShownRowData } from "./DataTable";

export const getProductsCustomRows = async () => {
    return await new BaseUrl().getData("Products/getProducts")
        .then((responds: any) => {

            try {
                let stringy = JSON.stringify(responds),
                    data = JSON.parse(stringy),
                    rows: Array<any> = [];

                data.map((obj: productsMD) => {
                    let props = {
                        id: obj.id,
                        name: obj.name,
                        categoryid: obj.categoryId,
                        categoryname: obj.categoryName,
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
                                onClick={(e: any)=>{
                                    getShownRowData(e); 
                                    changeFamiliarTitle("Edit Products", "product-modal");
                                }
                                }
                                type="button"
                                dataTarget={"#product-modal"}
                                className={`btn btn-warning m-1 btn-sm`}
                                icon={<MdEdit />}
                            />
                            <NovaButton
                                type="button"
                                datasets={{
                                    id: props.id
                                }}
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