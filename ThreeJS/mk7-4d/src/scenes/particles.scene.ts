
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
  PointsMaterial,
  Points,
  SphereGeometry,
  AdditiveBlending,
  TubeGeometry,
  TorusKnotGeometry,
  Color,
} from "three";
import { Scene3D } from "../models";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as gsap from "gsap";

export class ParticlesScene extends Scene3D {
  private camera!: Camera;
  private scene!: Scene;
  orbitCtrls!: OrbitControls;

  state: "toSphere" | "sphere" | "toTorusKnot" | "torusKnot" = "sphere";

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

    this.camera.position.z = 10;

    this.scene = new Scene();

    this.scene.background = new Color(0x2f2f2f);

    const sphereGem = new SphereGeometry(3, 50, 50);
    const sphereGemColor = new Float32Array(sphereGem.attributes.position.array.length);
    const torusKnotGem = new TorusKnotGeometry(2.2, 0.4, 300, 300);
    const torusKnotGemColor = new Float32Array(torusKnotGem.attributes.position.array.length);


    for (let i = 0; i < torusKnotGemColor.length; i += 3) {
      torusKnotGemColor[i + 0] = Math.random();
      torusKnotGemColor[i + 1] = Math.random();
      torusKnotGemColor[i + 2] = Math.random();

    }
    sphereGemColor.set(torusKnotGemColor.subarray(0, sphereGemColor.length), 0);

    const pointsGem = new BufferGeometry();
    pointsGem.setAttribute(
      "position",
      new BufferAttribute(Float32Array.from(sphereGem.attributes.position.array) as any, 3)
    );
    pointsGem.setAttribute(
      "color",
      new BufferAttribute(sphereGemColor, 3)
    );
    // pointsGem.setAttribute(
    //   "color",
    //   new BufferAttribute(sphereGem.attributes.position.array as any, 3)
    // );

    const pointsMaterial = new PointsMaterial({
      color: 0xff6faf,
      size: 0.05,
      sizeAttenuation: true,
      depthWrite: false,
      transparent: true,
      blending: AdditiveBlending,
      vertexColors: true
    });
    const pointsMesh = new Points(pointsGem, pointsMaterial);

    this.scene.add(pointsMesh);


    this.gui.addButton({
      title: "TorusKnot",
      label: "TorusKnot",
    }).on("click", () => {


      if (this.state === "toSphere" || this.state === "sphere") {
        this.state = "torusKnot";
        pointsGem.setAttribute(
          "position",
          new BufferAttribute(Float32Array.from(torusKnotGem.attributes.position.array), 3)
        );
        pointsGem.setAttribute(
          "color",
          new BufferAttribute(torusKnotGemColor, 3)
        );
        return;
      }

      if (this.state === "torusKnot") {

        this.state = "toTorusKnot";

        for (let i = 0; i < pointsGem.attributes.position.array.length; i += 3) {

          const xyz = {
            x: pointsGem.attributes.position.array[i + 0],
            y: pointsGem.attributes.position.array[i + 1],
            z: pointsGem.attributes.position.array[i + 2],
          };

          gsap.gsap.to(
            xyz,
            {
              ease: "back.out",
              duration: 1.5 * Math.random(),
              x: "+=" + ((Math.random() - 0.5) * xyz.x * 2),
              y: "+=" + ((Math.random() - 0.5) * xyz.y * 2),
              z: "+=" + ((Math.random() - 0.5) * xyz.z * 2),
              onUpdate: (_i, _xyz) => {
                pointsGem.attributes.position.array[_i + 0] = _xyz.x;
                pointsGem.attributes.position.array[_i + 1] = _xyz.y;
                pointsGem.attributes.position.array[_i + 2] = _xyz.z;

                pointsGem.setAttribute(
                  "position",
                  new BufferAttribute(pointsGem.attributes.position.array, 3)
                );
              },
              onUpdateParams: [i, xyz]
            }
          );
        }
      } else if (this.state === "toTorusKnot") {
        this.state = "torusKnot";

        // for (let i = 0; i < pointsGem.attributes.position.array.length; i += 3) {

        //   const xyz_target = {
        //     x: torusKnotGem.attributes.position.array[i + 0],
        //     y: torusKnotGem.attributes.position.array[i + 1],
        //     z: torusKnotGem.attributes.position.array[i + 2],
        //   };

        //   const xyz_current = {
        //     x: pointsGem.attributes.position.array[i + 0],
        //     y: pointsGem.attributes.position.array[i + 1],
        //     z: pointsGem.attributes.position.array[i + 2],
        //   };

        //   const xyz_new = {
        //     x: xyz_current.x - (xyz_target.x),
        //     y: xyz_current.y - (xyz_target.y),
        //     z: xyz_current.z - (xyz_target.z)
        //   };



        //   gsap.gsap.to(
        //     xyz_current,
        //     {
        //       ease: "bounce.in",
        //       duration: 1.5 * Math.random(),
        //       x: `-=${xyz_new.x}`,
        //       y: `-=${xyz_new.y}`,
        //       z: `-=${xyz_new.z}`,
        //       onUpdate: (_i, _xyz) => {
        //         pointsGem.attributes.position.array[_i + 0] = _xyz.x;
        //         pointsGem.attributes.position.array[_i + 1] = _xyz.y;
        //         pointsGem.attributes.position.array[_i + 2] = _xyz.z;

        //         pointsGem.setAttribute(
        //           "position",
        //           new BufferAttribute(pointsGem.attributes.position.array, 3)
        //         );
        //       },
        //       onUpdateParams: [i, xyz_current]
        //     }
        //   );
        // }

        gsap.gsap.to(
          pointsGem.attributes.position.array,
          {
            ease: "bounce.in",
            duration: 1.5,
            endArray: (torusKnotGem.attributes.position as any).array,
            onUpdate: () => {
              pointsGem.attributes.position.needsUpdate = true;
            }
          }
        );
      }
    });

