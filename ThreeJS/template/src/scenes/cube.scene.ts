import {
  BoxGeometry,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  DirectionalLight,
} from "three";
import { Scene3D } from "../models";

export class CubeScene extends Scene3D {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private mesh: Mesh;

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor() {
    super();

    this.camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 400;
    this.scene = new Scene();

    const texture = new TextureLoader().load("images/textures/crate.gif");
    const geometry = new BoxGeometry(200, 200, 200);
    const material = new MeshPhongMaterial({ map: texture });
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);

    // Light
    const color = 0xffffaf;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(700, 100, 300);
    light.castShadow = true;

    this.scene.add(light);

  }

  animate(time: number): void {

    if (this.mesh.rotation.y > this.PI_2) {
      this.mesh.rotation.y = 0;
    }

    this.mesh.rotation.x += 0.003;
    this.mesh.rotation.y += 0.005;
  }

  graph(): [Scene, PerspectiveCamera] {
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