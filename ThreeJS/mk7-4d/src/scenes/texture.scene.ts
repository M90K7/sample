import * as THREE from "three";
import {
  BoxGeometry,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Mesh,
  DirectionalLight,
  WebGLRenderer,
  Camera,
  MathUtils,
  Fog,
  Color,
} from "three";
import { Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class TextureScene extends Scene3D {
  private camera!: Camera;
  private activeCamera!: Camera;
  private scene!: Scene;

  orbitCtrls!: OrbitControls;
  cubeGrp!: THREE.Group<THREE.Object3DEventMap>;
  sLight!: THREE.SpotLight;
  targetSpotCube!: THREE.Mesh;

  settings = {
    update: true
  };

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor() {
    super();
  }

  init(renderer: WebGLRenderer) {
    super.init(renderer);
    renderer.shadowMap.enabled = true;

    this.addBooleanUI(this.settings, "update", "update");

    const aspectR = window.innerWidth / window.innerHeight;

    this.camera = new PerspectiveCamera(
      75,
      aspectR,
      1,
      1000
    );

    // this.camera = new THREE.OrthographicCamera(-1 * aspectR, aspectR, 1, -1, 0.1, 1000);

    this.activeCamera = this.camera;

    this.camera.position.y = 320;
    this.camera.position.z = 500;
    this.camera.rotateX(MathUtils.degToRad(-30));

    this.scene = new Scene();
    this.scene.background = new THREE.CubeTextureLoader()
      .setPath('images/scenes/05/')
      .load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
      ]);

    this.scene.environment = this.scene.background;

    this.scene.fog = new Fog(0xcfcfff, 400, 1000);

    const ground = this._makeGround();
    ground.material.envMapIntensity = 0.08;
    this.scene.add(ground);

    const stones_grp = new THREE.Group();
    const stone = this._makeStone();
    stone.material.envMapIntensity = 0.05;
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
    stone2.material.envMapIntensity = 0.1;
    stones_grp.add(stone);
    Array<number>(10).fill(1).map((v, i) => {
      const index = i;
      const s = stone2.clone();
      s.position.set(MathUtils.randFloatSpread(4) * 200, 0, MathUtils.randInt(200, 400));
      return s;
    }).forEach(s => stones2_grp.add(s));
    stones2_grp.position.set(0, 0, -300);
    this.scene.add(stones2_grp);


    // Light
    const color = 0xffffef;
    const intensity = 0.05;
    const light = new DirectionalLight(color, intensity);
    light.position.set(0, 1000, 1000);
    // light.target.position.set(0, 0, 0);
    light.castShadow = true;
    this.scene.add(light);


    this.sLight = new THREE.SpotLight(
      new THREE.Color("#ffea80"),
      4,
      330,
      MathUtils.degToRad(10),
      0.4,
      0.1
    );
    this.sLight.position.set(0, 200, 0);
    this.scene.add(this.sLight);
    // pLight.lookAt(stones_grp.position);
    this.scene.add(new THREE.SpotLightHelper(this.sLight));

    this.sLight.castShadow = true;
    this.sLight.shadow.radius = 1;
    // this.sLight.shadow.focus = 0.5;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    this.sLight.shadow.camera.far = 150;
    this.sLight.shadow.camera.fov = 30;
    this.sLight.shadow.camera.zoom = 0.75;
    // this.sLight.shadow.camera.aspect = aspectR;
    // this.sLight.shadow.autoUpdate = true;
    // this.sLight.shadow.needsUpdate = true;
    console.log(this.sLight.shadow);

    this.addNumberUI(this.sLight.shadow.camera, "far", "far", {
      max: 800,
    });

    const cameraChangeOption = { visible: true };
    const cameraChangeUI = this.addBooleanUI(cameraChangeOption, "visible", "Change Camera");
    cameraChangeUI.on("change", () => {
      this.activeCamera = cameraChangeOption.visible ?
        this.camera : this.sLight.shadow.camera;
    });

    const spotShadowCameraHelper = new THREE.CameraHelper(this.sLight.shadow.camera);
    this.scene.add(spotShadowCameraHelper);

    const spotLightCube = new BoxGeometry(20, 20, 20);
    this.targetSpotCube = new Mesh(spotLightCube);
    this.targetSpotCube.visible = false;
    this.targetSpotCube.position.set(220, -this.sLight.position.y, 0);
    this.sLight.add(this.targetSpotCube);
    this.sLight.target = this.targetSpotCube;

    this.addNumberUI(this.sLight.shadow, "normalBias", "normalBias");
    this.addNumberUI(this.sLight.shadow, "radius", "radius");

    // this.pLight.target.position.set(20, 0, 100);
    // this.scene.add(this.pLight.target);

    // this.addNumberUI(pLight, pLight.);

    this.orbitCtrls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbitCtrls.maxPolarAngle = MathUtils.degToRad(85);
    // this.orbitCtrls.minPolarAngle = MathUtils.degToRad(50);
    this.orbitCtrls.minDistance = 100;
    this.orbitCtrls.maxDistance = 400;
    this.orbitCtrls.minDistance = 10;
    this.orbitCtrls.maxPolarAngle = Math.PI / 2 - 0.05; // prevent camera below ground
    this.orbitCtrls.minPolarAngle = Math.PI / 4;        // prevent top down view
    // this.orbitCtrls.autoRotate = true;
    // this.orbitCtrls.enableDamping = true;



  }

  clock = new THREE.Clock();

  animate(time: number): void {

    this.orbitCtrls.update();

    if (!this.settings.update) {
      return;
    }

    const etime = this.clock.getElapsedTime();


    // this.sLight.rotation.y += 0.005;

    this.sLight.target.position.x = Math.sin(etime * 0.2) * 200;
    this.sLight.target.position.z = Math.cos(etime * 0.2) * 200;

  }

  graph(): [Scene, Camera] {
    return [this.scene, this.activeCamera];
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
    mesh.receiveShadow = true;
    mesh.rotateX(THREE.MathUtils.degToRad(-90));
    mesh.add(this.addAxisUI(50, "Axis Ground"));
    mesh.position.setY(-20);

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
      displacementScale: 2,

      aoMap: tex_ao,
      aoMapIntensity: 1,

      roughnessMap: tex_roughness,
      roughness: 0.9,

    });
    const mesh = new THREE.Mesh(gem, material);
    mesh.castShadow = true;
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
      displacementScale: 3,
      displacementBias: 0,

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
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;

  }
}