import { LayoutCardEditor } from "./types";
import pjson from "../package.json";

export function registerEasyLayoutCardEditor(layoutCardEditor: LayoutCardEditor) {
    class EasyLayoutCardEditor extends layoutCardEditor {
        _renderCardsEditor(): any {
            // @ts-ignore
            const _entities = this._config.entities;
            // @ts-ignore
            delete this._config.entities;
            // @ts-ignore
            const retVal = super._renderCardsEditor();
            // @ts-ignore
            this._config.entities = _entities;
            return retVal;
        }
    }

    customElements.define("easy-layout-card-editor", EasyLayoutCardEditor as CustomElementConstructor);

    console.info(`%cEASY LAYOUT-CARD-EDITOR ${pjson.version} IS INSTALLED`, "color: green; font-weight: bold", "");
}
