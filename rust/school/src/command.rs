use crate::console;
use std::{collections::HashMap, io::Read};

#[derive(Clone)]
pub enum Command {
    Insert,
    Update,
    Delete(Option<u32>),
    List,
    Exit,
    None,
}

impl Command {
    pub fn run() {}

    pub fn read() -> Command {
        let mut command_dic: HashMap<String, &dyn Fn() -> Command> = HashMap::new();
        // command_dic.insert("i".to_owned(), Command::Insert);
        // command_dic.insert("u".to_owned(), Command::Update);
        command_dic.insert("d".to_owned(), &Self::read_delete);
        command_dic.insert("l".to_owned(), &(|| Command::List));
        command_dic.insert("x".to_owned(), &(|| Command::Exit));

        let fn_cmd_none: &dyn Fn() -> Command = &|| Command::None;

        let mut input = String::new();
        std::io::stdin()
            .read_line(&mut input)
            .map_or(Command::None, |_| {
                let f = command_dic
                    .get(&input.to_lowercase().trim().to_owned())
                    .unwrap_or(&fn_cmd_none);
                f()
            })
    }

    pub fn insert() {}

    fn read_delete() -> Command {
        console::print_choose_id();

        let mut input = String::new();
        std::io::stdin()
            .read_line(&mut input)
            .map_or(Command::Delete(None), |s| {
                let id = u32::from_str_radix(input.trim(), 10);
                match id {
                    Ok(id) => Command::Delete(Some(id)),
                    Err(_) => Command::Delete(None),
                }
            })
    }
}
