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

export class TextureScene extends Scene3D {
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
      75,
      aspectR,
      1,
      1000
    );

    // this.camera = new OrthographicCamera(-1 * aspectR, aspectR, 1, -1, 0.1, 1000);

    this.camera.position.y = 100;
    this.camera.position.z = 300;
    this.camera.rotateX(MathUtils.degToRad(-30));

    this.scene = new Scene();
    this.scene.background = new Color(0xcfcfff);
    this.scene.fog = new Fog(this.scene.background, 200, 1000);

    const ground = this._makeGround();
    this.scene.add(ground);

    const texture = new TextureLoader().load("images/textures/crate.gif");

    const geometryParameters = {
      width: 20,
      height: 20,
      depth: 20
    };
    const geometry = new BoxGeometry(geometryParameters.width, geometryParameters.height, geometryParameters.depth);

    this.cubeGrp = new THREE.Group();
    this.scene.add(this.cubeGrp);

    const stones_grp = new THREE.Group();
    const stone = this._makeStone();
    stones_grp.add(stone);
    const stone_w = 25;
    Array<number>(30).fill(1).map((v, i) => {
      const index = i;
      const s = stone.clone();
      s.position.set(index * stone_w, Math.sin(i) * stone_w, index * stone_w / 2);
      return s;
    }).forEach(s => stones_grp.add(s));
    stones_grp.position.set(-300, 0, -300);
    this.scene.add(stones_grp);

    const stones2_grp = new THREE.Group();
    const stone2 = this._makeStone2();
    stones_grp.add(stone);
    Array<number>(5).fill(1).map((v, i) => {
      const index = i;
      const s = stone2.clone();
      s.position.set(MathUtils.randFloatSpread(4) * 200, 0, MathUtils.randInt(200, 400));
      return s;
    }).forEach(s => stones2_grp.add(s));
    stones2_grp.position.set(0, 0, -300);
    this.scene.add(stones2_grp);


    // Light
    const color = 0xffffef;
    const intensity = 2;
    const light = new DirectionalLight(color, intensity);
    light.position.set(0, 600, 500);
    // light.castShadow = true;
    this.scene.add(light);


    this.orbitCtrls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitCtrls.maxPolarAngle = MathUtils.degToRad(85);
    // this.orbitCtrls.minPolarAngle = MathUtils.degToRad(50);
    this.orbitCtrls.minDistance = 100;
    this.orbitCtrls.maxDistance = 400;
    this.orbitCtrls.minDistance = 10;
    // this.orbitCtrls.autoRotate = true;
    // this.orbitCtrls.enableDamping = true;

  }

  animate(time: number): void {

    // if (this.mesh.rotation.y > this.PI_2) {
    //   this.mesh.rotation.y = 0;
    // }

    // this.mesh.rotation.x += 0.003;
    // this.mesh.rotation.y += 0.005;

    // this.cubeGrp.rotation.y += 0.002;



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


  _makeGround() {
    const gem = new THREE.PlaneGeometry(1000, 1000, 500, 500);
    const uv2 = new THREE.BufferAttribute(
      gem.attributes.uv.array,
      gem.attributes.uv.itemSize
    );
    gem.setAttribute('uv2', uv2);

    const texLoader = new TextureLoader();

    const loadTexFn = (url: string) => {
      const tex = texLoader.load(url);

      tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

      // tex.offset.set(0.1, 0.1);
      tex.repeat.set(8, 8);
      tex.wrapS = THREE.MirroredRepeatWrapping;
      tex.wrapT = THREE.MirroredRepeatWrapping;

      tex.minFilter = THREE.NearestMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;

      return tex;
    };

    const material2 = new THREE.MeshStandardMaterial({
      // side: THREE.DoubleSide,

      map: loadTexFn("/images/textures/ground/SandyGravel01_MR_1K/SandyGravel01_1K_BaseColor.png"),
      normalMap: loadTexFn("/images/textures/ground/SandyGravel01_MR_1K/SandyGravel01_1K_Normal.png"),

      displacementMap: loadTexFn("/images/textures/ground/SandyGravel01_MR_1K/SandyGravel01_1K_Height.png"),
      displacementScale: 15,

      aoMap: loadTexFn("/images/textures/ground/SandyGravel01_MR_1K/SandyGravel01_1K_AO.png"),
      aoMapIntensity: 1,

      roughnessMap: loadTexFn("/images/textures/ground/SandyGravel01_MR_1K/SandyGravel01_1K_Roughness.png"),
      roughness: 0.9,
    });
    const mesh = new THREE.Mesh(gem, material2);
    mesh.position.setY(-10);
    mesh.rotateX(THREE.MathUtils.degToRad(-90));
    mesh.add(this.addAxisUI(50, "Axis Ground"));

    return mesh;
  }

  _makeStone() {
    // const gem = new THREE.DodecahedronGeometry(30, 2);
    const gem = new THREE.ConeGeometry(20, 100, 150);
    const uv2 = new THREE.BufferAttribute(
      gem.attributes.uv.array,
      gem.attributes.uv.itemSize
    );
    gem.setAttribute('uv2', uv2);

    const texLoader = new TextureLoader();

    const loadTexFn = (url: string) => {
      const tex = texLoader.load(url);
      // tex.offset.set(0.1, 0.1);
      tex.repeat.set(2, 2);
      tex.wrapS = THREE.MirroredRepeatWrapping;
      tex.wrapT = THREE.MirroredRepeatWrapping;

      tex.minFilter = THREE.NearestMipMapNearestFilter;
      tex.magFilter = THREE.NearestFilter;

      return tex;
    };

    const tex = loadTexFn("/images/textures/ground/GravelBig02_MR_1K/GravelBig02_1K_BaseColor.png");
    const tex_ao = loadTexFn("/images/textures/ground/GravelBig02_MR_1K/GravelBig02_1K_AO.png");
    const tex_height = loadTexFn("/images/textures/ground/GravelBig02_MR_1K/GravelBig02_1K_Height.png");
    const tex_normal = loadTexFn("/images/textures/ground/GravelBig02_MR_1K/GravelBig02_1K_Normal.png");
    const tex_roughness = loadTexFn("/images/textures/ground/GravelBig02_MR_1K/GravelBig02_1K_Roughness.png");

    const material = new THREE.MeshStandardMaterial({
      map: tex,
      normalMap: tex_normal,

      displacementMap: tex_height,
      displacementScale: 1,

      aoMap: tex_ao,
      aoMapIntensity: 0.5,

      roughnessMap: tex_roughness,
      roughness: 0.9,

    });
    const mesh = new THREE.Mesh(gem, material);
    return mesh;

  }


  _makeStone2() {
    const gem = new THREE.SphereGeometry(15, 50, 50);
    const uv2 = new THREE.BufferAttribute(
      gem.attributes.uv.array,
      gem.attributes.uv.itemSize
    );
    gem.setAttribute('uv2', uv2);

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
    const tex_ao = loadTexFn("/images/textures/ground/limestone6-bl/ao.png");
    const tex_height = loadTexFn("/images/textures/ground/limestone6-bl/height.png");
    const tex_normal = loadTexFn("/images/textures/ground/limestone6-bl/normal.png");
    const tex_roughness = loadTexFn("/images/textures/ground/limestone6-bl/roughness.png");
    const tex_metallic = loadTexFn("/images/textures/ground/limestone6-bl/metallic.png");

    const material = new THREE.MeshStandardMaterial({
      // side: THREE.DoubleSide,
      map: tex,
      normalMap: tex_normal,
      // normalMapType: THREE.ObjectSpaceNormalMap,
      normalScale: new THREE.Vector2(1, 1),

      // bumpMap: tex_normal,
      // bumpScale: 1,

      displacementMap: tex_height,
      displacementScale: 20,
      displacementBias: 50,

      aoMap: tex_ao,
      aoMapIntensity: 1,

      roughnessMap: tex_roughness,
      roughness: 0.8,

      metalnessMap: tex_metallic,
      metalness: 0.35

    });

    this.addNumberUI(material, "displacementBias", "d-Bias");
    this.addNumberUI(material, "displacementScale", "d-Scale");
    this.addNumberUI(material, "aoMapIntensity", "aoMap");
    this.addNumberUI(material, "bumpScale", "bumpScale");

    const mesh = new THREE.Mesh(gem, material);
    return mesh;

  }
}