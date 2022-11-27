pub fn test() {
    test_if();
    test_match();
    test_loop();
}
pub fn test_if() {
    // if condition
    /*
     * operators Like CSharp
     */
    if 2 != 2u8 {
        println!("the condition 2 should be true");
    } else if 3 == 3i64 {
        println!("the condition 3 should be true");
    } else {
        println!("the condition else should be false");
    }

    let is_even = if 5 % 2 == 0 { true } else { false };
    println!("is_even should be {}", is_even);
}

pub fn test_match() {
    let marks = 20;
    let mut grade = 'N';

    grade = match marks {
        20 => 'a',
        18..=20 => 'A',
        16..=17 => 'B',
        14..=15 => 'C',
        _ => match marks {
            12..=13 => 'D',
            10..=11 => 'E',
            _ => {
                println!("Your number is very bad.");
                'F'
            }
        },
    };

    println!("grade should be {}", grade);
}

fn test_loop() {
    let mut num = 0;
    loop {
        num += 1;
        if num > 10 {
            break;
        }
    }

    num = loop {
        num += 1;
        if num > 20 {
            break num;
        }
    };

    'bigOf30: loop {
        loop {
            num += 1;
            if num % 2 == 0 {
                break;
            }
            if num > 30 {
                break 'bigOf30;
            }
        }
    }

    println!("the number is {}", num);

    while num < 40 {
        num += 1;
    }

    'bigOf50: while num < 50 {
        num += 1;
        if num > 45 {
            break 'bigOf50;
        }
    }

    println!("the number is {}", num);

    let mut a = vec![1, 2, 3, 4, 6];

    for element in a.iter_mut() {
        // a.iter()
        num += *element;
    }
    a.push(50);

    for _ in num..70 {
        num += 1;
        num += 1;
    }

    println!("the number is {}", num);

    let mut s = String::from("moslem");
    let s2 = &mut s;
    *s2 = String::from("shahsavan");
    println!("s2 &mut is changed to: {}", s2);

    let mut ss = String::from("K");
    let mut r2 = &s;
    let r3 = &ss;
    r2 = r3;

    println!("ref of r2 {} r3 {}", r2, r3);
}
