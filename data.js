/* Shared data + helpers for Sole Ledger (public + admin pages) */

function slugify(str){
  return String(str).toLowerCase()
    .replace(/['’]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}

function newId(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const DEFAULT_PRODUCTS = [
  { name: "Nike Dunk Low - Black", sizes: [
    {us:"9",   uk:"8",   eur:"42.5", cm:"27",   qty:2},
    {us:"9.5", uk:"8.5", eur:"43",   cm:"27.5", qty:1},
    {us:"10",  uk:"9",   eur:"44",   cm:"28",   qty:1},
    {us:"10.5",uk:"9.5", eur:"44.5", cm:"28.5", qty:1},
  ]},
  { name: "W Nike Dunk Low - Black", sizes: [
    {us:"6",   uk:"3.5", eur:"36.5", cm:"23",   qty:1},
    {us:"5.5", uk:"3",   eur:"36",   cm:"22.5", qty:1},
  ]},
  { name: "Nike Dunk Low - Blue", sizes: [
    {us:"7.5", uk:"6.5", eur:"40.5", cm:"25.5", qty:1},
    {us:"8.5", uk:"7.5", eur:"42",   cm:"26.5", qty:1},
    {us:"7",   uk:"6",   eur:"40",   cm:"25",   qty:1},
  ]},
  { name: "W Nike Dunk Low - Blue", sizes: [
    {us:"6",   uk:"3.5", eur:"36.5", cm:"23",   qty:1},
  ]},
  { name: "Nike Court Vision", sizes: [
    {us:"10",  uk:"9",   eur:"44",   cm:"28",   qty:1},
  ]},
  { name: "Wmns Air Force 1 '07", sizes: [
    {us:"6",   uk:"3.5", eur:"36.5", cm:"23",   qty:1},
  ]},
  { name: "Nike Dunk Low - Green", sizes: [
    {us:"8",   uk:"7",   eur:"41",   cm:"26",   qty:1},
    {us:"6.5", uk:"6",   eur:"39",   cm:"24.5", qty:1},
    {us:"7.5", uk:"6.5", eur:"40.5", cm:"25.5", qty:1},
  ]},
  { name: "Air Force 1 '07 WB Brown", sizes: [
    {us:"9",   uk:"8",   eur:"42.5", cm:"27",   qty:1},
    {us:"8",   uk:"7",   eur:"41",   cm:"26",   qty:1},
  ]},
  { name: "Air Force 1 '07", sizes: [
    {us:"9.5", uk:"8.5", eur:"43",   cm:"27.5", qty:1},
    {us:"10",  uk:"9",   eur:"44",   cm:"28",   qty:1},
    {us:"8.5", uk:"7.5", eur:"42",   cm:"26.5", qty:2},
  ]},
  { name: "Nike S.T. Glow EP", sizes: [
    {us:"7.5", uk:"6.5", eur:"40.5", cm:"25.5", qty:1},
  ]},
];

function buildDefaultInventory(){
  return DEFAULT_PRODUCTS.map(p => ({
    id: newId(),
    slug: slugify(p.name),
    name: p.name,
    sizes: p.sizes.map(s => ({ id: newId(), ...s }))
  }));
}

/* Ensures any inventory (e.g. loaded from inventory.json) has ids/slugs,
   even if the JSON only has {name, sizes}. */
function normalizeInventory(rawList){
  return (rawList || []).map(p => ({
    id: p.id || newId(),
    slug: p.slug || slugify(p.name),
    name: p.name,
    sizes: (p.sizes || []).map(s => ({ id: s.id || newId(), us: s.us, uk: s.uk, eur: s.eur, cm: s.cm, qty: Number(s.qty)||0 }))
  }));
}