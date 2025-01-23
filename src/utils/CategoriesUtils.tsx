import { NovaButton } from "../components/NovaButton";
import BaseUrl from "./BaseURL";
import NovaNotification from "./NovaNotification";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { changeFamiliarTitle } from "./ModalUtils";
import { getShownRowData } from "./DataTable";
import { categoriesMD } from "../interfaces/categoriesMD";

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
                                onClick={(e: any)=>{
                                    getShownRowData(e); 
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