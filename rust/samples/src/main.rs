// include!("./01_print_fmt.rs");

// mod r01_print_fmt;
// mod r02_variables;
// mod r03_strings;
// mod r04_compound_types;
// mod r05_vector;
// mod r06_functions;
// mod r07_statements;
// mod r08_structures;
// mod r09_generics;
mod r10_hash_map;

mod common;

// use common::utils;
use common::utils::{self};

fn main() {
    println!("Hello main!");

    // r01_print_fmt::print_fmt();
    // r02_variables::variables();
    // r03_strings::strings();
    // r04_compound_types::compounds_types();
    // r05_vector::vector();
    // r06_functions::test();
    // r07_statements::test();
    // r08_structures::test();
    // r09_generics::test();
    r10_hash_map::test();

    utils::test()
}
