
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
} from "three";
import { Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class BufferArrayScene extends Scene3D {
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


    const vertices = new Float32Array([
      // ↪ Front
      0, 0, 0,
      20, 0, 0,
      0, 20, 0,
      // ↩ Back
      0, 0, 0,
      0, 20, 0,
      20, 0, 0,
    ]);
    const buffArray = new BufferAttribute(vertices, 3);

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", buffArray);

    const texture = new TextureLoader().load("images/textures/crate.gif");
    const material = new MeshPhongMaterial({
      // wireframe: true,
      map: texture
    });
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);

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
    super.destroy();
  }

  PI_2 = Math.PI * 2;
}