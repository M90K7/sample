use std::collections::HashMap;

pub fn test() {
    let mut wordDic: HashMap<&str, i32> = HashMap::new();

    wordDic.entry("Moslem").or_insert(32);

    if let Option::Some(age) = wordDic.get("Moslem") {
        println!("Moslem age is {}", age);
    }
}
