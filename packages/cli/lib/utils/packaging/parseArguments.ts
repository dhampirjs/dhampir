import { ACTION_LIST } from "../../constants/actions";

export default function parseArguments(args: string[]): any[]{
    const actionIndex = args.findIndex(a => {
        return ACTION_LIST.includes(a as any);
    });

    return [actionIndex > -1 ? args.slice(0, actionIndex) : [], actionIndex === -1 ? args[0] : args[actionIndex], args.slice(actionIndex)];
}
