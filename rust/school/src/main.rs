mod command;
mod console;
mod mem_db;
mod models;

use mem_db::Storage;
use models::common::Entity;
use models::student::Student;

use crate::command::Command;

fn main() {
    let mut students: Vec<Student> = vec![];
    let mut db = Storage::new(&mut students);
    db.load();

    console::print_menus();
    loop {
        match Command::read() {
            Command::Exit => {
                console::print_exit();
                break;
            }
            Command::List => {
                console::print_students(db.student.list().unwrap());
                console::print_read_menu();
            }
            _ => {
                console::print_invalid_menu();
            }
        }
    }

    // let mut s = db
    //     .student
    //     .new(String::from("Moslem"), String::from("Shahsavan"));
    // s.age = 10;

    // db.student.add(&s);

    _ = db.save();

    // println!("{:?}", s);
    // storage.newStudent().
    // let s = Student {};
    println!("Hello, world!");
}
