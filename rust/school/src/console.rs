use std::io::{stdout, Write};

use crate::models::student::Student;

pub fn print_menus() {
    write(
        "Welcome To School Manager

*** Menus  
  I > Insert student
  U > Update student
  D > Delete student
  X > Exit

Please enter command menu :> ",
    );
}

pub fn print_read_menu() {
    write("\n:> ");
}

pub fn print_student(student: &Student) {
    write(format!("id: {}, name: {}\n", student.id.to_string(), student.name).as_str());
}

pub fn print_students(students: &[Student]) {
    for student in students {
        write(format!("id: {}, name: {}\n", student.id.to_string(), student.name).as_str());
    }
}

pub fn print_invalid_menu() {
    clear();
    print_menus();
}
pub fn print_exit() {}

fn clear() {
    write("\x1B[2J\x1B[1;1H");
}

fn write(text: &str) {
    let mut stdout = stdout();
    stdout.write(text.as_bytes());
    stdout.flush().unwrap();
}
