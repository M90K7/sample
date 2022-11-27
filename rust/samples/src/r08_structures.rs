use std::ops::Index;

pub fn test() {
    let mut p1 = Person::new();

    println!(
        "The first person email is {} and valid {}",
        p1.email,
        p1.is_valid_email()
    );

    println!("Person trait impl {}", p1.print_name());
    p1.print();

    let p2 = Person {
        email: String::from("test.com"),
        ..p1 // <- barrow HEAP fields unless define fields like email
    };
    println!(
        "The first person email is {} and valid {}",
        p2.email,
        p2.is_valid_email()
    );

    println!(
        "The first and second person email is {}, {}",
        p1.email, p2.name
    );

    let mut point = Point3D(10, 20, 15);

    println!(
        "My point is {} + {} + {} = {}",
        point.0,
        point.1,
        point.2,
        Point3D::sum(&point)
    );
}

struct Person {
    name: String,
    age: usize,
    email: String,
}

impl Person {
    fn new() -> Self {
        Self {
            name: String::from("Moslem"),
            age: 32,
            email: String::from("m@g.com"),
        }
    }

    fn is_valid_email(&self) -> bool {
        if *&self.email.find("@").is_some() {
            true
        } else {
            false
        }
    }
}

// Tuple Structure

struct Point3D(i32, i32, i32);

impl Point3D {
    fn new() -> Self {
        Self(0, 0, 0)
    }
    fn sum(&self) -> i32 {
        &self.0 + &self.1 + &self.2
    }
}

trait NameInfo {
    fn print(&self) {
        println!("Do not implement print function");
    }
    fn print_name(&self) -> &str;
}

impl NameInfo for Person {
    fn print_name(&self) -> &str {
        &self.name
    }
}
