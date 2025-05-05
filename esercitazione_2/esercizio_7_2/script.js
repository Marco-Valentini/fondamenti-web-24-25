const textBox = document.querySelector("#textBox");
const output = document.querySelector("#output");
textBox.addEventListener("keydown", (event) => {
    output.textContent = `You pressed "${event.key}".`;
});
//TODO per casa: e se volessimo riconoscere una determinata sequenza di tasti premuti per innescare un'azione (es alert)?

/* descrizione completa

https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events#extra_properties_of_event_objects*/