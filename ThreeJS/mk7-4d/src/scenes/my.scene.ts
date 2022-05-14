import { Scene, PerspectiveCamera, BoxGeometry, MeshPhongMaterial, Mesh } from "three";
import { Scene3D } from "../models";


export class MyScene extends Scene3D {

  scene: Scene;
  camera: PerspectiveCamera;

  constructor() {
    super();

    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.scene = new Scene();

    const boxGem = new BoxGeometry(5, 5, 5);
    const boxMat = new MeshPhongMaterial({ color: 0x00ff00 });
    const boxMesh = new Mesh(boxGem, boxMat);

    this.scene.add(boxMesh);

  }

  animate(time: number): void {
  }

  graph(): [Scene, PerspectiveCamera] {
    return [this.scene, this.camera];
  }

}