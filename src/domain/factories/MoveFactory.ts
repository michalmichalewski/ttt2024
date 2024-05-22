import {Move} from "../models/valueObject/move";
import {PlayerMovement} from "../../application/dto/PlayerMovement";
import {Sign} from "../models/game/sign";

export class MoveFactory {
    public static createFromDto(dto: PlayerMovement, sign: string): Move {

        if(!Object.keys(Sign).includes(sign)) {
            throw new Error("Invalid sign");
        }

        return new Move(dto.x + 3 * dto.y, sign as Sign);
    }
}