import ItemOfOption from "@/types/ItemOfOption";
import {RoomStatus} from "@/types/RoomStatus";

export default class RoomForm {
    roomName: string;
    floor: ItemOfOption;
    listFloor: Array<ItemOfOption>;
    roomImages: Array<any>;
    square: number;
    capacity: number;
    status: RoomStatus;
    price: number;
    isSelfContained: boolean;
    description: string
    utilities: Array<any>;
}
