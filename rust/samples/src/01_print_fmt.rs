fn print_fmt() {
  println!("hello {}", "print_fmt");
  println!(
    "name {name} and {family}",
    name = "moslem",
    family = "shahsavan"
  );

  println!("name {1} and family {0}", "shahsavan", "moslem");

  println!(
    "My name is
  moslem 
     shahsavan."
  )
}
