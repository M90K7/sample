import { Scene, PerspectiveCamera, Vector2, BufferGeometry, LineBasicMaterial, BoxGeometry, CylinderGeometry, DirectionalLight, Line, Mesh, MeshPhongMaterial, Object3D, PlaneGeometry, SphereGeometry, SplineCurve, Vector3, MeshStandardMaterial, MeshPhysicalMaterial, MeshNormalMaterial } from "three";
import { Scene3D } from "../models";


export class TankScene extends Scene3D {

  scene: Scene;

  targetOrbit = new Object3D();
  targetBob = new Object3D();
  targetMesh: Mesh;
  targetMaterial: MeshPhongMaterial;
  curve: SplineCurve;
  tank: any;
  turretPivot: any;
  turretCamera: PerspectiveCamera;
  targetCameraPivot: any;
  wheelMeshes: Mesh<CylinderGeometry, MeshPhongMaterial>[];
  cameras: { cam: PerspectiveCamera; desc: string; }[];
  camera: { cam: PerspectiveCamera; desc: string; };

  constructor() {
    super();

    const camera = this.makeCamera();
    camera.position.set(8, 4, 10).multiplyScalar(3);
    camera.lookAt(0, 0, 0);


    this.scene = new Scene();

    {
      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(0, 20, 0);
      this.scene.add(light);
      light.castShadow = true;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;

      const d = 50;
      light.shadow.camera.left = -d;
      light.shadow.camera.right = d;
      light.shadow.camera.top = d;
      light.shadow.camera.bottom = -d;
      light.shadow.camera.near = 1;
      light.shadow.camera.far = 50;
      light.shadow.bias = 0.001;
    }

    {
      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(1, 2, 4);
      this.scene.add(light);
    }

    const groundGeometry = new PlaneGeometry(50, 50);
    const groundMaterial = new MeshPhongMaterial({ color: 0xCC8866 });
    const groundMesh = new Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = Math.PI * -.5;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);

    const carWidth = 4;
    const carHeight = 1;
    const carLength = 8;

    this.tank = new Object3D();
    this.scene.add(this.tank);

    const bodyGeometry = new BoxGeometry(carWidth, carHeight, carLength);
    const bodyMaterial = new MeshStandardMaterial({ color: 0x6688AA, });

    bodyMaterial.flatShading = false;
    const bodyMesh = new Mesh(bodyGeometry, bodyMaterial);

    bodyMesh.position.y = 1.4;
    bodyMesh.castShadow = true;
    this.tank.add(bodyMesh);

    const tankCameraFov = 75;
    const tankCamera = this.makeCamera(tankCameraFov);
    tankCamera.position.y = 3;
    tankCamera.position.z = -6;
    tankCamera.rotation.y = Math.PI;
    bodyMesh.add(tankCamera);

    const wheelRadius = 1;
    const wheelThickness = .5;
    const wheelSegments = 6;
    const wheelGeometry = new CylinderGeometry(
      wheelRadius,     // top radius
      wheelRadius,     // bottom radius
      wheelThickness,  // height of cylinder
      wheelSegments);
    const wheelMaterial = new MeshPhongMaterial({ color: 0x888888 });
    const wheelPositions = [
      [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, carLength / 3],
      [carWidth / 2 + wheelThickness / 2, -carHeight / 2, carLength / 3],
      [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0],
      [carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0],
      [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3],
      [carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3],
    ];
    this.wheelMeshes = wheelPositions.map(([x, y, z]) => {
      const mesh = new Mesh(wheelGeometry, wheelMaterial);
      mesh.position.set(x, y, z);
      mesh.rotation.z = Math.PI * .5;
      mesh.castShadow = true;
      bodyMesh.add(mesh);
      return mesh;
    });

    const domeRadius = 2;
    const domeWidthSubdivisions = 12;
    const domeHeightSubdivisions = 12;
    const domePhiStart = 0;
    const domePhiEnd = Math.PI * 2;
    const domeThetaStart = 0;
    const domeThetaEnd = Math.PI * .5;
    const domeGeometry = new SphereGeometry(
      domeRadius, domeWidthSubdivisions, domeHeightSubdivisions,
      domePhiStart, domePhiEnd, domeThetaStart, domeThetaEnd);
    const domeMesh = new Mesh(domeGeometry, bodyMaterial);
    domeMesh.castShadow = true;
    bodyMesh.add(domeMesh);
    domeMesh.position.y = .5;

