/*
 inline method to extract the sort from the SystemQueryOptions object.
  */
import {SortPayload} from "ra-core";
import {ODataParamOrderField} from "@odata/client";
import {getODataLikeKeyFormat} from "./getODataLikeKeyFormat";

const SortByMultipleFields = (defaultSort?:SortPayload, sort?: SortPayload | SortPayload[]) => {
    if (sort) {
        const {field:defField,order:defFieldOrder } = defaultSort ||{ field:"",order:"" };
        const multiSort:ODataParamOrderField<any>[] = defaultSort?[{ field:getODataLikeKeyFormat(defField), order: defFieldOrder === "DESC" ? "desc" : "asc" } as ODataParamOrderField<any>]:[];

        if (sort instanceof Array) {
            multiSort.push(
                ...sort
                    .map((value) => {
                        const { field, order } = value;
                        return { field:getODataLikeKeyFormat(field), order: order === "DESC" ? "desc" : "asc" } as ODataParamOrderField<any>;
                    }),
            );
        } else {
            const { field, order } = sort;
            if (!field.includes(".") && multiSort.filter((m) => m.field === field).length === 0) {
                multiSort.push({ field, order: order === "DESC" ? "desc" : "asc" });
            }
        }
        return multiSort
    }
    if(defaultSort) {
        const d: ODataParamOrderField<any> = { field: defaultSort.field, order: defaultSort.order === "DESC" ? "desc" : "asc" }
        return d;
    }
    return null
};

export {SortByMultipleFields}