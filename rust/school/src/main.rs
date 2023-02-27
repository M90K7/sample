#![feature(drain_filter)]

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
            Command::Delete(id_opt) => {
                if let Some(id) = id_opt {
                    let student = db.student.remove(id);
                    match student {
                        Some(s) => console::print_remove_student(&s),
                        None => console::print_not_fount_student(),
                    }
                    console::print_read_menu();
                } else {
                    console::print_read_menu();
                }
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
}
