import { v4 as uuidv4 } from 'uuid';

export class GameId {
    protected value: string | undefined;

    constructor(value?: string) {
        if(value === undefined) {
            this.value = uuidv4();
        } else {
            this.value = value;
        }
    }

    toString() {
        return this.value;
    }
}