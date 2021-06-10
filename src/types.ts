import { LitElement } from "lit-element";

export interface CardConfig {
    type: string;
    entity?: string;
    view_layout?: {
        show?:
            | "always"
            | "never"
            | {
                  mediaquery: string;
              };
        column?: number;
    };
}

export interface LayoutCardConfig {
    type: string;
    cards?: Array<CardConfig>;
    entities?: Array<CardConfig>;
    layout_type?: string;
    layout?: any;
    layout_options?: any; // legacy
    placeholder?: string;
}

export interface LayoutCardConstructor extends LitElement {
    new (...args): LitElement;

    setConfig(config: any): void;
}

export interface LayoutCardEditor extends LitElement {
    new (...args): LitElement;

    _config: CardConfig;

    _renderCardsEditor(): any;
}
