# Reset Gitlab Password

username: root

```bash

user = User.where(id: 1).first
user.password = 'Aa123456'
user.password_confirmation = 'Aa123456'
user.save
exit

```
