/*
A path can take two forms:
    An absolute path is the full path starting from a crate root; for code from an external crate, the absolute path begins with the crate name, and for code from the current crate, it starts with the literal crate.
    A relative path starts from the current module and uses self, super, or an identifier in the current module.

Both absolute and relative paths are followed by one or more identifiers separated by double colons (::).

*/

pub fn test() {
    println!("call from utils test()");

    // absolute path
    crate::common::test2();

    // relative path ../..
    super::test();
    super::super::common::test();

    // current module path
    self::test2();
    self::date::test();
}

fn test2() {
    println!("call from utils test2()");
}

mod date {
    pub fn test() {
        println!("call from utils::date test()");
    }
}
