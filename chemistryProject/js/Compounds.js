AFRAME.registerComponent("atoms", {
  init: async function () {
    var compounds = await this.getCompounds();

    var barcodes = Object.keys(compounds);

    barcodes.map(barcode => {
      var element = compounds[barcode];
      this.createAtoms(element);
    });
  },
  getCompounds: function () {
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
  getElementColors: function () {
    return fetch("js/elementColors.json")
      .then(res => res.json())
      .then(data => data);
  },
  createAtoms: async function (element) {
    var elementName = element.element_name;
    var barcodeValue = element.barcode_value;
    var numOfElectron = element.number_of_electron;
    var colors = await this.getElementColors();

    var scene = document.querySelector("a-scene");

    //add marker
    var marker = document.createElement("a-marker");
    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("element_name", elementName);
    marker.setAttribute("value", barcodeValue);
    marker.setAttribute("markerhandler", {});
    scene.appendChild(marker);

    var atom = document.createElement("a-entity");
    atom.setAttribute("id", `${elementName}-${barcodeValue}`);
    marker.appendChild(atom);

    //add atom card
    var card = document.createElement("a-entity");
    card.setAttribute("id", `card-${elementName}`);
    card.setAttribute("geometry", {
      primitive: "plane",
      width: 1,
      height: 1
    });

    card.setAttribute("material", {
      src: `./assets/atom_cards/card_${elementName}.png`
    });
    card.setAttribute("position", { x: 0, y: 0, z: 0 });
    card.setAttribute("rotation", { x: -90, y: 0, z: 0 });

    atom.appendChild(card);

    //add nucleus
    var nucleusRadius = 0.2;
    var nucleus = document.createElement("a-entity");

    nucleus.setAttribute("id", `nucleus-${elementName}`);
    nucleus.setAttribute("geometry", {
      primitive: "sphere",
      radius: nucleusRadius
    });

    nucleus.setAttribute("material", "color", colors[elementName]);
    nucleus.setAttribute("position", { x: 0, y: 1, z: 0 });

    nucleus.setAttribute("rotation", { x: 0, y: 0, z: 0 });

    var nuclesName = document.createElement("a-entity");
    nuclesName.setAttribute("id", `nucleus-name-${elementName}`);
    nuclesName.setAttribute("position", { x: 0, y: 0.21, z: -0.06 });
    nuclesName.setAttribute("rotation", { x: -90, y: 0, z: 0 });
    nuclesName.setAttribute("text", {
      font: "monoid",
      width: 3,
      color: "black",
      align: "center",
      value: elementName
    });

    nucleus.appendChild(nuclesName);

    atom.appendChild(nucleus);
    var orbitAngle = -180;
    var electronAngle = 30;
    for (var num = 1; num <= numOfElectron; num++) {
      var orbit = document.createElement("a-entity");
      orbit.setAttribute("geometry", {
        primitive: "torus",
        arc: 360,
        radius: 0.28,
        radiusTubular: 0.001
      });

      orbit.setAttribute("material", {
        color: "blue",
        opacity: 0.3
      });
      orbit.setAttribute("position", {
        x: 0,
        y: 1,
        z: 0
      });

      orbit.setAttribute("rotation", {
        x: 0,
        y: orbitAngle,
        z: 0
      });

      orbitAngle += 45;

      atom.appendChild(orbit);

      var electronGroup = document.createElement("a-entity");
      electronGroup.setAttribute("id", `electron-group-${elementName}`);

      orbit.appendChild(electronGroup);

      var electron = document.createElement("a-entity");
      electron.setAttribute("id", `electron-${elementName}`);
      electron.setAttribute("geometry", {
        primitive: "sphere",
        radius: 0.02
      });

      electron.setAttribute("material", { color: "#0d47a1", opacity: 0.6 });
      electron.setAttribute("position", {
        x: 0.2,
        y: 0.2,
        z: 0
      });

      electronGroup.setAttribute("rotation", {
        x: 0,
        y: 0,
        z: electronAngle
      });

      electronAngle += 65;

      electronGroup.appendChild(electron);

      electronGroup.setAttribute("animation", {
        property: "rotation",
        to: `0 0 -360`,
        loop: "true",
        dur: 3500,
        easing: "linear"
      });
    }

    // adding compounds
    var compounds = element.compounds;
    compounds.map(item => {
      var compound = document.createElement("a-entity");
      compound.setAttribute("id", `${item.compound_name}-${barcodeValue}`);
      compound.setAttribute("visible", false);
      marker.appendChild(compound);

      var compoundCard = document.createElement("a-entity");
      compoundCard.setAttribute("id", `compound-card-${item.compound_name}`);
      compoundCard.setAttribute("geometry", {
        primitive: "plane",
        width: 1.2,
        height: 1.7
      });

      compoundCard.setAttribute("material", {
        src: `./assets/compound_cards/card_${item.compound_name}.png`
      });
      compoundCard.setAttribute("position", { x: 0, y: 0, z: 0.2 });
      compoundCard.setAttribute("rotation", { x: -90, y: 0, z: 0 });

      compound.appendChild(compoundCard);

      var posX = 0;
      item.elements.map((m, index) => {
        var n = document.createElement("a-entity");
        n.setAttribute("id", `compound-nucleus-${m}`);
        n.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.2
        });
        n.setAttribute("material", "color", colors[m]);
        n.setAttribute("position", { x: posX, y: 1, z: 0 });
        posX += 0.35;

        compound.appendChild(n);

        var nuclesName = document.createElement("a-entity");
        nuclesName.setAttribute("id", `compound-nucleus-name-${m}`);
        nuclesName.setAttribute("position", { x: 0, y: 0.21, z: 0 });
        nuclesName.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        nuclesName.setAttribute("text", {
          font: "monoid",
          width: 3,
          color: "black",
          align: "center",
          value: m
        });

        n.appendChild(nuclesName);
      });
    });
  }
});
