use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    loop {
        let secret_number = rand::thread_rng().gen_range(1..=10);
        println!("Whats your number:");

        let mut num = String::new();
        io::stdin().read_line(&mut num).expect("can't read");

        let num: i32 = match num.trim().parse() {
            Ok(n) => n,
            Err(_) => continue,
        };

        match num.cmp(&secret_number) {
            Ordering::Greater => println!("\tTo Big!"),
            Ordering::Less => println!("\tTo Small!"),
            Ordering::Equal => {
                println!("You Win!");
                break;
            }
        }

        println!("\tSecret is: {secret_number}");
    }
}
