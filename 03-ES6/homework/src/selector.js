var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

// selectorTypeMatcher('#idEnuel') --> "id"
// selectorTypeMatcher('.classEnuel') --> "class"
// selectorTypeMatcher('h1') --> "tag"
// selectorTypeMatcher('h1.classEnuel') --> "tag.class"

var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === "#") {
    return "id";
  }
  if(selector[0] === ".") {
    return "class";
  }
  if(selector.split(".").length > 1) {
    return "tag.class";
  }
  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector); //"id", "class", "tag", "tag.class"
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (el) {
    //el (Elemento HTML) vs selector (#idEjemplo)
    // idEjemplo === #idEmeplo <-- Tendre que quitar el # o agregarle al primero.
    return "#" + el.id === selector;
    }
  } else if (selectorType === "class") {
    
  } else if (selectorType === "tag.class") {
    
  } else if (selectorType === "tag") {
    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
