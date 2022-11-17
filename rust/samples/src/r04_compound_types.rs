pub fn compounds_types() {
    //          Tuples
    let name: (&str, i32) = ("moslem", 1990);
    println!("{} {}", name.0, name.1);

    // destructing
    let (name, age) = name;
    println!("{} {}", name, age);

    let info = (("moslem", "shahsavan"), 1990, (10, 20));
    println!("{} {}", info.0 .1, info.1);

    //          Arrays

    let mut arr = [0 as u32; 10];
    println!("array is {:?}", arr);

    arr[0] = std::u32::MAX;
    println!("index 0 is {}", arr.get(0).unwrap());

    println!(
        "Array length is {} and capacity {} bytes",
        arr.len(),
        std::mem::size_of_val(&arr)
    );

    println!("Range[0..=3] of array is {:?}", &arr[0..=3]);
}
