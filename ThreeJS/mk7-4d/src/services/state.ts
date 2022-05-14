import { SceneModel } from "../models";



class AppShareState {

  scenesState!: [SceneModel[], React.Dispatch<React.SetStateAction<SceneModel[]>>];



}

export const stateManager = new AppShareState();