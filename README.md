# easy-layout-card

This card is intended to make configuring layout-cards(https://github.com/thomasloven/lovelace-layout-card) easier.
This card DEPENDS on the layout-card to be installed and will NOT work, if you have not installed it!

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

I have struggled a lot to configure my Docker Dashboard which should be dynamically created based on docker containers,
without having to change anything if new containers are started.

# Quick Start

This card behaves like the layout-card and has the same configuration options.
Please check the documentation of the layout-card for general information: https://github.com/thomasloven/lovelace-layout-card
The editor is available and you can create cards, but unfortunately the entity selector does not work with the placeholder.
I would recommend using the code editor to configure the card

Some additional information about the behavior:

-   Using this card only really makes sense if the `entities` parameter is provided in the config. You can do this either manually or automatically with e.g. the auto-entities card(https://github.com/thomasloven/lovelace-auto-entities). If you are not using multiple entities, there should be absolutely no difference to the layout-card

-   You can use `this.entity_id` as a placeholder for the current entity in the config. Yyou can also specify the `placeholder` parameter to have a different replacement value(e.g. if you want to nest the easy-layout-card). Sample:

```yaml
type: custom:auto-entities
card:
    type: custom:easy-layout-card
    cards:
        - type: entities
          entities:
              - entity: <myRandomReplacementValue>
        - type: button
          entity: <myRandomReplacementValue>
    placeholder: <myRandomReplacementValue>
    layout_type: vertical
    layout_options:
        width: 300
filter:
    include:
        - entity_id: switch.docker_b*
```

# Differences between the layout-card and the easy-layout card

I found it very hard to configure my dashboard, because if multiple entities are provided in the configuration, the cards parameter is more or less ignored.
To outline this, I have prepared some examples.

## Basic Example with layout-card

Assume you want to use the layout card to show the entity and the button for it

### Code

```yaml
type: custom:layout-card
cards:
    - type: entities
      entities:
          - entity: switch.docker_binhex_delugevpn
    - type: button
      entity: switch.docker_binhex_delugevpn
layout_type: vertical
layout_options:
    width: 300
```

### Output

![single entity](https://github.com/kamtschatka/lovelace-easy-layout-card/blob/master/.github/images/singleEntity.png?raw=true)

## Basic Example with easy-layout-card

The same output is produced with the easy-layout-card:

### Code

```yaml
type: custom:easy-layout-card
cards:
    - type: entities
      entities:
          - entity: switch.docker_binhex_delugevpn
    - type: button
      entity: switch.docker_binhex_delugevpn
layout_type: vertical
layout_options:
    width: 300
```

### Output

![single entity](https://github.com/kamtschatka/lovelace-easy-layout-card/blob/master/.github/images/singleEntity.png?raw=true)

## Extended Example with layout-card

The behavior that is very hard for me to grasp is when we start to add the auto-entity card around it.
The following sample will just provide 2 entities to the layout card(binhex-delugevpn and binhex-krusader):

### Code

```yaml
type: custom:auto-entities
card:
    type: custom:layout-card
    cards:
        - type: entities
          entities:
              - entity: switch.docker_binhex_delugevpn
        - type: button
          entity: switch.docker_binhex_delugevpn
    layout_type: vertical
    layout_options:
        width: 300
filter:
    include:
        - entity_id: switch.docker_b*
```

### Output

![single entity](https://github.com/kamtschatka/lovelace-easy-layout-card/blob/master/.github/images/twoEntitiesLayoutCard.png?raw=true)

Basically what happens is that both entities are shown, but basically the whole "cards" section of the layout-card is ignored.
My expectation was that the cards section was duplicated for each entity provided. It would also be required to have some kind of placeholder to use in the cards section.

## Extended Example with easy-layout-card

This is where the easy-layout-card comes in. This is the output generated with the exact same yaml configuration, but using the easy-layout-card:

### Code

```yaml
type: custom:auto-entities
card:
    type: custom:easy-layout-card
    cards:
        - type: entities
          entities:
              - entity: switch.docker_binhex_delugevpn
        - type: button
          entity: switch.docker_binhex_delugevpn
    layout_type: vertical
    layout_options:
        width: 300
filter:
    include:
        - entity_id: switch.docker_b*
```

### Output
![twoEntitiesEasyLayoutCard](https://github.com/kamtschatka/lovelace-easy-layout-card/blob/master/.github/images/twoEntitiesEasyLayoutCard.png?raw=true)

## Extended Example with easy-layout-card and placeholders

Since it is probably quite useless to show everything twice, `this.entity_id` can be used to show the cards for each entity:

### Code

```yaml
type: custom:auto-entities
card:
    type: custom:easy-layout-card
    cards:
        - type: entities
          entities:
              - entity: this.entity_id
        - type: button
          entity: this.entity_id
    layout_type: vertical
    layout_options:
        width: 300
filter:
    include:
        - entity_id: switch.docker_b*
```

### Output
![twoEntitiesEasyLayoutCardDynamic](https://github.com/kamtschatka/lovelace-easy-layout-card/blob/master/.github/images/twoEntitiesEasyLayoutCardDynamic.png?raw=true)

## Extended Example with layout-card

So how CAN it be done with the layout-card? TBH for the scenario above, I don't know either.(If you know how, let me know!)
In general the configuration for cards is done at entity level and with the `options` parameter, but it is not quite the same behavior:

### Code

```yaml
type: custom:auto-entities
card:
    type: custom:layout-card
    layout_type: vertical
    layout_options:
        width: 300
filter:
    include:
        - entity_id: switch.docker_b*
          options:
              type: entities
              entities:
                  - entity: this.entity_id
        - entity_id: switch.docker_b*
          options:
              type: button
              entities:
                  - entity: this.entity_id
```

### Output

![twoEntitiesLayoutCardSample](https://github.com/kamtschatka/lovelace-easy-layout-card/blob/master/.github/images/twoEntitiesLayoutCardSample.png?raw=true)
