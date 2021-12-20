var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }

  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = resultSet.concat(result);
  }

  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

// selectorTypeMatcher('#idEnuel') --> "id"
// selectorTypeMatcher('.classEnuel') --> "class"
// selectorTypeMatcher('h1') --> "tag"
// selectorTypeMatcher('h1.classEnuel') --> "tag.class"

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === "#") {
    return "id";
  }
  if (selector[0] === ".") {
    return "class";
  }
  if (selector.split(".").length > 1) {
    return "tag.class";
  }
  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector); //"id", "class", "tag", "tag.class"
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (el) {
      //el (Elemento HTML) vs selector (#idEjemplo)
      // idEjemplo === #idEmeplo <-- Tendre que quitar el # o agregarle al primero.
      return "#" + el.id === selector;
    };
  } else if (selectorType === "class") {
    matchFunction = function (el) {
      // el (Elemento HTML) vs selector (.classOne)
      var classes = el.classList; // Devuelve una lista con las clases
      for (let i = 0; i < classes.length; i++) {
        if ("." + classes[i] === selector) {
          return true;
        }
      }
      return false;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = function (el) {
      // selector --> "h1.classOne"
      var [tag, clase] = selector.split("."); //["h1", "classOne"]
      return matchFunctionMaker(tag)(el) && matchFunctionMaker("." + clase)(el);
    };
  } else if (selectorType === "tag") {
    var matchFunction = function (el) {
      return el.tagName && el.tagName.toLowerCase() === selector.toLowerCase();
    };
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
