fn variables() {
  // mutable variables
  let x: i128 = std::i128::MAX;

  // immutable variables
  let mut v: u128 = std::u128::MIN;
  v = std::u128::MAX;

  println!("{}  > i128 < {}", std::i128::MIN, std::i128::MAX);
  println!("{}  > u128 < {}", std::u128::MIN, v);

  const z: u32 = 40;

  let a3: [u8; 5] = [3; 5];

  println!("a3 is {:#?}", a3);
}
