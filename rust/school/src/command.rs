use std::collections::HashMap;

#[derive(Clone)]
pub enum Command {
    Insert,
    Update,
    Delete,
    List,
    Exit,
    None,
}

impl Command {
    pub fn run() {}

    pub fn read() -> Command {
        let mut command_dic: HashMap<String, Command> = HashMap::new();
        command_dic.insert("i".to_owned(), Command::Insert);
        command_dic.insert("u".to_owned(), Command::Update);
        command_dic.insert("d".to_owned(), Command::Delete);
        command_dic.insert("l".to_owned(), Command::List);
        command_dic.insert("x".to_owned(), Command::Exit);

        let mut input = String::new();

        std::io::stdin()
            .read_line(&mut input)
            .map_or(Command::None, |_| {
                command_dic
                    .get(&(input.to_lowercase().trim().to_owned()))
                    .unwrap_or(&Command::None)
                    .to_owned()
            })

        // input = input.to_lowercase();

        // let command = if input.starts_with("i") {
        //     Command::Add
        // } else if input.starts_with("u") {
        //     Command::Update
        // } else if input.starts_with("d") {
        //     Command::Delete
        // } else if input.starts_with("l") {
        //     Command::List
        // } else if input.starts_with("x") {
        //     Command::Exit
        // } else {
        //     Command::None
        // };

        // command
    }

    pub fn insert() {}
}
