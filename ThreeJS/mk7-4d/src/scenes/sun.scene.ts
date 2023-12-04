import { PerspectiveCamera, Scene, Mesh, MeshPhongMaterial, PointLight, SphereGeometry, Object3D, EventDispatcher, AxesHelper, Material, WebGLRenderer } from "three";
import { Scene3D } from "../models";


export class SunScene extends Scene3D {

  private camera: PerspectiveCamera;
  private scene: Scene;

  objects: Object3D[] = [];

  constructor() {
    super();

    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 50, 0);
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(0, 0, 0);

    this.scene = new Scene();

    {
      const color = 0xFFFF99;
      const intensity = 1;
      const light = new PointLight(color, intensity);
      this.scene.add(light);
    }

    // an array of objects who's rotation to update
    const radius = 1;
    const widthSegments = 20;
    const heightSegments = 20;
    const sphereGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

    const solarSystem = new Object3D();

    this.scene.add(solarSystem);
    this.objects.push(solarSystem);

    const sunMaterial = new MeshPhongMaterial({ emissive: 0xFFFF00 });
    const sunMesh = new Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    //sunMesh.visible = false;

    solarSystem.add(sunMesh);
    //this.objects.push(sunMesh);

    const earthOrbit = new Object3D();
    earthOrbit.position.x = 10;

    solarSystem.add(earthOrbit);
    this.objects.push(earthOrbit);

    const earthMaterial = new MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 });
    const earthMesh = new Mesh(sphereGeometry, earthMaterial);

    earthOrbit.add(earthMesh);

    //this.objects.push(earthMesh);

    const moonOrbit = new Object3D();
    moonOrbit.position.x = 2;

    earthOrbit.add(moonOrbit);
    this.objects.push(moonOrbit);

    const moonMaterial = new MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
    const moonMesh = new Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    // moonMesh.position.x = 2;

    moonOrbit.add(moonMesh);
    // earthMesh.add(moonMesh);
    //this.objects.push(moonMesh);

    // this.objects.forEach((node) => {
    //   const axes = new AxesHelper();
    //   (axes.material as Material).depthTest = false;
    //   axes.renderOrder = 1;
    //   node.add(axes);
    // });

    this.makeAxisGrid(solarSystem, "solar", 25);
    this.makeAxisGrid(earthOrbit, "earth");
    this.makeAxisGrid(moonOrbit, "moon");
  }

  animate(time: number): void {
    time *= 0.0006;

    this.objects.forEach((obj) => {
      obj.rotation.y = time;
    });
  }

  graph(): [Scene, PerspectiveCamera] {
    return [this.scene, this.camera];
  }

  destroy(): void {
    this.scene.clear();
    this.camera.clear();

    this.objects = <any>undefined;

    super.destroy();
  }
}