export function pF(n) { return parseFloat(n.toFixed(4)); }
export async function loadTextFile(file) {
    try{ const rtrn = await fetch(file);
        if(!rtrn.ok) { throw new Error(); }
        const txt = await rt.text();
        return txt;
    }catch(error){
        console.error(error); return null;
    }
}