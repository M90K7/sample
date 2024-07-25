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
  BufferGeometry,
  BufferAttribute,
  PlaneGeometry,
  RawShaderMaterial,
  Vector2,
  Clock,
  Color,
} from "three";
import { Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class ShaderScene extends Scene3D {
  private camera!: Camera;
  private scene!: Scene;
  orbitCtrls!: OrbitControls;
  planMat!: RawShaderMaterial;

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor() {
    super();
  }

  async init(renderer: WebGLRenderer) {
    super.init(renderer);

    const aspectR = window.innerWidth / window.innerHeight;

    this.camera = new PerspectiveCamera(
      75,
      aspectR,
      0.1,
      1000
    );



    this.camera.position.z = 4;

    this.scene = new Scene();

    this.scene.add(new THREE.CameraHelper(this.camera));

    const texLoader = new TextureLoader();
    const loadTexFn = (url: string): THREE.Texture => {
      const tex = texLoader.load(url);
      // tex.repeat.set(2, 2);
      tex.wrapS = THREE.MirroredRepeatWrapping;
      tex.wrapT = THREE.MirroredRepeatWrapping;

      tex.minFilter = THREE.LinearMipMapNearestFilter;
      tex.magFilter = THREE.LinearFilter;

      // tex.channel = 2;
      tex.premultiplyAlpha = true;

      tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

      return tex;
    };
    const tex = loadTexFn("/images/textures/ground/limestone6-bl/base.png");

    let vertex_shader = await (await fetch('images/shaders/test/vertex.glsl?t=' + Date.now())).text();
    let frag_shader = await (await fetch('images/shaders/test/fragment.glsl?t=' + Date.now())).text();

    const planGem = new PlaneGeometry(5, 5, 512, 512);

    const count = planGem.getAttribute("position").count;
    const random = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      random[i] = Math.random();
    }
    planGem.setAttribute("aRandom", new BufferAttribute(random, 1));

    this.planMat = new RawShaderMaterial({
      vertexShader: vertex_shader,
      fragmentShader: frag_shader,
      uniforms: {
        uFrequency: { value: new Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new Color("#ffa0ff") },
        uTexture: { value: tex }
      }
    });

    this.addNumberUI(this.planMat.uniforms.uFrequency.value, "x", "x");
    this.addNumberUI(this.planMat.uniforms.uFrequency.value, "y", "y");

    const planMesh = new Mesh(planGem, this.planMat);
    planMesh.rotation.x = MathUtils.degToRad(-40);
    this.scene.add(planMesh);

    // Light
    // const color = 0xffffaf;
    // const intensity = 1;
    // const light = new DirectionalLight(color, intensity);
    // light.position.set(700, 100, 300);
    // light.castShadow = true;
    // this.scene.add(light);

    this.orbitCtrls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbitCtrls.autoRotate = true;
    this.orbitCtrls.enableDamping = true;

  }


  clock = new Clock();

  animate(time: number): void {

    // if (this.mesh.rotation.y > this.PI_2) {
    //   this.mesh.rotation.y = 0;
    // }

    // this.mesh.rotation.x += 0.003;
    // this.mesh.rotation.y += 0.005;

    if (this.planMat) {
      this.planMat.uniforms.uTime.value = this.clock.getElapsedTime();
    }

    this.orbitCtrls?.update();
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