import GUI from "lil-gui";
import {
  AxesHelper,
  GridHelper,
  Material,
  Object3D,
  PerspectiveCamera,
  Scene
} from "three";




export abstract class Scene3D {

  gui = new GUI();

  abstract animate(time: number): void;

  abstract graph(): [Scene, PerspectiveCamera];

  destroy(): void {
  }

  makeAxisGrid(node: Object3D, label: string, units?: number) {
    const helper = new AxisGridHelper(node, units);
    this.gui.add(helper, 'visible').name(label);
  }
}

// Turns both axes and grid visible on/off
// GUI requires a property that returns a bool
// to decide to make a checkbox so we make a setter
// can getter for `visible` which we can tell GUI
// to look at.
export class AxisGridHelper {
  _visible = false;

  axes: AxesHelper;
  grid: GridHelper;

  constructor(node: Object3D, units = 10) {
    const axes = new AxesHelper();
    (axes.material as Material).depthTest = false;
    axes.renderOrder = 2;  // after the grid
    node.add(axes);

    this.grid = new GridHelper(units, units);
    (this.grid.material as Material).depthTest = false;
    this.grid.renderOrder = 1;
    node.add(this.grid);

    this.grid = this.grid;
    this.axes = axes;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}
