import { actionList } from "../constants/actions";

export default function printHelp(): void {
    console.log(`Available actions are "${actionList.join(", ")}".`)
}
