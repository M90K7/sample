pub fn vector() {
    let mut nums: Vec<i32> = vec![1, 2, 3];
    nums.push(4);

    nums.pop();

    nums.remove(0);

    println!("{:?}", nums);

    println!("{:?}", nums.get(0));

    println!("Vector len {}, capacity {}", nums.len(), nums.capacity());

    let mut names = vec!["moslem"; 1];

    names.push("shahsavan");

    names.splice(1..1, ["🛕"]);

    println!("My name is {:?}", names);

    println!("family array is {:?}", &names[2..]);

    unsafe {
        // This is a low-level operation that maintains none of the normal invariants of the type.
        // Normally changing the length of a vector is done using one of the safe operations instead,
        // such as truncate, resize, extend, or clear.

        names.set_len(0);
        println!("My name is {:?}", names);
    }
}