    const turretWidth = .1;
    const turretHeight = .1;
    const turretLength = carLength * .75 * .2;
    const turretGeometry = new BoxGeometry(
      turretWidth, turretHeight, turretLength);
    const turretMesh = new Mesh(turretGeometry, bodyMaterial);
    this.turretPivot = new Object3D();
    turretMesh.castShadow = true;
    this.turretPivot.scale.set(5, 5, 5);
    this.turretPivot.position.y = .5;
    turretMesh.position.z = turretLength * .5;
    this.turretPivot.add(turretMesh);
    bodyMesh.add(this.turretPivot);

    this.turretCamera = this.makeCamera();
    this.turretCamera.position.y = .75 * .2;
    turretMesh.add(this.turretCamera);

    const targetGeometry = new SphereGeometry(.5, 6, 3);
    this.targetMaterial = new MeshPhongMaterial({ color: 0x00FF00, flatShading: true });
    this.targetMesh = new Mesh(targetGeometry, this.targetMaterial);

    const targetElevation = new Object3D();

    this.targetMesh.castShadow = true;
    this.scene.add(this.targetOrbit);
    this.targetOrbit.add(targetElevation);
    targetElevation.position.z = carLength * 2;
    targetElevation.position.y = 8;
    targetElevation.add(this.targetBob);
    this.targetBob.add(this.targetMesh);

    const targetCamera = this.makeCamera();
    this.targetCameraPivot = new Object3D();
    targetCamera.position.y = 1;
    targetCamera.position.z = -2;
    targetCamera.rotation.y = Math.PI;
    this.targetBob.add(this.targetCameraPivot);
    this.targetCameraPivot.add(targetCamera);

    // Create a sine-like wave
    this.curve = new SplineCurve([
      new Vector2(-10, 0),
      new Vector2(-5, 5),
      new Vector2(0, 0),
      new Vector2(5, -5),
      new Vector2(10, 0),
      new Vector2(5, 10),
      new Vector2(-5, 10),
      new Vector2(-10, -10),
      new Vector2(-15, -8),
      new Vector2(-10, 0),
    ]);

    const points = this.curve.getPoints(50);
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ color: 0xff0000 });
    const splineObject = new Line(geometry, material);
    splineObject.rotation.x = Math.PI * .5;
    splineObject.position.y = 0.05;
    this.scene.add(splineObject);


    this.cameras = [
      { cam: camera, desc: 'detached camera', },
      { cam: this.turretCamera, desc: 'on turret looking at target', },
      { cam: targetCamera, desc: 'near target looking at tank', },
      { cam: tankCamera, desc: 'above back of tank', },
    ];

    this.camera = this.cameras[0];

  }

  makeCamera(fov = 40) {
    const aspect = 2;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new PerspectiveCamera(fov, aspect, zNear, zFar);
  }


  targetPosition = new Vector3();
  tankPosition = new Vector2();
  tankTarget = new Vector2();

  animate(time: number): void {
    time *= 0.001;

    // if (resizeRendererToDisplaySize(renderer)) {
    //   const canvas = renderer.domElement;
    //   cameras.forEach((cameraInfo) => {
    //     const camera = cameraInfo.cam;
    //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //     camera.updateProjectionMatrix();
    //   });
    // }

    // move target
    this.targetOrbit.rotation.y = time * .27;
    this.targetBob.position.y = Math.sin(time * 2) * 4;
    this.targetMesh.rotation.x = time * 7;
    this.targetMesh.rotation.y = time * 13;
    this.targetMaterial.emissive.setHSL(time * 10 % 1, 1, .25);
    this.targetMaterial.color.setHSL(time * 10 % 1, 1, .25);

    // move tank
    const tankTime = time * .05;
    this.curve.getPointAt(tankTime % 1, this.tankPosition);
    this.curve.getPointAt((tankTime + 0.01) % 1, this.tankTarget);
    this.tank.position.set(this.tankPosition.x, 0, this.tankPosition.y);
    this.tank.lookAt(this.tankTarget.x, 0, this.tankTarget.y);

    // face turret at target
    this.targetMesh.getWorldPosition(this.targetPosition);
    this.turretPivot.lookAt(this.targetPosition);

    // make the turretCamera look at target
    this.turretCamera.lookAt(this.targetPosition);

    // make the targetCameraPivot look at the at the tank
    this.tank.getWorldPosition(this.targetPosition);
    this.targetCameraPivot.lookAt(this.targetPosition);

    this.wheelMeshes.forEach((obj) => {
      obj.rotation.x = time * 3;
    });

    // this.cameras.forEach((cameraInfo) => {
    //   const camera = cameraInfo.cam;
    //   camera.updateProjectionMatrix();
    // });

    this.camera = this.cameras[time * .25 % this.cameras.length | 0];
    //infoElem.textContent = camera.desc;
  }

  graph(): [Scene, PerspectiveCamera] {
    return [this.scene, this.camera.cam];
  }

}