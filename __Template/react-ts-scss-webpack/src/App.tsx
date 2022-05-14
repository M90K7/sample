import { createRoot } from 'react-dom/client';

function AppDom() {

    return (
        <div className="app-container">
            <h1>Starts</h1>
            <h1>React18 + TS + SCSS + Webpack</h1>
        </div>
    );
}

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<AppDom />);