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
} from "three";
import { Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class CubeScene extends Scene3D {
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

    // this.camera = new OrthographicCamera(-1 * aspectR, aspectR, 1, -1, 0.1, 1000);

    this.camera.position.z = 200;

    this.scene = new Scene();

    const texture = new TextureLoader().load("images/textures/crate.gif");
    const geometry = new BoxGeometry(20, 20, 20);
    console.log(geometry.attributes.position.array);
    const material = new MeshPhongMaterial({ map: texture });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
    this.scene.add(this.mesh);

    const cube2_mesh = this.mesh.clone();
    cube2_mesh.position.setX(50);

    cube2_mesh.rotation.reorder("XYZ");
    cube2_mesh.rotation.y = MathUtils.degToRad(25);
    cube2_mesh.rotation.x = MathUtils.degToRad(25);
    // cube2_mesh.rotateX(25);

    this.scene.add(cube2_mesh);

    // Light
    const color = 0xffffaf;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(700, 100, 300);
    light.castShadow = true;

    this.scene.add(light);

    this.orbitCtrls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbitCtrls.autoRotate = true;
    this.orbitCtrls.enableDamping = true;

    cube2_mesh.add(this.addAxisUI(50));
    this.mesh.add(this.addAxisUI(50));

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
  }

  PI_2 = Math.PI * 2;
}