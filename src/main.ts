import { LayoutCardConstructor, LayoutCardEditor } from "./types";
import { registerEasyLayoutCard } from "./easy-layout-card";
import { registerEasyLayoutCardEditor } from "./easy-layout-card-editor";
import pjson from "../package.json";

console.info(`%cEASY LAYOUT-CARD ${pjson.version} IS LOADING`, "color: green; font-weight: bold", "");

const layoutCard: LayoutCardConstructor = customElements.get("layout-card");
const layoutCardEditor: LayoutCardEditor = customElements.get("layout-card-editor");
let registrations = 0;

if (layoutCard) {
    registerEasyLayoutCard(layoutCard);
    registrations++;
}
if (layoutCardEditor) {
    registerEasyLayoutCardEditor(layoutCardEditor);
    registrations++;
}

// layout-card or layout-card-editor is not yet available, wrap the customElements.define function until the layout-card registers
if (registrations < 2) {
    console.info(`%cEASY LAYOUT-CARD ${pjson.version} IS WAITING FOR THE LAYOUT-CARD TO BE AVAILABLE`, "color: red; font-weight: bold", "");

    const originalCustomElementsDefine = customElements.define;
    customElements.define = function wrappedDefine() {
        if (arguments.length == 2) {
            if (arguments[0] === "layout-card" && typeof arguments[1] != void 0) {
                registerEasyLayoutCard(arguments[1]);
                registrations++;
            } else if (arguments[0] === "layout-card-editor" && typeof arguments[1] != void 0) {
                registerEasyLayoutCardEditor(arguments[1]);
                registrations++;
            }
        }
        originalCustomElementsDefine.apply(customElements, arguments);
        if (registrations == 2) {
            //Deregister the define wrapper
            customElements.define = originalCustomElementsDefine;
        }
    };
}
