import { ACTION_LIST } from "../constants/actions";

export default function printHelp(): void {
    console.log(`Available actions are "${ACTION_LIST.join(", ")}".`)
}
