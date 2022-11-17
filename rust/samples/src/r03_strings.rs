pub fn strings() {
    let name = "moslem";
    let name = name.to_string() + " 🛕 Shahsavan \u{4500}";

    println!(
        "name is {}
len: {}
capacity: {} bytes
chars count: {}",
        name,
        name.len(),
        name.capacity(),
        name.chars().count()
    );

    let mut name = String::from("Moslem");
    name.push('🛕');
    name.push_str("Shahsavan");
    let last_char_name = name.pop(); // remove and return last character

    let fmt = format!(
        "my format is {}",
        name + &last_char_name.unwrap().to_string()
    );
    println!("{}", fmt);

    let mut name = String::new();
    name.push_str("shahsavan");
    println!("String::new {}", name);

    let num = (3.1).to_string() + &4.to_string();
    println!("{}", num);
}
