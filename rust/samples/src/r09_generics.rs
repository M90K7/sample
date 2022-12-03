pub fn test() {
    println!("Generic num is {}", add(5));

    let p = Point { x: 2, y: 3 };

    println!("Generic Point add  is {}", p.add());
    println!("Generic Point plus is {}", p.plus(7));

    let p1 = Point3D {
        x: 10.2,
        y: 2.0,
        z: 3.0,
    };

    println!("Generic Point3D is {}", p1.add(5f64));
}

fn add<T>(num: T) -> T
where
    T: std::ops::Add<Output = T> + Copy,
{
    num + num
}

struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T>
where
    T: Copy + std::ops::Add<Output = T>,
{
    fn add(&self) -> T {
        self.x + self.y
    }

    fn plus(&self, num: T) -> T {
        self.x + self.y + num
    }
}

struct Point3D<T, U, Z> {
    x: T,
    y: U,
    z: Z,
}

impl<T, U, Z> Point3D<T, U, Z>
where
    T: Copy
        + std::ops::Add<U, Output = T>
        + std::ops::Add<Z, Output = T>
        + std::ops::Add<Output = T>
        + std::ops::Add,
    U: Copy,
    Z: Copy,
{
    fn add(&self, num: T) -> T
// where
        // T: std::ops::Add<U> + std::ops::Add<Z> + std::ops::Add<T> + Copy, 
        // <T as std::ops::Add<U>>::Output: std::ops::Add<Z>,
    {
        self.x + self.y + self.z + num
    }
}
