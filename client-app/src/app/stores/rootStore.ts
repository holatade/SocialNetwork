import { createContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";

export class RootStore {
    activityStore : ActivityStore;
    userStore: UserStore;
    commonStore:CommonStore;
    modalStore :ModalStore;
    profileStore: ProfileStore

    constructor(){
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore= new ProfileStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore());

