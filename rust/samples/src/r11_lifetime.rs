pub fn test() {
    let full_name = return_string() + return_str();
    println!("name is {}", full_name);
    let p = Person { name: &full_name };

    println!("Person name is {}", p.name);

    let mut s = return_str_wite_params("ali", &p);
    let p2 = Person { name: s };
    s = return_str_wite_params(s, &p2);
    println!("s is {}", s);
}

fn variables() {
    // let mut x;
    // {
    //     let y = 20;
    //     x = &y;
    // }

    // println!("x is {}", x);
}

fn return_string() -> String {
    String::from("Moslem*")
}

fn return_str<'a>() -> &'a str {
    "shahsavan"
}

fn return_str_wite_params<'a>(s1: &'a str, s2: &'a Person) -> &'a str {
    s2.name
}

struct Person<'a> {
    name: &'a str,
}

impl ToString for Person<'_> {
    fn to_string(&self) -> String {
        String::from(self.name)
    }
}
