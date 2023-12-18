
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
  Object3D,
  MeshPhysicalMaterial,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
  PlaneGeometry,
  MeshStandardMaterial,
  Group,
  Color,
  RectAreaLight,
  AmbientLight,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

import { Scene3D } from "../models";


export class GltfSampleScene extends Scene3D {
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

    renderer.shadowMap.enabled = true;

    const aspectR = window.innerWidth / window.innerHeight;

    this.camera = new PerspectiveCamera(
      50,
      aspectR,
      0.1,
      1000
    );

    this.camera.position.z = 200;

    this.scene = new Scene();

    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("images/draco/");
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load("images/3d/AnisotropyBarnLamp/AnisotropyBarnLamp.gltf", (d) => {
      const model: Object3D = d.scene;

      // model.traverse((c: any) => {
      //   if (["01_Selected-Body-TextureBaking", "Cage-Body-TextureBaking", "02_Active-Body-TextureBaking", "Rig-Alien-Animal"].includes(c.name)) {
      //     if (c.material) {
      //       const material: MeshPhysicalMaterial = c.material;
      //       material.roughness = 0.2;
      //     }
      //   }
      // });
      model.scale.setScalar(100);



      console.log(d);
      const colors = [0xffff6f, 0xff6fff, 0x6fffff];
      const group = new Group();
      group.add(...[-1, 0, 1].map((v, index) => {
        const g = new Group();
        g.position.x = v * 100;
        // g.position.y = v * 100;

        var m = model.clone();
        m.castShadow = true;
        m.receiveShadow = true;

        const lampGlassMesh = m.getObjectByName("Lamp_Glass") as Mesh;
        if (lampGlassMesh && lampGlassMesh.material) {
          const mat = (lampGlassMesh.material as MeshStandardMaterial).clone();
          mat.color = new Color(colors[index]);
          mat.roughness = 0.5; // 0.05;
          lampGlassMesh.material = mat;
          // lampGlassMesh.add(point);
        }

        g.add(m);

        const spotLight = new SpotLight(colors[index], 20, 150, MathUtils.degToRad(20), 0.1, 0.1);
        spotLight.position.y = 0;
        spotLight.position.z = 12;
        g.add(spotLight.target);
        spotLight.target.position.set(0, -5, 12);

        // g.add(new SpotLightHelper(spotLight));
        // g.add(spotLight);


        const rectLight = new RectAreaLight(colors[index], 500, 20, 20);
        // rectLight.castShadow = true;
        // rectLight.power = 1000;
        rectLight.position.set(-1, -12, 14);
        // rectLight.rotation.set(MathUtils.degToRad(-80), 0, 0);
        rectLight.lookAt(-1, -100, 14);
        // g.add(new RectAreaLightHelper(rectLight));
        g.add(rectLight);

        const point = new PointLight(colors[index], 40, 20, 1);
        point.power = 10000;
        point.position.set(-1, -11, 14);
        point.lookAt(-1, -14, 14);
        // point.position.set(-1, -11, 15);
        // g.add(new PointLightHelper(point));
        // point.scale.setScalar(2);
        // g.add(point);

        return g;
      }));

      group.position.y = 60;

      this.scene.add(group);
    });

    const plan = new PlaneGeometry(400, 400);
    const planMaterial = new MeshStandardMaterial({
      color: 0x363636,
      roughness: 0.5,
      metalness: 0.6,
    });
    const planMesh = new Mesh(plan, planMaterial);
    planMesh.receiveShadow = true;
    this.scene.add(planMesh);

    // Light
    const color = 0xffffbf;
    const intensity = 2;
    const light = new AmbientLight(color, intensity);
    // light.position.set(0, 0, 300);
    // light.castShadow = true;
    this.scene.add(light);

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