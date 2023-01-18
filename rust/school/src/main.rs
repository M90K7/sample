mod mem_db;
mod models;

use mem_db::Storage;
use models::student::Student;

use crate::models::common::Entity;

fn main() {
    let mut students: Vec<Student> = vec![];
    let mut storage = Storage::new(&mut students);

    storage.load();

    let mut s = storage
        .student
        .new(String::from("Moslem"), String::from("Shahsavan"));
    s.age = 10;

    storage.student.add(&s);

    _ = storage.save();

    println!("{:?}", s);
    // storage.newStudent().
    // let s = Student {};
    println!("Hello, world!");
}
