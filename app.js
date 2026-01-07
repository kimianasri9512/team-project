const KEY = "mini_shop_cart";

function getCart(){
  try{ return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch{ return []; }
}
function saveCart(cart){
  localStorage.setItem(KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(item){
  const cart = getCart();
  const existing = cart.find(x => x.id === item.id);
  if(existing) existing.qty += 1;
  else cart.push({...item, qty:1});
  saveCart(cart);
  toast("به سبد اضافه شد ✅");
}
function removeFromCart(id){
  const cart = getCart().filter(x => x.id !== id);
  saveCart(cart);
}
function clearCart(){
  saveCart([]);
}
function cartCount(){
  return getCart().reduce((a,b)=>a+b.qty,0);
}
function updateCartCount(){
  const el = document.querySelector("[data-cartcount]");
  if(el) el.textContent = cartCount();
}

function toast(msg){
  const t = document.querySelector(".toast");
  if(!t) return;
  t.textContent = msg;
  t.style.display = "block";
  clearTimeout(window.__t);
  window.__t = setTimeout(()=> t.style.display="none", 1600);
}

document.addEventListener("DOMContentLoaded", updateCartCount);