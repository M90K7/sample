
import {
  BoxGeometry,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  DirectionalLight,
  WebGLRenderer,
  Vector3,
  OrthographicCamera,
  Camera,
  MathUtils,
  BufferGeometry,
  BufferAttribute,
  MeshStandardMaterial,
  SpotLight,
  SpotLightHelper,
} from "three";
import { Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class LightScene extends Scene3D {
  private camera!: Camera;
  private scene!: Scene;
  private mesh!: Mesh;
  orbitCtrls!: OrbitControls;

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor() {
    super();
  }

  init(renderer: WebGLRenderer) {
    super.init(renderer);

    const aspectR = window.innerWidth / window.innerHeight;

    this.camera = new PerspectiveCamera(
      50,
      aspectR,
      0.1,
      1000
    );

    this.camera.position.z = 200;

    this.scene = new Scene();

    const boxGem = new BoxGeometry(20, 20, 20);
    const boxStandardMaterial = new MeshStandardMaterial({
      color: 0x66fffc,
      metalness: 0.6,
      roughness: 0.4
    });
    const boxMesh = new Mesh(boxGem, boxStandardMaterial);
    this.scene.add();

    // SpotLight

    const sLight = new SpotLight(0xe0ff66, 4, 0, Math.PI / 4, 0, 0);
    sLight.angle = Math.PI / 4;
    sLight.position.set(100, 200, 0);
    sLight.target = boxMesh;
    this.scene.add(new SpotLightHelper(sLight));
    this.scene.add(sLight);

    this.addNumberUI(sLight, "decay", "decay");
    this.addNumberUI(sLight, "distance", "distance");
    this.addNumberUI(sLight, "intensity", "intensity");
    this.addNumberUI(sLight, "penumbra", "penumbra");

    this.orbitCtrls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbitCtrls.autoRotate = true;
    this.orbitCtrls.enableDamping = true;

  }

  animate(time: number): void {

    // if (this.mesh.rotation.y > this.PI_2) {
    //   this.mesh.rotation.y = 0;
    // }

    // this.mesh.rotation.x += 0.003;
    // this.mesh.rotation.y += 0.005;

    this.orbitCtrls.update();
  }

  graph(): [Scene, Camera] {
    return [this.scene, this.camera];
  }

  destroy(): void {
    this.scene.clear();
    this.camera.clear();
    this.scene = <any>undefined;
    this.camera = <any>undefined;
    super.destroy();
  }

  PI_2 = Math.PI * 2;
}