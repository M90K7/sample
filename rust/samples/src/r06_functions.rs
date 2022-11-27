pub fn test() {
    println!("function test()");
    println!("additions {}", additions(2, 5));

    let a = 25;
    println!("additions {}", additions(a, 5));

    let full_name = { format!("{} {}", "name", "shahsavan") };

    println!("fullName: {}", full_name);

    primitive_and_not_primitive();
}

fn additions(a: i32, b: i32) -> i32 {
    a + b
}

fn primitive_and_not_primitive() {
    // borrowed

    let mut num_1 = 100;
    let num_2 = &mut num_1;

    /*
     *   * -> *num_2 is de ref operator when we use a variable as a mutable variable.
     *   So to Update the actual value of the variable, which it is pointing to, we will use these star operator.
     */
    *num_2 = 101;

    println!("a, b = {}, {}", 1, num_2);
    println!("a, b = {}, {}", num_1, 0);

    let mut str_1 = String::from("moslem");
    let mut str_2 = &mut str_1;

    let mut str_clone = str_2.clone();

    //str_2.push_str(&" shahsavan");

    str_2.push_str(" ** ");
    add_family(&mut str_2);

    str_clone.push_str(" shahsavan");

    println!("s1= {}, s-clone= {}", str_1, str_clone);

    let mut ref_mut = vec![4, 5, 6];
    let ref1 = &mut ref_mut;
    // let ref2 = &mut refNum;

    ref1.push(7);
    println!("ref_mut, ref1 = {:?}, {:?}", "borrowed", ref1);

    // ref_mut.push(8);
    // println!("refMut = {:?}", ref_mut);

    let mut ref_immutable = vec![4, 5, 6];
    let ref21 = &ref_immutable;
    let ref22 = &ref_immutable;

    // ref_immutable.push(10);

    println!(
        "ref_immutable, ref22 = {:?}, {:?}, {:?}",
        ref_immutable, ref21, ref22
    );

    ref_immutable.push(7);
    println!("ref_immutable = {:?}", ref_immutable);

    let s1 = "moslem";
    let s2 = "shahsavan";
    let mut s3 = s1.to_string() + s2;

    let mut str_1 = String::from("moslem");
    let str_2 = "ss"; // String::from("moslem");
                      // let str_2 = &str_1;

    str_1 += str_2;

    let s4 = "m ".to_string() + "s";

    let s = String::from("🎃");
    println!("len: {}, capacity: {}", s.len(), s.capacity());

    let one = "string";
    let two = "something else";
    let three = format!("{}{}", one, two);

    // Concatenates literals into a static string slice.
    // yielding an expression of type &'static str
    let three = concat!("moslem", " ", "shahsavan", 10);
    println!("concat data: {}", three);
}

fn add_family(name: &mut String) {
    name.push_str("shahsavan");
}
