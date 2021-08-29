import ItemOfOption from "@/types/ItemOfOption";

export default class DormForm {
    dormName: string;
    dormImages: Array<any>;
    address: {
        code: string,
        specificAddress: string,
        longitude: number,
        latitude: number,
        district: ItemOfOption,
        subDistrict: ItemOfOption,
        civilGroup: string,
    };
    listDistrict: Array<ItemOfOption>;
    listSubDistrict: Array<ItemOfOption>;
    description: string
    utilities: Array<any>;
}
