import { LayoutCardConfig } from "./types";
import { LayoutCardConstructor } from "./types";
import pjson from "../package.json";

export function registerEasyLayoutCard(layoutCard: LayoutCardConstructor) {
    class EasyLayoutCard extends layoutCard {
        static getConfigElement() {
            return document.createElement("easy-layout-card-editor");
        }
        setConfig(config: LayoutCardConfig) {
            const _config = { ...config };

            _config.type = "custom:layout-card";
            // special handling for integration with auto-entities, which will set the entities property
            if (_config.entities) {
                // if cards has been defined and contains actual cards, we clone the card and replace placeholders for entities
                if (_config.cards) {
                    _config.cards = _config.entities.map((entity) => {
                        //Typing is a bit wonky here. this._config.cards doesn't seem to be an actual CardConfig(at least with the auto-entities config)
                        let stringifiedCardConfig = JSON.stringify(_config.cards);
                        let placeholderName = _config.placeholder || "this.entity_id";
                        stringifiedCardConfig = stringifiedCardConfig.split(placeholderName).join(entity.entity);
                        const cardClone = JSON.parse(stringifiedCardConfig);
                        return cardClone;
                    });
                    _config.cards = [].concat(..._config.cards);
                    delete _config.entities;
                }
            }

            // @ts-ignore
            super.setConfig(_config);
        }
    }

    customElements.define("easy-layout-card", EasyLayoutCard as CustomElementConstructor);
    (window as any).customCards = (window as any).customCards || [];
    (window as any).customCards.push({
        type: "easy-layout-card",
        name: "Easy Layout Card",
        preview: false,
        description: "Like a layout-card, but with easier card configuration.",
    });

    console.info(`%cEASY LAYOUT-CARD ${pjson.version} IS INSTALLED`, "color: green; font-weight: bold", "");
}
