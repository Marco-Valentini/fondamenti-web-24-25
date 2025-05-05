const persona1 = { name: "Marco", cognome:"Valentini", address: { city: "Taranto" } };
const persona1_bis = { name: "Marco", cognome:"Valentini", address: { city: "Taranto" } };
const persona2 = { name: "Antonio", cognome:"Ferrara", address: { city: "Corato"} };

// confronto profondo
function deepEqual(a, b) {
    if (a === b) return true;

    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
        return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
            return false;
        }
    }

    return true;
}

console.log(persona1_bis === persona1); // false
console.log(deepEqual(persona1, persona2)) // false
console.log(deepEqual(persona1, persona1_bis)) // true


