import {ApplicationRegistryEntry, ROOT_APPLICATION_ID} from '../API';
import { applicationRegistry } from '../applicationRegistry';
import {RootApplicationProps} from "../dom";
import fs from "fs"




const e = {

}
export const useApplicationById: <P extends RootApplicationProps>(id?: string) => ApplicationRegistryEntry<P> = <P>(id= ROOT_APPLICATION_ID) => {
    if(applicationRegistry[id] === undefined) {
        throw new Error(`Application with id "${id}" has not been registered`);
    }




    return applicationRegistry[id];
};
