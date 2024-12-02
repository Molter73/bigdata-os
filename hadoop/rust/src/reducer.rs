use efflux::prelude::*;

fn main() {
    efflux::run_reducer(MonthCounterReducer);
}

struct MonthCounterReducer;

impl Reducer for MonthCounterReducer {
    fn reduce(&mut self, key: &[u8], values: &[&[u8]], ctx: &mut Context) {
        let key = std::str::from_utf8(key).unwrap();
        ctx.write_fmt::<&str, usize>(key, values.len())
    }
}
