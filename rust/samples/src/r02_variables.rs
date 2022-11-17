pub fn variables() {
    // mutable variables
    let x: i128 = std::i128::MAX;

    // immutable variables
    let mut v: u128 = std::u128::MIN; // warning: value assigned to `v` is never read
    v = std::u128::MAX;

    println!("{}  > i128 < {}", std::i128::MIN, std::i128::MAX);
    println!("{}  > u128 < {}", std::u128::MIN, v);

    const Z_CONST: u32 = 15;

    println!(
        "Decimal: {}, Hex: {:X}, Octal: {:o}, Binary: {:b},",
        Z_CONST, Z_CONST, Z_CONST, Z_CONST
    );

    let a3: [u8; 5] = [3; 5];

    println!("a3 is {:#?}", a3);

    let number = 3.14 as i32;
    println!("convert number to {:#?}", number);
}
