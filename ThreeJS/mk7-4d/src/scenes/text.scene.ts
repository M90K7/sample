
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
  MeshToonMaterial,
  MeshMatcapMaterial,
  Group,
} from "three";
import * as THREE from "three";
import { AxisGridHelper, Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// const ttt = require('troika-3d-text');
const ttt = require('troika-three-text');
const t3t = require('troika-3d-text');


export class TextScene extends Scene3D {
  private camera!: Camera;
  private scene!: Scene;
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

    this.camera.position.z = 20;

    this.scene = new Scene();

    const textureMatcap = (new TextureLoader()).load("/images/textures/matcap/331A0B_B17038_7D4E28_5B351A-512px.png");

    var fontLoader = new FontLoader();
    fontLoader.load("/images/fonts/IRANYekan Medium_Regular.json", (font: Font) => {

      const textGem = new TextGeometry("جنگ شناختی", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
      });

      textGem.center();

      const material = new MeshMatcapMaterial();
      material.matcap = textureMatcap;
      material.side = THREE.DoubleSide;
      const mesh = new Mesh(textGem, material);
      this.scene.add(mesh);


      console.log(ttt);
      console.log(t3t);

      const text = new ttt.Text();
      // text.material.polygonOffset = true;
      text.material = material;
      text.facade = t3t.Text3DFacade;
      text.text = 'جنگ شناختی';
      text.fontSize = 1;
      text.strokeWidth = 0.005;
      // text.depthOffset = 2;
      text.anchorX = "center";
      text.anchorY = "middle";
      text.fontStyle = "normal";
      // text.curveRadius = 15;
      text.direction = "rtl";
      text.textAlign = "center";
      // text.color = 0x9966FF;
      text.font = '/fonts/IRANYekanMedium.ttf';

      text.glyphGeometryDetail = 0.5;

      text.scale.setScalar(3);
      text.lookAt(new Vector3(-0.5, 0.5, 0.5));
      // text.lookAt(this.camera.position);

      // Update the rendering:
      text.sync();

      console.log(text);

      this.scene.add(text);
    });

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

    this.scene.add(this.addAxisUI());

  }

  animate(time: number): void {
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