import * as ReactDOM from "react-dom";
import * as React from "react";

import Header from "./components/Header";

import { App3D } from "./App3D";
import { SceneModel } from "./models";
import { stateManager as shareState } from "./services";
import * as scene from "./scenes";

const sceneItems: SceneModel[] = [
    {
        name: "Cube",
        type: scene.CubeScene,
        active: false,
    },
    {
        name: "Earth",
        type: scene.SunScene,
        active: false,
    },
    {
        name: "Tank",
        type: scene.TankScene,
        active: false,
    },
    {
        name: "Buffer Array",
        type: scene.BufferArrayScene,
        active: false
    },
    {
        name: "Texture",
        type: scene.TextureScene,
        active: false
    },
    {
        name: "Light",
        type: scene.LightScene,
        active: false
    },
    {
        name: "gltf",
        type: scene.GltfSampleScene,
        active: false
    },
    {
        name: "Text",
        type: scene.TextScene,
        active: false
    },
    {
        name: "Particles",
        type: scene.ParticlesScene,
        active: false
    },
    {
        name: "Shaders",
        type: scene.ShaderScene,
        active: true
    }
];

function AppDom() {
    shareState.scenesState = React.useState(sceneItems);
    const [app, setApp] = React.useState<App3D | undefined>(undefined);
    const canvasRef = React.useCallback((canvas: HTMLCanvasElement) => {
        if (canvas !== null) {
            setTimeout(() => {
                setApp(new App3D(canvas));
            }, 0);
        }
    }, []);

    React.useEffect(() => {
        useActiveScene();
    }, [app, shareState.scenesState[0]]);

    function useActiveScene() {
        const [scenes, _] = shareState.scenesState;
        const activeScene = scenes.find((s) => s.active);
        if (app && activeScene) {
            app.scene3d?.destroy();

            const t = activeScene.type;
            app.setScene(new t());
        }
    }

    return (
        <div className="app">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <canvas
                    ref={canvasRef}
                    id="canvasApp"
                    className="canvasApp"
                ></canvas>
            </div>
        </div>
    );
}

ReactDOM.render(<AppDom />, document.getElementById("app"));
