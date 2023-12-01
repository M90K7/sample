import { useState } from "react";
import { SceneModel } from "../models";

import { stateManager } from "../services";

export default function Nav() {
    const [scenes, setScenes] = stateManager.scenesState;

    const activeScene = (scene: SceneModel) => {
        scenes.forEach((s) => (s.active = false));
        scene.active = true;

        setScenes([...scenes]);
    };

    const menusEle = scenes.map((scene, index) => (
        <div
            key={"menu_" + index}
            className={"btn" + (scene.active ? " active" : "")}
            onClick={() => activeScene(scene)}
        >
            {scene.name}
        </div>
    ));

    return <nav id="nav-menu">{menusEle}</nav>;
}
