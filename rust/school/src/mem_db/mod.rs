use std::{
    fmt::Error,
    fs::{read_to_string, write},
};

use crate::models::common::{Entity, Predicate};
use crate::models::student::Student;

pub struct Storage<'t> {
    pub student: DbEntity<'t, Student>,
}

impl Storage<'_> {
    pub fn new<'t>(vec: &'t mut Vec<Student>) -> Storage<'t> {
        Storage {
            student: DbEntity { data: vec },
        }
    }

    pub fn load(&mut self) {
        let input = read_to_string("./db.txt").unwrap_or(String::new());

        if input.is_empty() {
            return;
        }
        let mut lines = input.split("\n");
        for line in lines {
            if line.is_empty() {
                continue;
            }
            let mut s_str = line.split(";");

            let id = u32::from_str_radix(s_str.next().unwrap_or("0"), 10);
            let name = s_str.next().unwrap_or("").to_string();
            let family = s_str.next().unwrap_or("").to_string();
            let age = u32::from_str_radix(s_str.next().unwrap_or("0"), 10);

            self.student.add(&Student {
                id: id.unwrap_or(0),
                name: name,
                family: family,
                age: age.unwrap_or(0),
            });
            // u8::from_str_radix(src, radix)
        }
    }

    pub fn save<'t>(&self) -> Result<(), Error> {
        let mut text = String::new();
        for student in self.student.data.iter() {
            text.push_str(
                format!(
                    "{0};{1};{2};{3}\n",
                    student.id, student.name, student.family, student.age
                )
                .as_str(),
            );
        }
        _ = write("./db.txt", text);
        Ok(())
    }
}

pub struct DbEntity<'t, T> {
    data: &'t mut Vec<T>,
}

impl Entity<Student> for DbEntity<'_, Student> {
    fn new<'t>(&self, name: String, family: String) -> Student {
        Student {
            id: 0,
            age: 0,
            name,
            family,
        }
    }

    fn add<'t>(&mut self, entity: &'t Student) -> Option<&'t Student> {
        self.data.push(entity.clone());
        Option::Some(entity)
    }

    fn update<'t>(entity: &'t Student) -> Option<bool> {
        todo!()
    }

    fn remove(id: i32) -> Option<bool> {
        todo!()
    }

    fn list(&self) -> Option<&Vec<Student>> {
        Option::Some(self.data)
    }

    fn find<'t>(id: i32) -> Result<&'t Student, bool> {
        todo!()
    }

    fn filter(predicate: Predicate<Student>) -> Option<&'static [Student]> {
        todo!()
    }
}
