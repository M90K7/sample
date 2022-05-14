import { SceneModel } from "../models";
import Nav from "./Nav";

export default function Header() {
    return (
        <header id="header">
            <div>
                <h1>MK7 4D</h1>
            </div>
            <Nav />
        </header>
    );
}
