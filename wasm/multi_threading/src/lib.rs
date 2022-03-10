extern crate console_error_panic_hook;
use js_sys::Int32Array;
use rayon::prelude::*;
use std::panic;
use wasm_bindgen::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;

#[wasm_bindgen(start)]
pub fn start() -> Result<(), JsValue> {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
    Ok(())
}

#[wasm_bindgen(js_name = sortParallel)]
pub fn sort_parallel(numbers: Int32Array) -> Int32Array {
    let mut vec = numbers.to_vec();
    vec.par_sort();
    Int32Array::from(vec.as_slice())
}
