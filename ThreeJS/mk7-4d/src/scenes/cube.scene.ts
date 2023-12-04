import * as THREE from "three";
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
  Fog,
  Color,
} from "three";
import { Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class CubeScene extends Scene3D {
  private camera!: Camera;
  private scene!: Scene;
  private mesh!: Mesh;
  orbitCtrls!: OrbitControls;
  cubeGrp!: THREE.Group<THREE.Object3DEventMap>;

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
    this.scene.background = new Color(0xcfcfff);
    this.scene.fog = new Fog(this.scene.background, 1, 800);

    const texture = new TextureLoader().load("images/textures/crate.gif");
    const geometryParameters = {
      width: 20,
      height: 20,
      depth: 20
    };
    const geometry = new BoxGeometry(geometryParameters.width, geometryParameters.height, geometryParameters.depth);

    console.log(geometry.attributes.position.array);

    this.cubeGrp = new THREE.Group();
    this.scene.add(this.cubeGrp);

    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      // color: 0xcfcfff,
      // emissive: 0xcfbfff,
      // opacity: 0.1,
      // transparent: true,
      fog: true,
      side: THREE.DoubleSide,
      clearcoat: 0.5,
      clearcoatRoughness: 0.35
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(-20, 0, 0);
    this.cubeGrp.add(this.mesh);

    const cube2_mesh = this.mesh.clone();
    const cube2_material = (cube2_mesh.material as THREE.MeshPhysicalMaterial).clone();
    cube2_material.fog = false;
    cube2_material.clearcoatRoughness = 0;

    cube2_mesh.material = cube2_material;
    cube2_mesh.position.setX(20);

    cube2_mesh.rotation.reorder("XYZ");
    cube2_mesh.rotation.y = MathUtils.degToRad(25);
    // cube2_mesh.rotation.x = MathUtils.degToRad(25);
    cube2_mesh.rotateX(25);

    this.cubeGrp.add(cube2_mesh);

    // Light
    const color = 0xffffaf;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(0, 0, 300);
    light.castShadow = true;
    this.scene.add(light);

    const pointLight = new THREE.PointLight(0xff0040, 500, 200);
    pointLight.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xff0040 })));
    pointLight.position.set(0, 12, 10);
    pointLight.castShadow = true;
    this.scene.add(pointLight);


    this.orbitCtrls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbitCtrls.autoRotate = true;
    this.orbitCtrls.enableDamping = true;

    this.mesh.add(this.addAxisUI(50, "Axis 1"));
    cube2_mesh.add(this.addAxisUI(50, "Axis 2"));

    const applyGeometryParameters = () => {
      const geometry = new BoxGeometry(geometryParameters.width, geometryParameters.height, geometryParameters.depth);
      this.mesh.geometry = geometry;
      cube2_mesh.geometry = geometry;
    };

    this.addNumberUI(geometryParameters, "width", "width")
      .on("change", (arg) => {
        applyGeometryParameters();
      });

    this.addNumberUI(geometryParameters, "height", "height")
      .on("change", (arg) => {
        applyGeometryParameters();
      });

    this.addNumberUI(geometryParameters, "depth", "depth")
      .on("change", (arg) => {
        applyGeometryParameters();
      });


  }

  animate(time: number): void {

    // if (this.mesh.rotation.y > this.PI_2) {
    //   this.mesh.rotation.y = 0;
    // }

    // this.mesh.rotation.x += 0.003;
    // this.mesh.rotation.y += 0.005;

    this.cubeGrp.rotation.y += 0.002;



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