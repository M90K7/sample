pub fn test() {
    let mut p1 = Person::new();

    println!("person info is {:#?}", p1);
    let v = (&p1).is_valid_email();

    let p11 = &p1;
    let vv = (*p11).is_valid_email();

    // dbg! macro
    dbg!(vv, v);
    dbg!(&p1);

    println!(
        "The first person email is {} and valid {}",
        "p1.email",
        p1.is_valid_email()
    );

    // println!("Person trait impl {}", p1.print_name());
    // p1.print();

    let p2 = Person {
        email: String::from("test.com"),
        //..Person::new() //,
        ..p1 // <- barrow HEAP fields unless define fields like email
    };

    println!(
        "The first person email is {} and valid {}",
        p2.email,
        p2.is_valid_email()
    );

    println!(
        "The first and second person email is {}, {}",
        p1.email, p2.email
    );

    let mut point = Point3D(10, 20, 15);

    println!(
        "My point is {} + {} + {} = {}",
        point.0,
        point.1,
        point.2,
        Point3D::sum(&point)
    );

    let aq = AlwaysEqual;

    let msg = MessageInfo::Success(String::from("Server error"), 20);
    print_msg_info(&msg);
    msg.print();

    let n = Some(2);
    if let Some(s) = n {
        println!("1 = 1 is {}", s);
    }

    if let MessageInfo::Error(text) = msg {
        println!("if let Message error: {}", text);
    }

    let logType = LogKind::Debug;
    if let LogKind::Debug = logType {
        println!("logType: {:?}", logType as i32);
    }
}

#[derive(Debug)]
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

    fn is_valid_email(self: &Self) -> bool {
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

struct AlwaysEqual;

enum MessageInfo {
    Error(String),
    Success(String, i32),
    Ok,
    Warning,
}

fn print_msg_info(x: &MessageInfo) {
    match x {
        MessageInfo::Error(t) => println!("Message error text is: {:?}", t),
        _ => (),
    }
}

impl MessageInfo {
    fn print(&self) {
        match self {
            MessageInfo::Error(t) => println!("Message error text is: {:?}", t),
            _ => (),
        }
    }
}

enum LogKind {
    Info = 5,
    Warning,
    Debug,
}
