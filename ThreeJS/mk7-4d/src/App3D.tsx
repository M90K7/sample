import { WebGLRenderer, Vector2, PerspectiveCamera, OrthographicCamera } from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL";
import { Scene3D } from "./models";

export class App3D {
    private renderer: WebGLRenderer;
    scene3d?: Scene3D;

    globalFrameId: number = 0;

    /**
     * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
     */
    constructor(canvasEle: HTMLCanvasElement) {
        let contextType: "webgl" | "webgl2" = "webgl";

        if (WebGL.isWebGL2Available()) {
            contextType = "webgl2";
            //document.body.appendChild(WebGL.getWebGL2ErrorMessage());
        }

        var canvasParams: WebGLContextAttributes = {
            alpha: true,
            antialias: true,
        };
        // const canvasEle = document.querySelector(
        //     "#canvasApp"
        // ) as HTMLCanvasElement;
        const context = canvasEle.getContext(
            contextType,
            canvasParams
        ) as WebGLRenderingContext;

        this.renderer = new WebGLRenderer({
            canvas: canvasEle,
            context: context,
            // a technique used to add greater realism to a digital image by smoothing jagged edges on curved lines and diagonals.
            antialias: true,
        });

        this.renderer.setClearColor(0x000000, 0); // the default

        // حالت بهینه بیشتر از 2 نداشته باشیم
        // در صورت کمتر بودن همان نسبت پیکسل صفحه باشد
        const maxPixelRatio = Math.min(2, window.devicePixelRatio);
        this.renderer.setPixelRatio(maxPixelRatio);

        // this.renderer.setPixelRatio(0.5);
        this.renderer.setClearColor(0xaaaadf);
        this.renderer.shadowMap.enabled = true;
        //this.renderer.setSize(window.innerWidth, window.innerHeight);
        this._setRenderSize();

        //document.body.appendChild(this.renderer.domElement);
        window.addEventListener(
            "resize",
            this.onWindowResize.bind(this),
            false
        );

        this.globalFrameId = requestAnimationFrame(this.animate.bind(this));
        //this.animate();
    }

    setScene(scene3d: Scene3D) {
        this.scene3d = scene3d;
        this.scene3d.init(this.renderer);
        this.updateProjectionMatrix();
    }

    private onWindowResize(): void {
        if (this._setRenderSize()) {
            this.updateProjectionMatrix();
        }
    }

    private updateProjectionMatrix() {
        if (this.scene3d) {
            const [_, camera] = this.scene3d.graph();

            if (camera instanceof PerspectiveCamera) {
                camera.aspect = window.innerWidth / window.innerHeight;
            }
            if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
                camera.updateProjectionMatrix();
            }
        }
    }

    private animate(time: number): void {
        cancelAnimationFrame(this.globalFrameId);

        if (this.scene3d) {
            this.scene3d.animate(time);
            const [scene, camera] = this.scene3d.graph();
            this.renderer.render(scene, camera);
        }

        this.globalFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    private _setRenderSize() {
        let size = new Vector2();
        this.renderer.getSize(size);

        const { clientWidth, clientHeight } = this._getParentOfCanvasElement();
        if (size.width !== clientWidth || size.height !== clientHeight) {
            this.renderer.setSize(
                clientWidth || window.innerWidth,
                clientHeight || window.innerHeight
            );
            return true;
        }

        return false;
    }

    private _getParentOfCanvasElement(): HTMLElement {
        return this.renderer.domElement.parentElement!;
    }
}
