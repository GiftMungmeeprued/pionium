function handleConst(element) {
  const overlay = HSOverlay.getInstance(
    '[data-hs-overlay="#physical-constants"]',
    true
  );
  overlay.element.close();
  const MQ = MathQuill.getInterface(2);
  const mathField = MQ.MathField(document.getElementById("math-field"));
  const constName = element.firstChild.lastChild.children[2].textContent;
  mathField.typedText("\\mathrm " + constName);
  mathField.keystroke("Right");
  if (constName.includes("_")) {
    mathField.keystroke("Right");
  }
  mathField.focus();
}

function handlePrefix(element) {
  const overlay = HSOverlay.getInstance('[data-hs-overlay="#prefixes"]', true);
  overlay.element.close();
  const MQ = MathQuill.getInterface(2);
  const mathField = MQ.MathField(document.getElementById("math-field"));
  const prefix = element.firstChild.children[1].textContent;
  mathField.typedText(prefix);
  mathField.focus();
}
