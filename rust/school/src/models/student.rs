use super::address::Address;

#[derive(Clone, Debug)]
pub struct Student {
    pub id: u32,
    pub name: String,
    pub family: String,
    pub age: u32,
    // address: Address,
}