    this.gui.addButton({
      title: "Sphere",
      label: "Sphere",
    }).on("click", () => {

      if (this.state === "toTorusKnot" || this.state === "torusKnot") {
        this.state = "sphere";
        pointsGem.setAttribute(
          "position",
          new BufferAttribute(Float32Array.from(sphereGem.attributes.position.array), 3)
        );
        pointsGem.setAttribute(
          "color",
          new BufferAttribute(sphereGemColor, 3)
        );

        return;
      }

      if (this.state === "sphere") {

        this.state = "toSphere";

        for (let i = 0; i < pointsGem.attributes.position.array.length; i += 3) {

          const xyz = {
            x: pointsGem.attributes.position.array[i + 0],
            y: pointsGem.attributes.position.array[i + 1],
            z: pointsGem.attributes.position.array[i + 2],
          };

          gsap.gsap.to(
            xyz,
            {
              ease: "power2.out",
              duration: 1.5 * Math.random(),
              x: "+=" + ((Math.random() - 0.5) * xyz.x * 2),
              y: "+=" + ((Math.random() - 0.5) * xyz.y * 2),
              z: "+=" + ((Math.random() - 0.5) * xyz.z * 2),
              onUpdate: (_i, _xyz) => {
                pointsGem.attributes.position.array[_i + 0] = _xyz.x;
                pointsGem.attributes.position.array[_i + 1] = _xyz.y;
                pointsGem.attributes.position.array[_i + 2] = _xyz.z;

                pointsGem.setAttribute(
                  "position",
                  new BufferAttribute(pointsGem.attributes.position.array, 3)
                );
              },
              onUpdateParams: [i, xyz]
            }
          );
        }
      } else if (this.state === "toSphere") {
        this.state = "sphere";

        // for (let i = 0; i < sphereGem.attributes.position.array.length; i += 3) {

        //   const xyz_target = {
        //     x: sphereGem.attributes.position.array[i + 0],
        //     y: sphereGem.attributes.position.array[i + 1],
        //     z: sphereGem.attributes.position.array[i + 2],
        //   };

        //   const xyz_current = {
        //     x: pointsGem.attributes.position.array[i + 0],
        //     y: pointsGem.attributes.position.array[i + 1],
        //     z: pointsGem.attributes.position.array[i + 2],
        //   };

        //   const xyz_new = {
        //     x: xyz_current.x - (xyz_target.x),
        //     y: xyz_current.y - (xyz_target.y),
        //     z: xyz_current.z - (xyz_target.z)
        //   };

        //   gsap.gsap.to(
        //     xyz_current,
        //     {
        //       ease: "power2.in",
        //       duration: 1.5 * Math.random(),
        //       x: `-=${xyz_new.x}`,
        //       y: `-=${xyz_new.y}`,
        //       z: `-=${xyz_new.z}`,
        //       onUpdate: (_i, _xyz) => {
        //         pointsGem.attributes.position.array[_i + 0] = _xyz.x;
        //         pointsGem.attributes.position.array[_i + 1] = _xyz.y;
        //         pointsGem.attributes.position.array[_i + 2] = _xyz.z;

        //         pointsGem.setAttribute(
        //           "position",
        //           new BufferAttribute(pointsGem.attributes.position.array, 3)
        //         );
        //       },
        //       onUpdateParams: [i, xyz_current]
        //     }
        //   );
        // }

        gsap.gsap.to(
          pointsGem.attributes.position.array,
          {
            ease: "power2.in",
            duration: 1.5,
            endArray: (sphereGem.getAttribute("position") as any).array,
            onUpdate: (i) => {
              pointsGem.attributes.position.needsUpdate = true;
            }
          }
        );
      }

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

  }

  animate(time: number): void {

    // if (this.mesh.rotation.y > this.PI_2) {
    //   this.mesh.rotation.y = 0;
    // }

    // this.mesh.rotation.x += 0.003;
    // this.mesh.rotation.y += 0.005;

    if (this.state === "toSphere") {


    }


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